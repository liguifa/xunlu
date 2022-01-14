import { ITableItem } from '../common/TableItem';
import { TablesActionTypes } from "./ActionTypes";
import { IEditTableDescriptionAction, IGetBusinessForAdminAction, IGetBussionInfoAction, ILockTableAction, ISetTableNameColumnWidthAction, IUnLockTableAction } from "./IActions";
import { ITablesState } from "./IState";

export const TablesReducer: (state: ITablesState, action: IGetBusinessForAdminAction | ISetTableNameColumnWidthAction | IEditTableDescriptionAction | IGetBussionInfoAction | ILockTableAction | IUnLockTableAction) => ITablesState = (state: ITablesState , action: IGetBusinessForAdminAction | ISetTableNameColumnWidthAction | IEditTableDescriptionAction | IGetBussionInfoAction | ILockTableAction | IUnLockTableAction) => {
    switch(action.type) {
        case TablesActionTypes.GET_BUSSIONESS_INFO: {
            return { 
                ...state,
                businessId: (action as IGetBussionInfoAction).businessId,
                businessName: (action as IGetBussionInfoAction).businessName,
                filterType: (action as IGetBussionInfoAction).filterType,
                pageIndex: (action as IGetBussionInfoAction).pageIndex,
                searchKey: (action as IGetBussionInfoAction).searchKey,
                sortKey: (action as IGetBussionInfoAction).sortKey,
                sortOrder: (action as IGetBussionInfoAction).sortOrder,
                tables: (action as IGetBussionInfoAction).tables.map((item: ITableItem, index:  number) => ({...item, key: index + 1})),
                total: (action as IGetBussionInfoAction).total,
            }
        }
        case TablesActionTypes.LOCK_TABLE: {
            return { ...state, tables: state.tables.map(item => ({ ...item, isSecret: (action as ILockTableAction).tableId === item.id ? true :  item.isSecret })) }
        }
        case TablesActionTypes.UN_LOCK_TABLE: {
            return { ...state, tables: state.tables.map(item => ({ ...item, isSecret: (action as IUnLockTableAction).tableId === item.id ? false :  item.isSecret })) }
        }
        case TablesActionTypes.EDIT_TABLE_DESCRIPTION:
            return { ...state, tables: state.tables.map(item => ({ ...item, description: item.id === (action as IEditTableDescriptionAction).tableId ? (action as IEditTableDescriptionAction).description : item.description }))}
        case TablesActionTypes.SET_TABLE_NAME_COLUMN_WIDTH:
            return { ...state, tableNameColumnWidth: (action as ISetTableNameColumnWidthAction).tableNameColumnWidth }
        case TablesActionTypes.GET_BUSINESS_FOR_ADMIN:
            return { ...state, businesses: (action as IGetBusinessForAdminAction).businesses }
    }
    return { ...state }
}