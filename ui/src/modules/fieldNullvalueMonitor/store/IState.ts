import { INullvalue } from "../common/Nullvalue";
import { ViewModel } from "../common/ViewModel";

export interface IFieldNullvalueMonitorState {
    nullvalues: INullvalue[]
    model: ViewModel
    start: number
    end: number,
    fields: Array<{name: string}>,
    currentField: string
}