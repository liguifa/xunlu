import { IAction } from "../../../store";
import { ITableItem } from "../common/TableItem";

export interface IChangeActviesAction extends IAction {
    actvies: ITableItem[]
}

export interface IShowCreateBusinessWindowAction extends IAction {
    isShow: true
}

export interface IHideCreateBusinessWindowAction extends IAction {
    isShow: false
}

export interface ICreateBusinessAction extends IAction {
    isShow: false
}