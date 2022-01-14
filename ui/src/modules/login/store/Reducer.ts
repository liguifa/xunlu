import { LOGIN } from "./ActionTypes";
import { ILoginAction } from "./IActions";
import { ILoginState } from "./IState";

export const LoginReducer: (state: ILoginState, action: ILoginAction) => ILoginState = (state: ILoginState, action: ILoginAction) => {
    switch(action.type) {
        case LOGIN: {
            return { ...state, isLogin: true }
        }
    }
    return { ...state }
}