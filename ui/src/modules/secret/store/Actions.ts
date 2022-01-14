import { TableType } from "../common/TableItem";
import { SecretService } from "../service/SecretService";
import { SecretActionTypes } from "./ActionTypes";
import { IGetSecretTablesAction, ILockTablesAction, ISetTableNameWidthAction, IUnLockTableAction } from "./IActions";

export const SetTableNameWidthAction: (width: number) => ISetTableNameWidthAction = (width: number) => ({
    type: SecretActionTypes.SET_TABLE_NAME_WIDTH,
    width,
});

export const GetSecretTablesAction: (searchKey: string, filterType: TableType,  pageIndex: number, pageSize: number, sortKey: string, sortOrder: "descend" | "ascend") => (dispatch: (action: IGetSecretTablesAction) => void) => void  = (searchKey: string, filterType: TableType,  pageIndex: number, pageSize: number, sortKey: string, sortOrder: "descend" | "ascend") => (
    async (dispatch: (action: IGetSecretTablesAction) => void) => {
        const result = await new SecretService().GetSecretTables(searchKey, filterType,  pageIndex, pageSize, sortKey, sortOrder);
        dispatch({
            filterType,
            pageIndex,
            pageSize,
            searchKey,
            sortKey,
            sortOrder,
            tables: result.items,
            total: result.total,
            type: SecretActionTypes.GET_SECRET_TABLES
        })
    }
)

export const UnLockTableAction: (tableId: number) => (dispatch: (action: IUnLockTableAction) => void) => void = (tableId: number) => (
    async (dispatch: (action: IUnLockTableAction) => void) => {
        await (new SecretService().UnLockTable(tableId))
        dispatch({
            tableId,
            type: SecretActionTypes.UN_LOCK_TABLE
        });
    })

    export const LockTablesAction: (tableIds: number[]) => (dispatch: (action: ILockTablesAction) => void) => void = (tableIds: number[]) => (
        async (dispatch: (action: ILockTablesAction) => void) => {
            await (new SecretService().LockTables(tableIds))
            dispatch({
                tableIds,
                type: SecretActionTypes.LOCK_TABLES
            });
        })