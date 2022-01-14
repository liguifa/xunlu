import { match } from "react-router-dom";
import { IPartitionItem } from "../common/PartitionItem";

export interface IPartitionProps extends IPartitionStateProps, IPartitionDispatchProps {
    match: match<{tableId: string}>
}

export interface IPartitionStateProps {
    partitionItems: IPartitionItem[],
    pageIndex: number,
    total: number,
}

export interface IPartitionDispatchProps {
    GetPartition: (tableId: number, pageIndex: number) => void
}