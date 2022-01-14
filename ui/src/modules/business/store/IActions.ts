import { IAction } from "../../../store";
import { IBusinessItem } from "../common/BusinessItem";

export interface IGetAllBusinessesAction extends IAction {
    items: IBusinessItem[]
}