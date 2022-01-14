from app.base.filter import ContextManager
from app.dao.repertory import DbSessionScope, DbSessionManager
from app.domain import domain
from sqlalchemy import and_

@DbSessionScope
def checkAdmin(resource = None):
    username = ContextManager.getRequest().user
    user = DbSessionManager.get().query(domain.user).filter(domain.user.username == username).first()
    if user.roleId < 10:
        return True
    if not resource:
        return False
    resourceId = getattr(ContextManager.getRequest(), resource[0])
    if resource[1] == "table":
        table = DbSessionManager.get().query(domain.table.productId).filter(domain.table.id == resourceId).first()
        if table:
            resourceId = table.productId
    return DbSessionManager.get().query(domain.userAccess).filter(and_(domain.userAccess.resourceId == resourceId, domain.userAccess.resourceType == domain.userAccess.ResourceTypes.Business, domain.userAccess.accessType == domain.userAccess.AccessTypes.Admin)).count() > 0