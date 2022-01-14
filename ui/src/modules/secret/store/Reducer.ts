import { IGetSecretTablesAction, ISetTableNameWidthAction } from "../store/IActions";
import { SecretActionTypes } from "./ActionTypes";
import { ISecretState } from "./IState";

export const SecretReducer: (state: ISecretState, action: IGetSecretTablesAction | ISetTableNameWidthAction) => ISecretState = (state: ISecretState, action: IGetSecretTablesAction | ISetTableNameWidthAction) => {
    switch (action.type) {
        case SecretActionTypes.SET_TABLE_NAME_WIDTH:
            return { ...state, tableNameWidth: (action as ISetTableNameWidthAction).width };
        case SecretActionTypes.GET_SECRET_TABLES:
            return {
                ...state, 
                filterType: (action as IGetSecretTablesAction).filterType,
                pageIndex: (action as IGetSecretTablesAction).pageIndex,
                pageSize: (action as IGetSecretTablesAction).pageSize,
                searchKey: (action as IGetSecretTablesAction).searchKey,
                sortKey: (action as IGetSecretTablesAction).sortKey,
                sortOrder: (action as IGetSecretTablesAction).sortOrder,
                tables: (action as IGetSecretTablesAction).tables.map((table, index) => ({ ...table, index: index + 1 })),
                total: (action as IGetSecretTablesAction).total, 
            }
    }
    return { ...state }
}