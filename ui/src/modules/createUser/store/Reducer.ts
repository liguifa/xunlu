import { CreateUserActionTypes } from "./ActionTypes";
import { IChangeUserAction, IChangeUsernameAction, ICreateUserAction, IHideCreateUserWindowAction, IShowCreateUserWindowAction } from "./IActions";
import { ICreateUserState } from "./IState";

export const CreateUserReducer: (state: ICreateUserState, action: IChangeUsernameAction | IChangeUserAction | IHideCreateUserWindowAction | IShowCreateUserWindowAction | ICreateUserAction) => ICreateUserState = (state: ICreateUserState, action: IChangeUsernameAction | IChangeUserAction | IHideCreateUserWindowAction | IShowCreateUserWindowAction | ICreateUserAction) => {
    switch(action.type) {
        case CreateUserActionTypes.CHANGE_USER:
            return { ...state, user: (action as IChangeUserAction).user }
        case CreateUserActionTypes.HIDE_CREATE_USER_WINDOW:
            return { ...state, isShow: (action as IHideCreateUserWindowAction).isShow }
        case CreateUserActionTypes.SHOW_CREATE_USER_WINDOW:
            return { ...state, isShow: (action as IShowCreateUserWindowAction).isShow }
        case CreateUserActionTypes.CREATE_USER:
            return { ...state, isShow: (action as ICreateUserAction).isShow }
        case CreateUserActionTypes.CHANGE_USERNAME:
            return { ...state, username: (action as IChangeUsernameAction).username, user: undefined }
    }
    return { ...state }
}