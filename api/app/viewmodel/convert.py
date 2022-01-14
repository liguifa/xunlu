from app.config.menus import get_menus  # NOQA
from app.config import config  # NOQA
from app.domain import domain
from datetime import *  # NOQA
import time


class convert():
    @staticmethod
    def toBusinessesInfoViewModel(business, tables, total, totalForQuerytimes, currentUser):
        result = {
            "total": total,
            "businessName": business.name if business else "其它",
            "tables": []
        }
        canViewTableIds = [access.resourceId for access in currentUser.userAccess]
        for table in tables:
            result["tables"].append({
                "id": table.id,
                "name": table.name,
                "type": table.type,
                "isSecret": table.secret,
                "createdTime": table.create_time,
                "description": table.comment,
                "hot": table.querytimes / totalForQuerytimes * 5 if totalForQuerytimes != 0 else 0,
                "isCanView": table.id in canViewTableIds
            })
        return result

    @staticmethod
    def toBusinessInfoViewModel(business):
        return {
            "businessName": business.name if business else "其它",
            "tables": [{
                "id": table.id,
                "name": table.name,
                "description": table.comment,
                "businessName": business.name if business else "其它"
            } for table in business.tables]
        }

    @staticmethod
    def toBusinessesViewModel(businesses):
        return {"items": [{
            "id": business.id,
            "name": business.name,
            "createdTime": business.createdTime,
            "numberForTable": len(business.tables)
        } for business in businesses]}

    @staticmethod
    def toTableInfoViewModel(table, rowTotal):
        return {
            "tableId": table.id,
            "tableName": table.name,
            "businessId": table.business.id if table.business else 0,
            "businessName": table.business.name if table.business else "",
            "type": table.type,
            "rowTotal": rowTotal,
            "isSecret": table.secret,
            "description": table.comment,
            "dbName": table.dbname,
            "location": table.location,
            "format": table.format,
            "tblType": table.tbl_type,
            "createTime": table.create_time,
            "updateTime": table.update_time,
            "isCanAccess": True,
            "extends": [{"name": extend.name, "value": extend.value}  for extend in table.extends]
        }

    @staticmethod
    def toTableExampleViewModel(fields, rows, nullValueRates):
        nullValueRatesSet = {}
        for nullValueRate in nullValueRates:
            nullValueRatesSet[nullValueRate.col] = nullValueRate.value
        return {
            "columns": [{
                "id": str(field.tid) + "_" + field.name,
                "name": field.name,
                "type": field.datatype,
                "description": field.comment,
                "dict": field.dict,
                "nullValueRatio": str(nullValueRatesSet[field.name.lower()]) if field.name.lower() in nullValueRatesSet else 0} for field in fields],
            "rows": [row["data"] for row in rows]
        }

    @staticmethod
    def toTemplatesViewModel(tableTemplates):
        return {"templates": [{
            "id": tableTemplate.template.id,
            "title": tableTemplate.template.name,
            "text": tableTemplate.template.template
        } for tableTemplate in tableTemplates],
        "table": {
            "name": tableTemplates[0].table.name if len(tableTemplates) > 0 else "",
            "fields": [field.name for field in tableTemplates[0].table.fields] if len(tableTemplates) > 0 else []
        }}

    @staticmethod
    def toFieldsViewModel(fields, nullValueRates):
        nullValueRatesSet = {}
        for nullValueRate in nullValueRates:
            nullValueRatesSet[nullValueRate.col.lower()] = nullValueRate.value
        return {
            "items": [{
                "id":  str(field.tid) + "_" + field.name,
                "name": field.name,
                "datatype": field.datatype,
                "type": field.type,
                "dict": field.dict,
                "description": field.comment,
                "secret": field.secret,
                "nullValueRate": str(nullValueRatesSet[field.name.lower()]) if field.name.lower() in nullValueRatesSet else -1}
                for field in fields]
        }

    @staticmethod
    def toPartitionViewModel(partition, total):
        return {
            "total": total,
            "items": [{
                "id": p.time,
                "readyTime": p.time,
                "part": p.part
            }
                for p in partition]
        }

    @staticmethod
    def toTablesViewModel(tables, total):
        return {"items": [{
            "id": table.id,
            "name": table.name,
            "business": table.business.name if table.business else "",
            "type": table.type,
            "createTime": table.create_time,
            "description": table.comment} for table in tables],
            "total": total
        }

    @staticmethod
    def toUsersViewModel(users, total):
        return {
            "total": total,
            "users": [{
                "id": user.id,
                "username": user.username,
                "role": user.role.name,
                "roleId": user.roleId,
                "status": user.status
            } for user in users]
        }

    @staticmethod
    def toCheckUserViewModel(isExists, user):
        return {
            "isExists": isExists,
            "user": {
                "username": bytes.decode(user["uid"][0]),
                "displayName": bytes.decode(user["givenName"][0]),
                "email": bytes.decode(user["mail"][0]),
                "employeeType": bytes.decode(user["employeeType"][0]) if "employeeType" in user else "-",
                "employeeNumber": bytes.decode(user["employeeNumber"][0])
            } if isExists else None
        }

    @staticmethod
    def toUserInfoViewModel(user):
        return {
            "username": user.username,
            "displayName": user.username,
            "role": user.roleId,
            "access": [{
                "resourceId": access.resourceId,
                "resourceType": access.resourceType,
                "accessType": access.accessType
            } for access in user.userAccess]
        }

    @staticmethod
    def toStatisticsInfoViewModel(totals, businesses):
        # todo
        return {
            "totals": [{
                "type": total["type"],
                "total": total["total"]
            } for total in totals],
            "businesses": [{
                "id": business.id,
                "name": business.name,
                "total": len(business.tables)
            } for business in businesses]
        }

    @staticmethod
    def toUserAuthorizeViewModel(user):
        return {
            "username": user.username,
            "role": user.roleId,
            "tableIds": [access.resourceId for access in user.userAccess if access.resourceType == domain.userAccess.ResourceTypes.Table]
        }

    @staticmethod
    def toAllTemplatesViewModel(templates, total=None):
        return {
            "total": total,
            "templates": [{
                "id": template.id,
                "name": template.name,
                "value": template.template
            } for template in templates]
        }

    @staticmethod
    def toLineageViewModel(lineages):
        result = {"tables": [], "lineages": []}
        uniqueTableIds = []
        uniqueLineageIds = []
        for lineage in lineages:
            if "{lineage.tid}_{lineage.ptid}".format(**locals()) not in uniqueLineageIds:
                result["lineages"].append({
                    "source": lineage.ptid,
                    "target": lineage.tid
                })
                uniqueLineageIds.append(
                    "{lineage.tid}_{lineage.ptid}".format(**locals()))
            if lineage.tid not in uniqueTableIds:
                result["tables"].append({
                    "id": lineage.table.id,
                    "name": lineage.table.name,
                    "description": lineage.table.comment,
                    "type": lineage.table.type
                })
            uniqueTableIds.append(lineage.tid)
            if lineage.ptid not in uniqueTableIds:
                result["tables"].append({
                    "id": lineage.prevTable.id,
                    "name": lineage.prevTable.name,
                    "description": lineage.prevTable.comment,
                    "type": lineage.prevTable.type
                })
            uniqueTableIds.append(lineage.ptid)
        return result

    @staticmethod
    def toRownumViewModel(rownums, firstValue):
        return {
            "rownums": [{
                "time": rownums[i].time,
                "increment": int(int(rownums[i].total) - (firstValue if i == 0 else int(rownums[i - 1].total))),
                "total": int(rownums[i].total)
            } for i in range(0, len(rownums))]
        }

    @staticmethod
    def toHotViewModel(querytimes):
        return {
            "hots": [{
                "time": q.time,
                "querytimes": int(q.total)
            } for q in querytimes]
        }

    @staticmethod
    def toTableNullvalueViewModel(nullvalues, fieldNum):
        return {
            "nullvalues": [{
                "time": q.time,
                "total": float(q.total) / int(fieldNum) * 100
            } for q in nullvalues]
        }

    @staticmethod
    def toFieldNullvalueViewModel(nullvalues):
        return {
            "items": [{
                "name": q.name,
                "time": q.time,
                "total": float(q.total) * 100
            } for q in nullvalues]
        }

    @staticmethod
    def toFieldNullvalueProportionViewModel(nullvalues):
        return {
            "items": [{
                "name": q.name,
                "total": float(q.total) * 100
            } for q in nullvalues]
        }

    @staticmethod
    def toOperationViewModel(logs, total):
        return {
            "total": total,
            "logs": [{
                "username": log.user.username,
                "op": log.op,
                "type": log.type,
                "time": log.time
            } for log in logs]
        }

    @staticmethod
    def toBusinessAdminViewModel(admins):
        return [{
            "id": admin.userid,
            "username": admin.user.username
        } for admin in admins]