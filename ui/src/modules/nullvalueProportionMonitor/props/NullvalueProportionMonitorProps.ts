import { INullvalue } from "../common/Nullvalue";
import { ViewModel } from "../common/ViewModel";

export interface IFieldNllvalueMonitorProps extends INullvalueProportionMonitorStateProps, INullvalueProportionMonitorDispatchProps {
    tableId: number
}

export interface INullvalueProportionMonitorStateProps {
    nullvalues: INullvalue[]
    model: ViewModel
    start: number,
    end: number
}

export interface INullvalueProportionMonitorDispatchProps {
    GetFieldNullvalues: (tableId: number, start: number, end: number, model: ViewModel) => void
} 