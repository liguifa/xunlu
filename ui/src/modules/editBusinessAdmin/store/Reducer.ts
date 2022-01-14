import { EditBusinessAdminActionTypes } from "./ActionTypes";
import { IChangeSearchStatusAction, IGetBusinessAdminAction, ISaveBusinessAdminAction, ISearchUsersAction } from "./IActions";
import { IEditBusinessAdminState } from "./IState";

export const EditBusinessAdminReducer: (state: IEditBusinessAdminState, action: ISaveBusinessAdminAction | IGetBusinessAdminAction | ISearchUsersAction | IChangeSearchStatusAction) => IEditBusinessAdminState = (state: IEditBusinessAdminState, action: ISaveBusinessAdminAction | IGetBusinessAdminAction | ISearchUsersAction | IChangeSearchStatusAction) => {
    switch(action.type) {
        case EditBusinessAdminActionTypes.SEARCH_USERS:
            return { ...state, searching: false, users: (action as ISearchUsersAction).users, total: (action as ISearchUsersAction).total }
        case EditBusinessAdminActionTypes.CHANGE_SEARCH_STATUS:
            return { ...state, searching: (action as IChangeSearchStatusAction).searching }
        case EditBusinessAdminActionTypes.CHANGE_BUSINESS_ADMIN:
            return { ...state, admins: (action as ISaveBusinessAdminAction).businessAdmins }
        case EditBusinessAdminActionTypes.GET_BUSINESS_ADMIN:
            return { ...state, admins: (action as IGetBusinessAdminAction).businessAdmins }
    }
    return { ...state }
}