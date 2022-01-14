import { IUserItem } from "../common/UserItem";

export interface IUserProps extends IUserStateProps, IUserDispatchProps {
}

export interface IUserStateProps {
    users: IUserItem[]
    pageIndex: number,
    role: number,
    total: number
}

export interface IUserDispatchProps {
    DisableUser: (userId: number) => void,
    ActiveUser: (userId: number) => void,
    GetUsers: (pageIndex: number, searchKey: string) => void,
    ShowEditAuthorize: (userId: number) => void
}