import { IAction } from "../../../store";
import { ITableItem } from "../common/TableItem";

export interface IShowChooseWindowAction extends IAction {
    isShow: true
}

export interface IHideChooseWindowAction extends IAction {
    isShow: false
}

export interface IGetTablesAction extends IAction {
    pageIndex: number,
    total: number,
    items: ITableItem[]
}

export interface IChangeActviesAction extends IAction {
    actives: ITableItem[]
}