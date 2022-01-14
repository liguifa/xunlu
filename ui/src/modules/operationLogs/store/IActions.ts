import { IAction } from "../../../store";
import { IOperationItem, OperationType } from "../common/OperationItem";

export interface IGetOperationLogsAction extends IAction {
    pageIndex: number,
    total: number,
    logs: IOperationItem[],
    filterType: 0 | OperationType,
    start: number, 
    end: number
}