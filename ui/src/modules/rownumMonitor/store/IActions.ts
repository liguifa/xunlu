import { IAction } from "../../../store";
import { IRownumItem } from "../common/RownumItem";
import { ViewModel } from "../common/ViewModel";

export interface IGetTableRownumsAction extends IAction {
    rownums: IRownumItem[]
    model: ViewModel
    start: number
    end: number
}