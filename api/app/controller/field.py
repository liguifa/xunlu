from app.base.controller import controller
from app.service import serviceFactory
from app.viewmodel.convert import convert
from app.dao import DbSessionScope
from app.base.filter import filter
from app.domain import domain

class field(controller):
    @filter("checkTablePermission", "tableId")
    @DbSessionScope
    def getFields(self):
        result, nullValueRates = serviceFactory.fieldService.getFields(self.tableId)
        self.result(True, convert.toFieldsViewModel(result, nullValueRates))

    @DbSessionScope
    def editFieldDescription(self):
        serviceFactory.fieldService.editFieldDescription(self.fieldId, self.description)
        serviceFactory.operationService.commit(self.user, "编辑字段{self.fieldId}描述为{self.description}".format(**locals()), serviceFactory.operationService.operationType.Update, self.fieldId, domain.operationLogs.ResourceTypes.Field, self.description, "description")
        self.result(True, {})

    @DbSessionScope
    def editFieldDict(self):
        serviceFactory.fieldService.editFieldDict(self.fieldId, self.dict)
        serviceFactory.operationService.commit(self.user, "编辑字段{self.fieldId}字典为{self.dict}".format(**locals()), serviceFactory.operationService.operationType.Update, self.fieldId, domain.operationLogs.ResourceTypes.Field, self.dict, "dict")
        self.result(True, {})

    @DbSessionScope
    def changeLockStatus(self):
        serviceFactory.fieldService.changeLockStatus(self.fieldId, self.isLock)
        serviceFactory.operationService.commit(self.user, "编辑字段{self.fieldId}涉密状态为{self.isLock}".format(**locals()), serviceFactory.operationService.operationType.Update, self.fieldId, domain.operationLogs.ResourceTypes.Field, self.isLock, "lock")
        self.result(True, {})