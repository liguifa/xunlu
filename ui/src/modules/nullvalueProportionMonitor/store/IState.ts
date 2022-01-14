import { INullvalue } from "../common/Nullvalue";
import { ViewModel } from "../common/ViewModel";

export interface INullvalueProportionMonitorState {
    nullvalues: INullvalue[]
    model: ViewModel
    start: number
    end: number,
}