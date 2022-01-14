import { IOperationItem } from "../common/OperationItem";

export interface IBusinessOperationLogsProps extends IBusinessOperationLogsStateProps, IBusinessOperationLogsDispatchProps {
    businessId: number
}

export interface IBusinessOperationLogsStateProps {
    isShow: boolean,
    logs: IOperationItem[]
    end: number
    pageIndex: number
    start: number
    total: number
    isIncludeView: boolean
}

export interface IBusinessOperationLogsDispatchProps {
    ShowBusinessOperationLogsWindow: () => void
    HideBusinessOperationLogsWindow: () => void
    GetBusinessOperationLogs: (businessId: number, pageIndex: number, searchKey: string, isIncludeView: boolean, start: number, end: number) => void
}