from app.dao.repertory import DbSessionScope, DbSessionManager
from app.domain import domain, IndicatorTypes
from sqlalchemy import and_, func
import datetime

class quality:
    @DbSessionScope
    def getTotalForTableRowByTableId(self, tableId):
        total = DbSessionManager.get().query(domain.quality.value).filter(and_(domain.quality.indicator == 1, domain.quality.tid == tableId)).order_by(domain.quality.time.desc()).limit(1).scalar()
        return int(total) if total else 0
            
    @DbSessionScope
    def getColNullValueRatesByTableId(self, tableId):
        newTime = DbSessionManager.get().query(domain.colQuality.time).filter(and_(domain.colQuality.indicator == 2, domain.colQuality.tid == tableId)).order_by(domain.colQuality.time.desc()).limit(1).scalar()
        newTime = newTime if newTime else 0
        return DbSessionManager.get().query(domain.colQuality).filter(and_(domain.colQuality.indicator == 2, domain.colQuality.tid == tableId, domain.colQuality.time == int(newTime))).order_by(domain.colQuality.time.desc()).all()

    @DbSessionScope
    def getTableRownums(self, tableId, start, end, model):
        timeformat = "%m-%d-%Y" if model == 1 else "%m-%Y"
        start = int(start / 1000)
        end = int(end / 1000)
        subQuery = DbSessionManager.get().query(func.DATE_FORMAT(func.from_unixtime(domain.quality.time), timeformat).label("time"), domain.quality.value, domain.quality.time.label("t")).filter(and_(domain.quality.tid == tableId, domain.quality.indicator == 1, domain.quality.time >= start, domain.quality.time <= end)).subquery()
        result = DbSessionManager.get().query(func.sum(subQuery.c.value).label("total"), subQuery.c.time).group_by(subQuery.c.time).order_by(subQuery.c.t).all()
        firstTime = datetime.date.strftime(datetime.date.fromtimestamp(start) - (datetime.timedelta(days = 1) if model == 1 else datetime.timedelta(days = 30)), timeformat)
        firstValue = DbSessionManager.get().query(func.sum(domain.quality.value).label("total")).filter(and_(domain.quality.tid == tableId, domain.quality.indicator == 1, func.from_unixtime(domain.quality.time, timeformat) == firstTime)).scalar()
        firstValue = int(firstValue) if firstValue else 0
        return result, firstValue

    @DbSessionScope
    def getTableQuerytimes(self, tableId, start, end, model):
        timeformat = "%m-%d-%Y" if model == 1 else "%m-%Y"
        start = int(start / 1000)
        end = int(end / 1000)
        subQuery = DbSessionManager.get().query(func.DATE_FORMAT(func.from_unixtime(domain.queryTimes.time), timeformat).label("time"), domain.queryTimes.value.label("value"), domain.queryTimes.time.label("t")).filter(and_(domain.queryTimes.tid == tableId, domain.queryTimes.time >= start, domain.queryTimes.time <= end)).subquery()
        result = DbSessionManager.get().query(func.sum(subQuery.c.value).label("total"), subQuery.c.time).group_by(subQuery.c.time).order_by(subQuery.c.t).all()
        return result

    @DbSessionScope
    def getTableNullvalues(self, tableId, start, end, model):
        timeformat = "%m-%d-%Y" if model == 1 else "%Y-%m"
        start = int(start / 1000)
        end = int(end / 1000)
        subQuery = DbSessionManager.get().query(func.DATE_FORMAT(func.from_unixtime(domain.colQuality.time), timeformat).label("time"), domain.colQuality.col.label("name"), domain.colQuality.value.label("value"), domain.colQuality.time.label("t")).filter(and_(domain.colQuality.tid == tableId, domain.colQuality.indicator == 2, domain.colQuality.time >= start, domain.colQuality.time <= end)).subquery()
        if model == 1:
            result = DbSessionManager.get().query(func.sum(subQuery.c.value).label("total"), subQuery.c.time).group_by(subQuery.c.time).order_by(subQuery.c.t).all()
        else:
            subQuery = DbSessionManager.get().query(func.avg(subQuery.c.value).label("value"), subQuery.c.time.label("time")).group_by(subQuery.c.time, subQuery.c.name).order_by(subQuery.c.t).subquery()
            result = DbSessionManager.get().query(func.sum(subQuery.c.value).label("total"), subQuery.c.time).group_by(subQuery.c.time).order_by(subQuery.c.time).all()
        num = DbSessionManager.get().query(func.count(domain.field.tid)).filter(domain.field.tid == tableId).scalar()
        return result, num

    @DbSessionScope
    def getFieldNullvalues(self, tableId, start, end, model):
        timeformat = "%m-%d-%Y" if model == 1 else "%Y-%m"
        start = int(start / 1000)
        end = int(end / 1000)
        subQuery = DbSessionManager.get().query(func.DATE_FORMAT(func.from_unixtime(domain.colQuality.time), timeformat).label("time"), domain.colQuality.col.label("name"), domain.colQuality.value.label("value"), domain.colQuality.time.label("t")).filter(and_(domain.colQuality.tid == tableId, domain.colQuality.indicator == 2, domain.colQuality.time >= start, domain.colQuality.time <= end)).subquery()
        result = DbSessionManager.get().query(func.avg(subQuery.c.value).label("total"), subQuery.c.time.label("time"), subQuery.c.name.label("name")).group_by(subQuery.c.time, subQuery.c.name).order_by(subQuery.c.t).all()
        return result

    @DbSessionScope
    def getFieldNullvalueProportion(self, tableId, start, end, model):
        timeformat = "%m-%d-%Y" if model == 1 else "%Y-%m"
        start = int(start / 1000)
        end = int(end / 1000)
        subQuery = DbSessionManager.get().query(func.DATE_FORMAT(func.from_unixtime(domain.colQuality.time), timeformat).label("time"), domain.colQuality.col.label("name"), domain.colQuality.value.label("value"), domain.colQuality.time.label("t")).filter(and_(domain.colQuality.tid == tableId, domain.colQuality.indicator == 2, domain.colQuality.time >= start, domain.colQuality.time <= end)).subquery()
        result = DbSessionManager.get().query(func.avg(subQuery.c.value).label("total"), subQuery.c.name.label("name")).group_by(subQuery.c.name).order_by(subQuery.c.t).all()
        return result