import { IAction } from "../../../store";
import { ITableItem } from "../common/TableItem";

export interface IChangeActviesAction extends IAction {
    actvies: ITableItem[]
}

export interface IShowEditBusinessWindowAction extends IAction {
    isShow: true,
    businessId: number,
    businessName: string,
    actvies: ITableItem[] 
}

export interface IHideEditBusinessWindowAction extends IAction {
    isShow: false
}

export interface IEditBusinessAction extends IAction {
    isShow: false
}