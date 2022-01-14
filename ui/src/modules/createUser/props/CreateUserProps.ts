import { IUserItem } from "../common/UserItem";

export interface ICreateUserProps extends ICreateUserStateProps, ICreateUserDispatchProps {
    onOk: () => void
}

export interface ICreateUserStateProps {
    user?: IUserItem
    isShow: boolean,
    username: string
}

export interface ICreateUserDispatchProps {
    ChangeUser: (username: string) => void
    SaveUser: (username: string, roleId: number) => void
    ChangeUsername: (usename: string) => void
    ShowWindow: () => void
    HideWindow: () => void
}