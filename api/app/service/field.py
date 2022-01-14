from app.dao import DbSessionManager, DbSessionScope
from app.domain import domain
from sqlalchemy import and_
from app.service.quality import quality

class field:
    @DbSessionScope
    def getFields(self, tableId):
        fields = DbSessionManager.get().query(domain.field).filter(domain.field.tid == tableId).order_by(domain.field.type.asc(), domain.field.no).all()
        nullValueRates = quality().getColNullValueRatesByTableId(tableId)
        return fields, nullValueRates

    @DbSessionScope
    def editFieldDescription(self, fieldId, description):
        ids = fieldId.split("_", 1)
        field = DbSessionManager.get().query(domain.field).filter(and_(domain.field.tid == ids[0], domain.field.name == ids[1])).first()
        field.comment = description

    @DbSessionScope
    def editFieldDict(self, fieldId, dict):
        ids = fieldId.split("_", 1)
        field = DbSessionManager.get().query(domain.field).filter(and_(domain.field.tid == ids[0], domain.field.name == ids[1])).first()
        field.dict = dict

    @DbSessionScope
    def changeLockStatus(self, fieldId, isLock):
        ids = fieldId.split("_", 1)
        field = DbSessionManager.get().query(domain.field).filter(and_(domain.field.tid == ids[0], domain.field.name == ids[1])).first()
        field.secret = isLock
        