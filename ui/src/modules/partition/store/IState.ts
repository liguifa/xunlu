import { IPartitionItem } from "../common/PartitionItem";

export interface IPartitionState {
    partitionItems: IPartitionItem[],
    pageIndex: number,
    total: number
}