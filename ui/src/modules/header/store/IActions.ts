import { IAction } from "../../../store";
import { ICrumb } from "./Crumbs";

export interface IChangeCrumbsAction extends IAction {
    Crumbs: ICrumb[]
}

export interface IChangeNavStatusAction extends IAction {
    isShrink: boolean
}