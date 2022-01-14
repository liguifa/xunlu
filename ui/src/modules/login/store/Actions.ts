import { IAction } from "../../../store";
import { LoginService } from "../service/LoginService";
import { LOGIN } from "./ActionTypes";
import { ILoginAction } from './IActions';

export const LoginAction: (username: string, password: string) => (dispatch: (action: IAction) => void) => void = (username: string, password: string) => (
    async (dispatch: (action: ILoginAction) => void) => {
        const isLogin: boolean = await (new LoginService()).Login(username, password)
        dispatch({ isLogin, type: LOGIN, });
    });