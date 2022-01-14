import { TableService } from "../service/TableService";
import { TableActionTypes } from "./ActionTypes";
import { IEditTableDescriptionAction, IGetTableInfoAction, IUpdateTableExtendAction } from "./IActions";

export const GetTableInfoAction: (tableId: number) => (dispatch: (action: IGetTableInfoAction) => void) => void = (tableId: number) => (
    async (dispatch: (action: IGetTableInfoAction) => void) => {
        const result = await new TableService().GetTableInfo(tableId);
        dispatch({
            businessId: result.businessId,
            businessName: result.businessName,
            createTime: result.createTime,
            dbName: result.dbName,
            description: result.description,
            extends: result.extends,
            format: result.format,
            isCanAccess: result.isCanAccess,
            isSecret: result.isSecret,
            location: result.location,
            rowTotal: result.rowTotal,
            tableId: result.tableId,
            tableName: result.tableName,
            tableType: result.type,
            tblType: result.tblType,
            type: TableActionTypes.GET_TABLE_INFO,
            updateTime: result.updateTime,
        });
    }
)

export const EditTableDescriptionAction: (tableId: number, description: string) => (dispatch: (action: IEditTableDescriptionAction) => void) => void = (tableId: number, description: string) => (
    async (dispatch: (action: IEditTableDescriptionAction) => void) => {
        await new TableService().EditTableDescript(tableId, description);
        dispatch({
            description,
            type: TableActionTypes.EDIT_TABLE_DESCRIPTION
        })
    }
)

export const UpdateTableExtendAcction: (tableId: number, key: string, value: string) => (dispatch: (action: IUpdateTableExtendAction) => void) => void = (tableId: number, key: string, value: string) => (
    async (dispatch: (action: IUpdateTableExtendAction) => void) => {
        new TableService().UpdateTableExtend(tableId, key, value);
        dispatch({
            key,
            tableId,
            type: TableActionTypes.UPDATE_TABLE_EXTENDS,
            value,
        })
    }
)