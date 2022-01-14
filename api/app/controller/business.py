from app.base.controller import controller
from app.service import serviceFactory
from app.config import config
from app.viewmodel.convert import convert
from app.dao import DbSessionScope
from app.base import logger, ErrorLog
from app.base.filter import filter

class business(controller):
    @DbSessionScope
    @ErrorLog
    def getBusinessesInfo(self):
        logger.info("get busines info")
        business, tables, total, totalForQuerytimes = serviceFactory.businessService.getBusinessesInfo(self.businessId, self.filterType, self.pageIndex, self.pageSize, self.searchKey, self.sortKey, self.sortOrder)
        currentUser = serviceFactory.userService.getUserByUsername(self.user)
        self.result(True, convert.toBusinessesInfoViewModel(business, tables, total, totalForQuerytimes, currentUser))

    @DbSessionScope
    def getBusinessInfo(self):
        logger.info("get busines info")
        business = serviceFactory.businessService.getBusinessInfo(self.businessId)
        self.result(True, convert.toBusinessInfoViewModel(business))

    @DbSessionScope
    def getAllBusinesses(self):
        businesses = serviceFactory.businessService.getAllBusinesses()
        self.result(True, convert.toBusinessesViewModel(businesses))

    @filter("checkAdmin")
    @DbSessionScope
    def saveBusiness(self):
        serviceFactory.businessService.saveBusiness(self.name, self.tableIds)
        serviceFactory.operationService.commit(self.user, "添加业务线{self.name}".format(**locals()), serviceFactory.operationService.operationType.Insert)
        self.result(True, {})

    @filter("checkAdmin")
    @DbSessionScope
    def editBusiness(self):
        serviceFactory.businessService.editBusiness(self.id, self.name, self.tableIds)
        serviceFactory.operationService.commit(self.user, "编辑业务线{self.name}".format(**locals()), serviceFactory.operationService.operationType.Insert)
        self.result(True, {})

    @filter("checkAdmin", ["businessId", "business"])
    @DbSessionScope
    def saveBusinessAdmin(self):
        serviceFactory.businessService.saveBusinessAdmin(self.businessId, self.values)
        self.result(True, {})

    @DbSessionScope
    def getBusinessAdmin(self):
        result = serviceFactory.businessService.getBusinessAdmin(self.businessId)
        self.result(True, convert.toBusinessAdminViewModel(result))

    @DbSessionScope
    def getBusinessForAdmin(self):
        businesses = serviceFactory.businessService.getBusinessForAdmin(self.user)
        self.result(True, convert.toBusinessesViewModel(businesses))

    @filter("checkAdmin", ["businessId", "business"])
    @DbSessionScope
    def saveOperationLogsAuthorize(self):
        serviceFactory.businessService.saveOperationLogsAuthorize(self.businessId, self.userIds)
        self.result(True, {})

    @filter("checkAdmin", ["businessId", "business"])
    @DbSessionScope
    def getOperationLogsAuthorize(self):
        userIds = serviceFactory.businessService.getOperationLogsAuthorize(self.businessId)
        self.result(True, userIds)
