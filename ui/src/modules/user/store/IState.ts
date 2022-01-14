import { IUserItem } from "../common/UserItem";

export interface IUserState {
    users: IUserItem[],
    pageIndex: number,
    total: number
}