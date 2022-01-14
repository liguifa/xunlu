import { IAction } from "../../../store";
import { IHotItem } from "../common/HotItem";
import { ViewModel } from "../common/ViewModel";

export interface IGetTableQuerytimesAction extends IAction {
    hots: IHotItem[]
    model: ViewModel
    start: number
    end: number
}