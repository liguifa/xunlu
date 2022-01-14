from app.dao import DbSessionManager, DbSessionScope
from app.domain import domain
from app.service.operation import operation

class template:
    @DbSessionScope
    def getTemplatesByTableId(self, tableId):
        return DbSessionManager.get().query(domain.tableTemplate).filter(domain.tableTemplate.tid == tableId).all()

    @DbSessionScope
    def createTemplate(self, tableId, name, value):
        template = domain.template(name, value)
        DbSessionManager.get().add(template)
        if tableId != 0:
            DbSessionManager.get().add(domain.tableTemplate(tableId, None, template))

    @DbSessionScope
    def getAllTemplates(self):
        return DbSessionManager.get().query(domain.template).all()

    @DbSessionScope
    def getTemplates(self, pageIndex, searchKey):
        query = DbSessionManager.get().query(domain.template)
        if not searchKey == "":
            query = query.filter(domain.template.name.like("%"+searchKey+"%"))
        result = query.order_by(domain.template.name).offset((pageIndex - 1) * 20).limit(20).all()
        total = query.count()
        return result, total

    @DbSessionScope
    def updateTemplate(self, templateId, name, value):
        template = DbSessionManager.get().query(domain.template).filter(domain.template.id == templateId).first()
        template.name = name
        template.template = value

    @DbSessionScope
    def deleteTemplate(self, templateId, user):
        template = DbSessionManager.get().query(domain.template).filter(domain.template.id == templateId).first()
        tableTemplates = DbSessionManager.get().query(domain.tableTemplate).filter(domain.tableTemplate.templateId == templateId).all()
        operation().commit(user, "删除表模板{template.name}".format(**locals()), operation().operationType.Remove)
        DbSessionManager.get().delete(template)
        DbSessionManager.get().delete(tableTemplates)