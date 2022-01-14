import { IAction } from "../../../store";
import { IUserItem } from "../common/UserItem";

export interface IChangeUserAction extends IAction {
    user: IUserItem
}

export interface IShowCreateUserWindowAction extends IAction {
    isShow: true
}

export interface IHideCreateUserWindowAction extends IAction {
    isShow: false
}

export interface ICreateUserAction extends IAction {
    isShow: false
}

export interface IChangeUsernameAction extends IAction {
    username: string
}