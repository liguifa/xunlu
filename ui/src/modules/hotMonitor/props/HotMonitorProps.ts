import { match } from "react-router-dom";
import { IHotItem } from "../common/HotItem";
import { ViewModel } from "../common/ViewModel";

export interface IHotMonitorProps extends IHotMonitorStateProps, IHotMonitorDispatchProps {
    match?: match<{ tableId: string }>
}

export interface IHotMonitorStateProps {
    hots: IHotItem[]
    model: ViewModel
    start: number,
    end: number
}

export interface IHotMonitorDispatchProps {
    GetTableQuerytimes: (tableId: number, start: number, end: number, model: ViewModel) => void
} 