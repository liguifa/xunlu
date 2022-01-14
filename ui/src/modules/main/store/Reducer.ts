import { MainActionTypes } from "./ActionTypes";
import { IGetUserInfoAction, ILoadingAction } from "./IActions";
import { IMainState } from "./IState";

export const MainReducer: (state: IMainState, action: ILoadingAction | IGetUserInfoAction) => IMainState = (state: IMainState , action: ILoadingAction | IGetUserInfoAction) => {
    switch(action.type) {
        case MainActionTypes.LOADING: {
            return { ...state, status: (action as ILoadingAction).status}
        }
        case MainActionTypes.GET_USER_INFO: {
            return { ...state, userInfo: { 
                access: (action as IGetUserInfoAction).access,
                displayName: (action as IGetUserInfoAction).displayName,
                role: (action as IGetUserInfoAction).role,
                username: (action as IGetUserInfoAction).username,
            } }
        }
    }
    return { ...state }
}