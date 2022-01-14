from app.base.controller import controller
from app.service import serviceFactory
from app.viewmodel.convert import convert
from app.dao import DbSessionScope
from app.base.filter import filter

class common(controller):
    @DbSessionScope
    def getStatisticsInfo(self):
        totals = serviceFactory.tableService.GetStatisticsInfo()
        businesses = serviceFactory.businessService.GetStatisticsInfo()
        self.result(True, convert.toStatisticsInfoViewModel(totals, businesses))

    @DbSessionScope
    @filter("checkAdmin")
    def getOperationLogs(self):
        result, total = serviceFactory.operationService.getOperationLogs(self.pageIndex, self.searchKey, self.filterType, self.start, self.end)
        self.result(True, convert.toOperationViewModel(result, total))

    @DbSessionScope
    # @filter("checkAdmin", ["businessId", "business"])
    def getBusinessOperationLogs(self):
        result, total = serviceFactory.operationService.getBusinessOperationLogs(self.businessId, self.pageIndex, self.searchKey, self.isIncludeView, self.start, self.end)
        self.result(True, convert.toOperationViewModel(result, total))