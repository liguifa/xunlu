import { IAction } from "../../../store";

export interface IShowEditTableWindowAction extends IAction {
    isShow: true
}

export interface IHideEditTableWindowAction extends IAction {
    isShow: false
}

export interface IEditTableAction extends IAction {
    isShow: false
}

export interface IGetAllTemplatesAction extends IAction {
    templates: Array<{id: number, name: string, value: string}>
}

export interface IGetBusinessForAdminAction extends IAction {
    businesses: Array<{id: number, name: string}>
}