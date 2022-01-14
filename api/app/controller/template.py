from app.base.controller import controller
from app.service import serviceFactory
from app.viewmodel.convert import convert
from app.dao import DbSessionScope
from app.base.filter import filter

class template(controller):
    @filter("checkTablePermission", "tableId")
    @DbSessionScope
    def getTemplates(self):
        templates = serviceFactory.templateService.getTemplatesByTableId(self.tableId)
        self.result(True, convert.toTemplatesViewModel(templates))

    @filter("checkTablePermission", "tableId")
    @DbSessionScope
    def exportTemplates(self):
        tableTemplates = serviceFactory.templateService.getTemplatesByTableId(self.tableId)
        content = ""
        for tableTemplate in tableTemplates:
            content += "******************** {tableTemplate.template.name} ********************\n".format(**locals())
            content += tableTemplate.template.template
            content += "\n********************************************************\n\n".format(**locals())
        self.stream("sql_templates.sql", content.encode("utf-8"))

    @filter("checkAdmin")
    @DbSessionScope
    def createTemplate(self):
        serviceFactory.templateService.createTemplate(self.tableId, self.name, self.value)
        serviceFactory.operationService.commit(self.user, "创建表模板{self.name}".format(**locals()), serviceFactory.operationService.operationType.Insert)
        return self.result(True, {})

    @DbSessionScope
    def getAllTemplates(self):
        templates = serviceFactory.templateService.getAllTemplates()
        self.result(True, convert.toAllTemplatesViewModel(templates))

    @DbSessionScope
    def getTemplatesForPage(self):
        templates, total = serviceFactory.templateService.getTemplates(self.pageIndex, self.searchKey)
        self.result(True, convert.toAllTemplatesViewModel(templates, total))

    @filter("checkAdmin")
    @DbSessionScope
    def updateTemplate(self):
        serviceFactory.templateService.updateTemplate(self.templateId, self.name, self.value)
        serviceFactory.operationService.commit(self.user, "编辑表模板{self.name}".format(**locals()), serviceFactory.operationService.operationType.Update)
        self.result(True, {})

    @filter("checkAdmin")
    @DbSessionScope
    def deleteTemplate(self):
        serviceFactory.templateService.deleteTemplate(self.templateId, self.user)
        self.result(True, {})