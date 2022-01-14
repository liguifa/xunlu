import { IAction } from "../../../store";
import { IOperationItem } from "../common/OperationItem";

export interface IChangeBusinessOperationLogsWindowStatusAction extends IAction {
    isShow: boolean
}

export interface IGetBusinessOperationLogsAction extends IAction {
    pageIndex: number,
    total: number,
    logs: IOperationItem[],
    isIncludeView: boolean,
    start: number, 
    end: number
}