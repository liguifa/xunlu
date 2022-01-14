import { IOperationItem } from "../common/OperationItem";

export interface IBusinessOperationLogsState {
    isShow: boolean
    start: number
    end: number
    isIncludeView: boolean
    pageIndex: number
    logs: IOperationItem[]
    total: number
}