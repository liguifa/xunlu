import { TableActionTypes } from "./ActionTypes";
import { IEditTableDescriptionAction, IGetTableInfoAction, IUpdateTableExtendAction } from "./IActions";
import { ITableState } from "./IState";

export const TableReducer: (state: ITableState, action: IGetTableInfoAction | IEditTableDescriptionAction | IUpdateTableExtendAction) => ITableState = (state: ITableState, action: IGetTableInfoAction | IEditTableDescriptionAction | IUpdateTableExtendAction) => {
    switch (action.type) {
        case TableActionTypes.GET_TABLE_INFO:
            return {
                ...state,
                businessId: (action as IGetTableInfoAction).businessId,
                businessName: (action as IGetTableInfoAction).businessName,
                createTime: (action as IGetTableInfoAction).createTime,
                dbName: (action as IGetTableInfoAction).dbName,
                description: (action as IGetTableInfoAction).description,
                extends: (action as IGetTableInfoAction).extends,
                format: (action as IGetTableInfoAction).format,
                isCanAccess: (action as IGetTableInfoAction).isCanAccess,
                isSecret: (action as IGetTableInfoAction).isSecret,
                location: (action as IGetTableInfoAction).location,
                rowTotal: (action as IGetTableInfoAction).rowTotal,
                tableId: (action as IGetTableInfoAction).tableId,
                tableName: (action as IGetTableInfoAction).tableName,
                tblType: (action as IGetTableInfoAction).tblType,
                type: (action as IGetTableInfoAction).tableType,
                updateTime: (action as IGetTableInfoAction).updateTime,
            }
        case TableActionTypes.EDIT_TABLE_DESCRIPTION:
            return { ...state, description: (action as IEditTableDescriptionAction).description }
        case TableActionTypes.UPDATE_TABLE_EXTENDS:
            const tableExtends = state.extends.map(extend => ({ ...extend, value: extend.name === (action as IUpdateTableExtendAction).key ? (action as IUpdateTableExtendAction).value : extend.value}))
            if(tableExtends.filter(extend => extend.name === (action as IUpdateTableExtendAction).key).length <= 0) {
                tableExtends.push({
                    name: (action as IUpdateTableExtendAction).key,
                    value: (action as IUpdateTableExtendAction).value
                })
            }
            return { ...state, extends: tableExtends }
    }
    return {...state}
}