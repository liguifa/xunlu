from app.base.controller import controller
from app.service import serviceFactory
from app.dao import DbSessionScope
from app.viewmodel.convert import convert
from app.base.filter import filter

class partition(controller):
    @filter("checkTablePermission", "tableId")
    @DbSessionScope
    def getPartition(self):
        result, total = serviceFactory.partitionService.getPartition(self.tableId, self.pageIndex)
        self.result(True, convert.toPartitionViewModel(result, total))