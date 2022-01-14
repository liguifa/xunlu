import { IOperationItem, OperationType } from "../common/OperationItem";

export interface IOperationLogsState {
    start: number,
    end: number,
    type: 0 | OperationType
    pageIndex: number,
    logs: IOperationItem[],
    total: number
}