import { IAction } from "../../../store/IAction";

export interface ILoginAction extends IAction {
    isLogin: boolean
}