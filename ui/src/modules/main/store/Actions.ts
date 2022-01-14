import { MainService } from "../service/MainService";
import { MainActionTypes } from "./ActionTypes";
import { IGetUserInfoAction, ILoadingAction } from "./IActions";
import { LoadingStatus } from "./LoadingStatus";

export const LoadingAction: (status: LoadingStatus) => ILoadingAction = (status: LoadingStatus) => {
    return {
        status,
        type: MainActionTypes.LOADING
    }
}

export const GetUserInfoAction: () => (dispatch: (action: IGetUserInfoAction) => void) => void = () => (
    async (dispatch: (action: IGetUserInfoAction) => void) => {
        const userInfo = await (new MainService()).getUerInfo();
        dispatch({
            access: userInfo.access,
            displayName: userInfo.displayName,
            role: userInfo.role,
            type: MainActionTypes.GET_USER_INFO,
            username: userInfo.username,
        })
    }
) 