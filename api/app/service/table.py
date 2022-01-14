from app.dao import DbSessionManager, DbSessionScope
from app.domain import domain
from sqlalchemy import func
from app.service.quality import quality
from app.service.field import field
from sqlalchemy import and_
from tornado import  escape

class table:
    @DbSessionScope
    def getTableByBusinessId(self, bussinessId, filterType, pageIndex, pageSize, searchKey, sortKey, sortOrder):
        query = DbSessionManager.get().query(domain.table).filter(domain.table.productId == bussinessId);
        if searchKey != "":
            query = query.filter(domain.table.name.like("%" + str(searchKey) + "%"))
        if filterType != "" and filterType != 0:
            query = query.filter(domain.table.type == filterType)
        if sortKey != "":
            query = query.order_by(sortKey + " " + sortOrder, domain.table.querytimes.desc())
        else:
            query = query.order_by(domain.table.querytimes.desc())
        result = query.offset((pageIndex - 1) * pageSize).limit(pageSize)
        total = query.count()
        return result, total

    @DbSessionScope
    def getTotalForQuerytimesByBusinessId(self, bussinessId):
        times = DbSessionManager.get().query(func.max(domain.table.querytimes).label("querytimes")).filter(domain.table.productId == bussinessId).scalar()
        return int(times) if times else 0;

    @DbSessionScope
    def getTableNameById(self, id):
        return DbSessionManager.get().query(domain.table.name).filter(domain.table.id == id).scalar()

    @DbSessionScope
    def getTableInfoById(self, tableId):
        table = DbSessionManager.get().query(domain.table).filter(domain.table.id == tableId).first()
        rowTotal = quality().getTotalForTableRowByTableId(tableId)
        return table, rowTotal

    @DbSessionScope
    def isCanAccess(self, tableId, username):
        user = DbSessionManager.get().query(domain.user).filter(domain.user.username == username).first()
        if user.roleId <= 10:
            return True
        table = DbSessionManager.get().query(domain.table).filter(domain.table.id == tableId).first()
        if not table.secret:
            return True
        return DbSessionManager.get().query(domain.userAccess).filter(and_(domain.userAccess.userid == user.id, domain.userAccess.resourceId == tableId, domain.userAccess.resourceType == domain.userAccess.ResourceTypes.Table)).first()

    @DbSessionScope
    def getTableExampleByTableId(self, tableId):
        fields, nullValueRates = field().getFields(tableId)
        rows = DbSessionManager.get().query(domain.preview).filter(domain.preview.tid == tableId).all()
        rowDatas = [{"data": row.data} for row in rows]
        for f in [field for field in fields if field.secret]:
            for row in rowDatas:
                rowDict = escape.json_decode(row["data"])
                rowDict[f.name] = "* * * * *"
                row["data"] = escape.json_encode(rowDict)
        return fields, rowDatas, nullValueRates

    def getTables(self, pageIndex, pageSize, isIncludeSecret):
        tables = DbSessionManager.get().query(domain.table).filter(domain.table.secret == isIncludeSecret).order_by(domain.table.id).offset((pageIndex - 1) * pageSize).limit(pageSize).all()
        total = DbSessionManager.get().query(domain.table).filter(domain.table.secret == isIncludeSecret).count();
        return tables, total

    @DbSessionScope
    def GetStatisticsInfo(self):
        # todo sql group
        result = DbSessionManager.get().query(domain.table.type).all()
        return [
            {"type": 1, "total": [r.type for r in result].count(1)},
            {"type": 2, "total": [r.type for r in result].count(2) },
        ]

    @DbSessionScope
    def changeLockStatus(self, tableId, status):
        table = DbSessionManager.get().query(domain.table).filter(domain.table.id == tableId).first()
        table.secret = status

    @DbSessionScope
    def changeLockStatusForTables(self, tableIds, status):
        tables = DbSessionManager.get().query(domain.table).filter(domain.table.id.in_(tableIds)).all()
        for table in tables:
            table.secret = status

    @DbSessionScope
    def editTableDescription(self, tableId, description):
        table = DbSessionManager.get().query(domain.table).filter(domain.table.id == tableId).first()
        table.comment = description

    @DbSessionScope
    def editTableBusiness(self, tableId, businessId):
        table = DbSessionManager.get().query(domain.table).filter(domain.table.id == tableId).first()
        table.productId = businessId

    @DbSessionScope
    def editTable(self, id, isSecret, businessName, templateIds, description):
        table = DbSessionManager.get().query(domain.table).filter(domain.table.id == id).first()
        table.secret = isSecret
        table.productId = businessName
        tableTemplates = DbSessionManager.get().query(domain.tableTemplate).filter(domain.tableTemplate.tid == id).all()
        DbSessionManager.get().delete(tableTemplates)
        DbSessionManager.get().add([domain.tableTemplate(id, templateId, None) for templateId in templateIds])
        table.comment = description

    @DbSessionScope
    def getSecretTables(self, filterType, pageIndex, pageSize, searchKey, sortKey, sortOrder):
        query = DbSessionManager.get().query(domain.table).filter(domain.table.secret == True);
        if searchKey != "":
            query = query.filter(domain.table.name.like("%" + str(searchKey) + "%"))
        if filterType != "" and filterType != 0:
            query = query.filter(domain.table.type == filterType)
        if sortKey != "":
            query = query.order_by(sortKey + " " + sortOrder, domain.table.querytimes.desc())
        else:
            query = query.order_by(domain.table.querytimes.desc())
        result = query.offset((pageIndex - 1) * pageSize).limit(pageSize)
        total = query.count()
        return result, total

    @DbSessionScope
    def getAllSecretTables(self):
        query = DbSessionManager.get().query(domain.table).filter(domain.table.secret == True);
        result = query.order_by(domain.table.name)
        total = query.count()
        return result, total

    @DbSessionScope
    def getTableLineages(self, tableId, level):
        currentTableIds = [tableId]
        allTableIds = [tableId]
        currentIds  = [tableId]
        result = []
        currentLevel = 1
        while len(currentIds) > 0 and currentLevel < 21:
            currentLineage = DbSessionManager.get().query(domain.lineage).filter(and_(domain.lineage.tid.in_(currentTableIds), domain.lineage.tid != domain.lineage.ptid))
            result += currentLineage
            currentTableIds = [lineage.ptid for lineage in currentLineage]
            currentIds  = [id for id in currentTableIds if not id in allTableIds]
            allTableIds += currentTableIds
            currentLevel += 1
        return result
    
    @DbSessionScope
    def updateTableExtend(self, tableId, key, value):
        extend = DbSessionManager.get().query(domain.tableExtend).filter(and_(domain.tableExtend.tid == tableId, domain.tableExtend.name == key)).first()
        if extend:
            extend.value = value
        else:
            extend = domain.tableExtend(tableId, key, value)
            DbSessionManager.get().add(extend)