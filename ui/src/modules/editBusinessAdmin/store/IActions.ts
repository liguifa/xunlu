import { IAction } from "../../../store";

export interface ISearchUsersAction extends IAction {
    users: Array<{id: number, username: string}>
    total: number
}

export interface IChangeSearchStatusAction extends IAction {
    searching: boolean
}

// tslint:disable-next-line
export interface ISaveBusinessAdminAction extends IAction {
    businessAdmins: Array<{id: number, username: string}>
}

export interface IGetBusinessAdminAction extends IAction {
    businessAdmins: Array<{id: number, username: string}>
}