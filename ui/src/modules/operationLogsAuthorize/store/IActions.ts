import { IAction } from "../../../store";
import { IUserItem } from "../common/UserItem";

export interface IGetUsersAction extends IAction {
    users: IUserItem[]
    total: number
    pageIndex: number
}

export interface IChangeActivesAction extends IAction {
    activeIds: number[]
}

export interface ISubmitAuthorizeAction extends IAction {
    userIds: number[]
}

export interface IGetOperationLogsAuthorize extends IAction {
    userIds: number[]
}