from app.base.controller import controller
from app.service import serviceFactory
from app.viewmodel.convert import convert
from app.dao import DbSessionScope
import io
from app.base.filter import filter
from app.domain import domain

class table(controller):
    @DbSessionScope
    def getTableInfo(self):
        table, rowTotal = serviceFactory.tableService.getTableInfoById(self.tableId)
        serviceFactory.operationService.commit(self.user, "查看表{table.name}信息".format(**locals()), serviceFactory.operationService.operationType.View, self.tableId, domain.operationLogs.ResourceTypes.Table)
        if not serviceFactory.tableService.isCanAccess(self.tableId, self.user):
            self.result(True, {"isCanAccess": False, "tableName": table.name})
        else:
            self.result(True, convert.toTableInfoViewModel(table, rowTotal))

    @filter("checkTablePermission", "tableId")
    @DbSessionScope
    def getTableExample(self):
        fields, rows, nullValueRates = serviceFactory.tableService.getTableExampleByTableId(self.tableId)
        self.result(True, convert.toTableExampleViewModel(fields, rows, nullValueRates))

    @filter("checkTablePermission", "tableId")
    @DbSessionScope
    def exportExample(self):
        fields, rows, nullValueRates = serviceFactory.tableService.getTableExampleByTableId(self.tableId)
        table, rowTotal = serviceFactory.tableService.getTableInfoById(self.tableId)
        tableName = table.name
        serviceFactory.operationService.commit(self.user, "导出表{tableName}示列数据".format(**locals()), serviceFactory.operationService.operationType.View, self.tableId, domain.operationLogs.ResourceTypes.Table)
        self.csv("{tableName}_export_example.csv".format(**locals()), [field.name for field in fields], [self.json_decode(row["data"]) for row in rows])

    @DbSessionScope
    def getTables(self):
        tables, total = serviceFactory.tableService.getTables(self.pageIndex, self.pageSize, self.isIncludeSceret)
        self.result(True, convert.toTablesViewModel(tables, total))

    @filter("checkAdmin", ["tableId", "table"])
    @DbSessionScope
    def changeLockStatus(self):
        serviceFactory.tableService.changeLockStatus(self.tableId, self.isLock)
        tableName = serviceFactory.tableService.getTableNameById(self.tableId)
        serviceFactory.operationService.commit(self.user, "修改表{tableName}涉密状态为{self.isLock}".format(**locals()), serviceFactory.operationService.operationType.Update, self.tableId, domain.operationLogs.ResourceTypes.Table, self.isLock, "lock")
        self.result(True, {})

    @filter("checkAdmin")
    @DbSessionScope
    def changeLockStatusForTables(self):
        serviceFactory.tableService.changeLockStatusForTables(self.tableIds, self.isLock)
        # todo 操作记录信息
        serviceFactory.operationService.commit(self.user, "修改表涉密状态为{self.isLock}".format(**locals()), serviceFactory.operationService.operationType.Update)
        self.result(True, {})

    @filter("checkTablePermission", "tableId")
    @DbSessionScope
    def editTableDescription(self):
        serviceFactory.tableService.editTableDescription(self.tableId, self.description)
        tableName = serviceFactory.tableService.getTableNameById(self.tableId)
        serviceFactory.operationService.commit(self.user, "编辑表{tableName}描述为{self.description}".format(**locals()), serviceFactory.operationService.operationType.Update, self.tableId, domain.operationLogs.ResourceTypes.Table, self.description, "description")
        self.result(True, {})

    @filter("checkAdmin", ["id", "table"])
    @DbSessionScope
    def editTable(self):
        serviceFactory.tableService.editTable(self.id, self.isSecret, self.businessName, self.templateIds, self.description)
        tableName = serviceFactory.tableService.getTableNameById(self.id)
        # todo 操作记录
        serviceFactory.operationService.commit(self.user, "编辑表{tableName}信息".format(**locals()), serviceFactory.operationService.operationType.Update, self.id, domain.operationLogs.ResourceTypes.Table, self.description, "info")
        self.result(True, {})

    @DbSessionScope
    def getSecretTables(self):
        tables, total = serviceFactory.tableService.getSecretTables(self.filterType, self.pageIndex, self.pageSize, self.searchKey, self.sortKey, self.sortOrder)
        self.result(True, convert.toTablesViewModel(tables, total))

    @DbSessionScope
    def getAllSecretTables(self):
        tables, total = serviceFactory.tableService.getAllSecretTables()
        self.result(True, convert.toTablesViewModel(tables, total))

    @filter("checkTablePermission", "currentTableId")
    @DbSessionScope
    def getTableLineages(self):
        lineages = serviceFactory.tableService.getTableLineages(self.currentTableId, 2)
        self.result(True, convert.toLineageViewModel(lineages))

    @filter("checkTablePermission", "tableId")
    @DbSessionScope
    def getTableRownums(self):
        rownums, firstValue = serviceFactory.qualityService.getTableRownums(self.tableId, self.start, self.end, self.model)
        self.result(True, convert.toRownumViewModel(rownums, firstValue))

    @filter("checkTablePermission", "tableId")
    @DbSessionScope
    def getTableQuerytimes(self):
        querytimes = serviceFactory.qualityService.getTableQuerytimes(self.tableId, self.start, self.end, self.model)
        self.result(True, convert.toHotViewModel(querytimes))

    @filter("checkTablePermission", "tableId")
    @DbSessionScope
    def getTableNullvalues(self):
        nullvalues, fieldNum = serviceFactory.qualityService.getTableNullvalues(self.tableId, self.start, self.end, self.model)
        self.result(True, convert.toTableNullvalueViewModel(nullvalues, fieldNum))

    @filter("checkTablePermission", "tableId")
    @DbSessionScope
    def getFieldNullvalues(self):
        nullvalues = serviceFactory.qualityService.getFieldNullvalues(self.tableId, self.start, self.end, self.model)
        self.result(True, convert.toFieldNullvalueViewModel(nullvalues))

    @filter("checkTablePermission", "tableId")
    @DbSessionScope
    def getFieldNullvalueProportion(self):
        nullvalues = serviceFactory.qualityService.getFieldNullvalueProportion(self.tableId, self.start, self.end, self.model)
        self.result(True, convert.toFieldNullvalueProportionViewModel(nullvalues))

    @DbSessionScope
    def editTableBusiness(self):
        serviceFactory.tableService.editTableBusiness(self.tableId, self.businessId)
        tableName = serviceFactory.tableService.getTableNameById(self.tableId)
        serviceFactory.operationService.commit(self.user, "编辑表{tableName}业务线为{self.businessId}".format(**locals()), serviceFactory.operationService.operationType.Update, self.tableId, domain.operationLogs.ResourceTypes.Table, self.businessId, "business")
        self.result(True, {})

    @filter("checkTablePermission", "tableId")
    @DbSessionScope
    def updateTableExtend(self):
        serviceFactory.tableService.updateTableExtend(self.tableId, self.key, self.value)
        self.result(True, {})