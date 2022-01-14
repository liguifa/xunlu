from app.dao import DbSessionManager, DbSessionScope
from app.domain import domain

class partition:
    @DbSessionScope
    def getPartition(self, tableId, pageIndex):
        result = DbSessionManager.get().query(domain.partition).filter(domain.partition.tid == tableId).order_by("t desc").offset((pageIndex - 1) * 20).limit(20).all()
        total = DbSessionManager.get().query(domain.partition).filter(domain.partition.tid == tableId).count()
        return result, total