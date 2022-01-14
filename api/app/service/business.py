from app.dao import DbSessionManager, DbSessionScope
from app.domain import domain
from app.service.table import table
from sqlalchemy import func, and_

class business:
    @DbSessionScope
    def getBusinessesInfo(self, businessId, filterType, pageIndex, pageSize, searchKey, sortKey, sortOrder):
        business = DbSessionManager.get().query(domain.business).filter(domain.business.id == businessId).first()
        tables, total = table().getTableByBusinessId(businessId, filterType, pageIndex, pageSize, searchKey, sortKey, sortOrder)
        totalForQuerytimes = table().getTotalForQuerytimesByBusinessId(businessId)
        return business, tables, total, totalForQuerytimes

    @DbSessionScope
    def getBusinessInfo(self, businessId):
        return DbSessionManager.get().query(domain.business).filter(domain.business.id == businessId).first()

    @DbSessionScope
    def getAllBusinesses(self):
        return DbSessionManager.get().query(domain.business).order_by(domain.business.no).all()

    @DbSessionScope
    def saveBusiness(self, name, tableIds):
        business = domain.business(name)
        tables = DbSessionManager.get().query(domain.table).filter(domain.table.id.in_(tableIds))
        DbSessionManager.get().add(business)
        for table in tables:
            table.productId = business.id

    @DbSessionScope
    def editBusiness(self, id, name, tableIds):
        business = DbSessionManager.get().query(domain.business).filter(domain.business.id == id).first()
        business.name = name
        for table in business.tables:
            table.productId = 0
        tables = DbSessionManager.get().query(domain.table).filter(domain.table.id.in_(tableIds))
        for table in tables:
            table.productId = business.id

    @DbSessionScope
    def GetStatisticsInfo(self):
        # return DbSessionManager.get().query(func.count(domain.business.name, domain.business.id, domain.business.tables).alias("total")).group_by(domain.table.type).all()
        # todo sql group
        return DbSessionManager.get().query(domain.business).all()

    @DbSessionScope
    def saveBusinessAdmin(self, businessId, values):
        oldAdmins = DbSessionManager.get().query(domain.userAccess).filter(and_(domain.userAccess.resourceId == businessId, domain.userAccess.resourceType == domain.userAccess.ResourceTypes.Business, domain.userAccess.accessType == domain.userAccess.AccessTypes.Admin)).all()
        DbSessionManager.get().delete(oldAdmins)
        newAdmins = [domain.userAccess(userId, businessId, domain.userAccess.ResourceTypes.Business, domain.userAccess.AccessTypes.Admin) for userId in values]
        DbSessionManager.get().add(newAdmins)

    @DbSessionScope
    def getBusinessAdmin(self, businessId):
        return DbSessionManager.get().query(domain.userAccess).filter(and_(domain.userAccess.resourceId == businessId, domain.userAccess.resourceType == domain.userAccess.ResourceTypes.Business, domain.userAccess.accessType == domain.userAccess.AccessTypes.Admin))

    @DbSessionScope
    def getBusinessForAdmin(self, user):
        user = DbSessionManager.get().query(domain.user.id, domain.user.roleId).filter(domain.user.username == user).first()
        if user.roleId < 10:
            return self.getAllBusinesses()
        subQuery = DbSessionManager.get().query(domain.userAccess.resourceId).filter(and_(domain.userAccess.resourceType == domain.userAccess.ResourceTypes.Business, domain.userAccess.accessType == domain.userAccess.AccessTypes.Admin, domain.userAccess.userid == user.id))
        return DbSessionManager.get().query(domain.business).filter(domain.business.id.in_(subQuery))

    @DbSessionScope
    def saveOperationLogsAuthorize(self, businessId, userIds):
        oldAuthorize = DbSessionManager.get().query(domain.userAccess).filter(and_(domain.userAccess.resourceType == domain.userAccess.ResourceTypes.Business, domain.userAccess.accessType == domain.userAccess.AccessTypes.OperationLogs)).all()
        DbSessionManager.get().delete(oldAuthorize)
        DbSessionManager.get().add([domain.userAccess(userId, businessId, domain.userAccess.ResourceTypes.Business, domain.userAccess.AccessTypes.OperationLogs) for userId in userIds])

    @DbSessionScope
    def getOperationLogsAuthorize(self, businessId):
        return [access.userid for access in DbSessionManager.get().query(domain.userAccess.userid).filter(and_(domain.userAccess.resourceId == businessId, domain.userAccess.resourceType == domain.userAccess.ResourceTypes.Business, domain.userAccess.accessType == domain.userAccess.AccessTypes.OperationLogs)).all()]