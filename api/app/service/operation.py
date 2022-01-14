from app.dao import DbSessionManager, DbSessionScope
from app.domain import domain
from app.domain.operationLogs import operationType
from sqlalchemy import and_, or_

class operation:
    operationType = operationType

    @DbSessionScope
    def commit(self, username, op, type, resourceId=0, resourceType=0, newValue="", valueType=""):
        user = DbSessionManager.get().query(domain.user).filter(domain.user.username == username).first()
        DbSessionManager.get().add(domain.operationLogs(user.id, op, type, resourceId, resourceType, newValue, valueType))

    @DbSessionScope
    def getOperationLogs(self, pageIndex, searchKey, filterType, start, end):
        query = DbSessionManager.get().query(domain.operationLogs).filter(and_(domain.operationLogs.time >= int(start / 1000), domain.operationLogs.time <= int(end / 100)))
        if not filterType == 0:
            query = query.filter(domain.operationLogs.type == filterType)
        if not searchKey == "":
            query = query.filter(domain.operationLogs.op.like("%"+str(searchKey)+"%"))
        total = query.count()
        result = query.order_by(domain.operationLogs.time.desc()).offset((pageIndex - 1) * 20).limit(20).all()
        return result, total

    @DbSessionScope
    def getBusinessOperationLogs(self, businessId, pageIndex, searchKey, isIncludeView, start, end):
        allTableIds = DbSessionManager.get().query(domain.table.id).filter(domain.table.productId == businessId).subquery()
        allFieldIds = DbSessionManager.get().query(domain.field.tid + "_" + domain.field.name).filter(domain.field.tid.in_(allTableIds)).subquery()
        query = DbSessionManager.get().query(domain.operationLogs).filter(and_(domain.operationLogs.time >= int(start / 1000), domain.operationLogs.time <= int(end / 100), or_(and_(domain.operationLogs.resourceId.in_(allTableIds), domain.operationLogs.resourceType == domain.operationLogs.ResourceTypes.Table), and_(domain.operationLogs.resourceId.in_(allFieldIds), domain.operationLogs.resourceType == domain.operationLogs.ResourceTypes.Field))))
        if not searchKey == "":
            query = query.filter(domain.operationLogs.op.like("%"+str(searchKey)+"%"))
        if not isIncludeView:
            query = query.filter(domain.operationLogs.type != operationType.View)
        total = query.count()
        result = query.order_by(domain.operationLogs.time.desc()).offset((pageIndex - 1) * 20).limit(20).all()
        return result, total
