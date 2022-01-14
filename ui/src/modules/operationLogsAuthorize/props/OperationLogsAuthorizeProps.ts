import { IUserItem } from "../common/UserItem";

export interface IOperationLogsAuthorizeProps extends IOperationLogsAuthorizeStateProps, IOperationLogsAuthorizeDispatchProps {
    businessId: number
}

export interface IOperationLogsAuthorizeStateProps {
    users: IUserItem[]
    pageIndex: number
    total: number
    activeIds: number[],
    authorizeUserIds: number[]
}

export interface IOperationLogsAuthorizeDispatchProps {
    GetOperationLogsAuthorize: (businessId: number) => void
    GetUsers: (pageIndex: number, searchKey: string) => void
    ChangeActives: (activeIds: number[]) => void
    SumitAuthorize: (businessId: number, userIds: number[]) => void
}