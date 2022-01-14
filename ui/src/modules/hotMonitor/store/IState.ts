import { IHotItem } from "../common/HotItem";
import { ViewModel } from "../common/ViewModel";

export interface IHotMonitorState {
    hots: IHotItem[]
    model: ViewModel
    start: number
    end: number
}