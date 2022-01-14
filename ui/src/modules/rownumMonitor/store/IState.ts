import { IRownumItem } from "../common/RownumItem";
import { ViewModel } from "../common/ViewModel";

export interface IRownumMonitorState {
    rownums: IRownumItem[]
    model: ViewModel
    start: number
    end: number
}