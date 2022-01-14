import { UserActionTypes } from "./ActionTypes";
import { IChangeUserStatusAction, IGetUsersAction } from "./IActions";
import { IUserState } from "./IState";

export const UserReducer: (state: IUserState, action: IGetUsersAction | IChangeUserStatusAction) => IUserState = (state: IUserState, action: IGetUsersAction | IChangeUserStatusAction) => {
    switch(action.type) {
        case UserActionTypes.GET_USERS:
            return { ...state, users: (action as IGetUsersAction).users.map((user, index) => ({ ...user, index: index +  1 })), pageIndex: (action as IGetUsersAction).pageIndex, total: (action as IGetUsersAction).total }
        case UserActionTypes.CHANGE_USER_STATUS:
            return { ...state, users: state.users.map(user => ({ ...user, status: user.id === (action as IChangeUserStatusAction).userId ? (action as IChangeUserStatusAction).status : user.status })) }
    }
    return { ...state }
}