import { INullvalue } from "../common/Nullvalue";
import { ViewModel } from "../common/ViewModel";

export interface IFieldNllvalueMonitorProps extends IFieldNullvalueMonitorStateProps, IFieldNullvalueMonitorDispatchProps {
    tableId: number
}

export interface IFieldNullvalueMonitorStateProps {
    nullvalues: INullvalue[]
    model: ViewModel
    start: number,
    end: number,
    fields: Array<{name: string}>,
    currentField: string
}

export interface IFieldNullvalueMonitorDispatchProps {
    ChangeCurrentField: (currentField: string) => void,
    GetFields: (tableId: number) => void,
    GetFieldNullvalues: (tableId: number, start: number, end: number, model: ViewModel) => void
} 