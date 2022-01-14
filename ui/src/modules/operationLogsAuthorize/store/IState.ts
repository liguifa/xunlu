import { IUserItem } from "../common/UserItem";

export interface IOperationLogsAuthorizeState {
    users: IUserItem[],
    total: number,
    pageIndex: number,
    activeIds: number[],
    authorizeUserIds: number[]
}