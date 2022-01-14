import { IAction } from "../../../store";
import { IBusinessItem } from "../common/BusinessItem";

export interface IGetBusinessesAction extends IAction {
    Businesses: IBusinessItem[]
}

export interface IChangeMenuAction extends IAction {
    activeId: string
}

export interface IChangeSelectKeyAction extends IAction {
    selectKey: string
}