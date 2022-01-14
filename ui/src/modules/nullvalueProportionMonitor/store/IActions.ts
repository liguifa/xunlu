import { IAction } from "../../../store";
import { INullvalue } from "../common/Nullvalue";
import { ViewModel } from "../common/ViewModel";

export interface IGetFieldNullvaluesAction extends IAction {
    nullvalues: INullvalue[]
    model: ViewModel
    start: number
    end: number
}