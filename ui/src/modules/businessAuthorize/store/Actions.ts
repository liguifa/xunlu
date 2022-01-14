import { BusinessAuthorizeActionTypes } from "./ActionTypes";
import { IChangeBusinessAuthorizeWindowStatusAction } from "./IActions";

export const ShowBusinessAuthorizeWindowStatusAction: () => IChangeBusinessAuthorizeWindowStatusAction = () => ({
    isShow: true,
    type: BusinessAuthorizeActionTypes.CHANGE_BUSINESS_AUTHORIZE_WINDOW_STATUS
});

export const HideBusinessAuthorizeWindowStatusAction: () => IChangeBusinessAuthorizeWindowStatusAction = () => ({
    isShow: false,
    type: BusinessAuthorizeActionTypes.CHANGE_BUSINESS_AUTHORIZE_WINDOW_STATUS
});