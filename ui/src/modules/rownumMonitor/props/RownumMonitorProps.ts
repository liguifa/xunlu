import { match } from "react-router-dom";
import { IRownumItem } from "../common/RownumItem";
import { ViewModel } from "../common/ViewModel";

export interface IRownumMonitorProps extends IRownumMonitorStateProps, IRownumMonitorDispatchProps {
    match?: match<{ tableId: string }>
}

export interface IRownumMonitorStateProps {
    rownums: IRownumItem[]
    model: ViewModel
    start: number,
    end: number
}

export interface IRownumMonitorDispatchProps {
    GetTableRownums: (tableId: number, start: number, end: number, model: ViewModel) => void
} 