from app.base.filter import ContextManager
from app.dao.repertory import DbSessionScope, DbSessionManager
from app.domain import domain
from sqlalchemy import and_

@DbSessionScope
def checkTablePermission(name):
    tableId = getattr(ContextManager.getRequest(), name)
    username = ContextManager.getRequest().user
    user = DbSessionManager.get().query(domain.user).filter(domain.user.username == username).first()
    if user.roleId <= 10:
        return True
    table = DbSessionManager.get().query(domain.table).filter(domain.table.id == tableId).first()
    if not table.secret:
        return True
    access = DbSessionManager.get().query(domain.userAccess).filter(and_(domain.userAccess.userid == user.id, domain.userAccess.resourceId == tableId, domain.userAccess.resourceType == domain.userAccess.ResourceTypes.Table)).first()
    return access
