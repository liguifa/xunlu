import { ITableItem } from "../common/ITableItem";

export interface IEditAuthorizeProps extends IEditAuthorizeStateProps, IEditAuthorizeDispatchProps {
    onOk: () => void
}

export interface IEditAuthorizeStateProps {
    username: string,
    isShow: boolean,
    actives: number[],
    userId: number,
    tables: ITableItem[],
    total: number,
    roleId: number
}

export interface IEditAuthorizeDispatchProps {
    EditAuthorize: (userid: number, roleId: number, actives: number[]) => void
    HideWindow: () => void
    GetUserAuthorize: (userId: number) => void
    GetAllSecretTables: () => void
    ChangeActives: (actives: number[]) => void
}