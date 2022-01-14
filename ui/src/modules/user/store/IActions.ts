import { IAction } from "../../../store";
import { IUserItem } from "../common/UserItem";

export interface IGetUsersAction extends IAction {
    users: IUserItem[],
    pageIndex: number,
    total: number
}

export interface IChangeUserStatusAction extends IAction {
    userId: number,
    status: 0 | 1
}