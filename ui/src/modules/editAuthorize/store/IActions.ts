import { IAction } from "../../../store";
import { ITableItem } from "../common/ITableItem";

export interface IHideEditAuthorizeAction extends IAction {
    isShow: false
}

export interface IShowEditAuthorizeAction extends IAction {
    isShow: true,
    userId: number,
    actives: number[],
    username: string,
    roleId: number
}

export interface IGetUserAuthorizeAction extends IAction {
    actives: number[],
    username: string
}

export interface IGetAllSecretTablesAction extends IAction {
    tables: ITableItem[],
    total: number
}

export interface IChangeActivesAction extends IAction {
    actives: number[]
}

export interface IEditAuthorizeAction extends IAction {
    isShow: false
}