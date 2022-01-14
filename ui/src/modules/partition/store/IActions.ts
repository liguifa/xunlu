import { IAction } from "../../../store";
import { IPartitionItem } from "../common/PartitionItem";

export interface IGetPartitionAction extends IAction {
    items: IPartitionItem[]
    pageIndex: number,
    total: number,
}