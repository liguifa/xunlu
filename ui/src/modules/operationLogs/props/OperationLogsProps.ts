import { IOperationItem, OperationType } from "../common/OperationItem";

export interface IOperationLogsProps extends IOperationLogsStateProps, IOperationLogsDispatchProps {

}

export interface IOperationLogsStateProps {
    start: number,
    end: number,
    type: 0 | OperationType
    pageIndex: number,
    logs: IOperationItem[],
    total: number
}

export interface IOperationLogsDispatchProps {
    GetOperationLogs: (pageIndex: number, searchKey: string, type: 0 | OperationType, start: number, end: number) => void
}