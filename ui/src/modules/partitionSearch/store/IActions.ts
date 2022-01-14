import { IAction } from "../../../store/IAction";

export interface ISearchAction extends IAction {
    searchResult: {[key: string]: string}
}