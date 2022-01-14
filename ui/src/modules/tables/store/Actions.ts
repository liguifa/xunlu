import { ITablesResult } from "../common/TablesResult";
import { TableType } from "../common/TableType";
import { TablesService } from "../service/TablesService";
import { TablesActionTypes } from "./ActionTypes";
import { IEditTableBusinessAction, IEditTableDescriptionAction, IGetBusinessForAdminAction, IGetBussionInfoAction, ILockTableAction, ISetTableNameColumnWidthAction, IUnLockTableAction } from "./IActions";

export const GetBussionInfoAction: (businessId: number, searchKey: string, filterType: TableType, pageIndex: number, pageSize: number, sortKey: string, sortOrder: "descend" | "ascend") => (dispatch: (action: IGetBussionInfoAction) => void) => void = (businessId: number, searchKey: string, filterType: TableType, pageIndex: number, pageSize: number, sortKey: string, sortOrder: "descend" | "ascend") => (
    async (dispatch: (action: IGetBussionInfoAction) => void) => {
        const result: ITablesResult = await (new TablesService().GetBusinessInfo(businessId, searchKey, filterType, pageIndex, pageSize, sortKey, sortOrder))
        dispatch({
            businessId,
            businessName: result.businessName,
            filterType,
            pageIndex,
            pageSize,
            searchKey,
            sortKey,
            sortOrder,
            tables: result.tables,
            total: result.total,
            type: TablesActionTypes.GET_BUSSIONESS_INFO
        });
    })

export const LockTableAction: (tableId: number) => (dispatch: (action: ILockTableAction) => void) => void = (tableId: number) => (
    async (dispatch: (action: ILockTableAction) => void) => {
        await (new TablesService().LockTable(tableId))
        dispatch({
            tableId,
            type: TablesActionTypes.LOCK_TABLE
        });
    })

export const UnLockTableAction: (tableId: number) => (dispatch: (action: IUnLockTableAction) => void) => void = (tableId: number) => (
    async (dispatch: (action: IUnLockTableAction) => void) => {
        await (new TablesService().UnLockTable(tableId))
        dispatch({
            tableId,
            type: TablesActionTypes.UN_LOCK_TABLE
        });
    })

export const EditTableDescriptionAction: (tableId: number, description: string) => (dispatch: (action: IEditTableDescriptionAction) => void) => void = (tableId: number, description: string) => (
    async (dispatch: (action: IEditTableDescriptionAction) => void) => {
        await new TablesService().EditTableDescript(tableId, description);
        dispatch({
            description,
            tableId,
            type: TablesActionTypes.EDIT_TABLE_DESCRIPTION
        })
    }
)

export const SetTableNameColumnWidthAction: (width: number) => ISetTableNameColumnWidthAction = (width: number) => ({
    tableNameColumnWidth: width,
    type: TablesActionTypes.SET_TABLE_NAME_COLUMN_WIDTH
})

export const GetBusinessForAdminAction: () => (dispatch: (action: IGetBusinessForAdminAction) => void) => void = () => (
    async (dispatch: (action: IGetBusinessForAdminAction) => void) => {
        const result = await new TablesService().GetBusinessForAdmin();
        dispatch({
            businesses: result.items,
            type: TablesActionTypes.GET_BUSINESS_FOR_ADMIN
        });
    }
)

export const EditTableBusinessAction: (tableId: number, businessId: number) => (dispatch: (action: IEditTableBusinessAction) => void) => void = (tableId: number, businessId: number) => (
    async (dispatch: (action: IEditTableBusinessAction) => void) => {
        await new TablesService().EditTableBusiness(tableId, businessId);
        dispatch({
            type: TablesActionTypes.EDOIT_TABLE_BUSINESS
        })
    }
)