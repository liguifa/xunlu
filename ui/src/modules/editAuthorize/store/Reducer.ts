import { EditAuthorizeActionTypes } from "./ActionTypes";
import { IChangeActivesAction, IEditAuthorizeAction, IGetAllSecretTablesAction, IGetUserAuthorizeAction, IHideEditAuthorizeAction, IShowEditAuthorizeAction } from "./IActions";
import { IEditAuthorizeState } from "./IState";

export const EditAuthorizeReducer: (state: IEditAuthorizeState, action: IEditAuthorizeAction | IChangeActivesAction | IGetAllSecretTablesAction | IHideEditAuthorizeAction | IShowEditAuthorizeAction | IGetUserAuthorizeAction) => IEditAuthorizeState = (state: IEditAuthorizeState, action: IEditAuthorizeAction | IChangeActivesAction | IGetAllSecretTablesAction | IHideEditAuthorizeAction | IShowEditAuthorizeAction | IGetUserAuthorizeAction) => {
    switch(action.type) {
        case EditAuthorizeActionTypes.HIDE_EDIT_AUTHORIZE:
            return { ...state, isShow: false };
        case EditAuthorizeActionTypes.SHOW_EDIT_AUTHORIZE:
            return { ...state, isShow: true, id: (action as IShowEditAuthorizeAction).userId, username: (action as IShowEditAuthorizeAction).username, actives: (action as IShowEditAuthorizeAction).actives, roleId: (action as IShowEditAuthorizeAction).roleId };
        case EditAuthorizeActionTypes.GET_USER_AUTHORIZE:
            return { ...state, username: (action as IGetUserAuthorizeAction).username, actives: (action as IGetUserAuthorizeAction).actives }
        case EditAuthorizeActionTypes.GET_ALL_SECRET_TABLES:
            return { ...state, tables: (action as IGetAllSecretTablesAction).tables.map(table => ({ ...table, key: table.id })), total: (action as IGetAllSecretTablesAction).total }
        case EditAuthorizeActionTypes.CHANGE_ACTIVES:
            return { ...state, actives: (action as IChangeActivesAction).actives }
        case EditAuthorizeActionTypes.EDIT_AUTHORIZE:
            return { ...state, isShow: false }
    }
    return { ...state };
}