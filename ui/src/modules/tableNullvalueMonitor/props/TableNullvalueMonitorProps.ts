import { INullvalue } from "../common/Nullvalue";
import { ViewModel } from "../common/ViewModel";

export interface ITableNllvalueMonitorProps extends ITableNullvalueMonitorStateProps, ITableNullvalueMonitorDispatchProps {
    tableId: number
}

export interface ITableNullvalueMonitorStateProps {
    nullvalues: INullvalue[]
    model: ViewModel
    start: number,
    end: number
}

export interface ITableNullvalueMonitorDispatchProps {
    GetTableNullvalues: (tableId: number, start: number, end: number, model: ViewModel) => void
} 