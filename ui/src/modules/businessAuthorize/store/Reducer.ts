import { BusinessAuthorizeActionTypes } from "./ActionTypes";
import { IChangeBusinessAuthorizeWindowStatusAction } from "./IActions";
import { IBusinessAuthorizeState } from "./IState";

export const BusinessAuthorizeReducer: (state: IBusinessAuthorizeState, action: IChangeBusinessAuthorizeWindowStatusAction) =>  IBusinessAuthorizeState = (state: IBusinessAuthorizeState, action: IChangeBusinessAuthorizeWindowStatusAction) => {
    switch(action.type) {
        case BusinessAuthorizeActionTypes.CHANGE_BUSINESS_AUTHORIZE_WINDOW_STATUS:
            return { ...state, isShow: (action as IChangeBusinessAuthorizeWindowStatusAction).isShow }
    }
    return { ...state }
}