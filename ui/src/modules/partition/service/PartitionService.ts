import { Http } from "../../../common/http";
import { IPartitionItem } from "../common/PartitionItem";

export class PartitionService {
    public async GetPartition(tableId: number, pageIndex: number) {
        const result = await Http.get<{tableId: number, pageIndex: number}, {items: IPartitionItem[], total: number}>("/partition/getPartition", {tableId, pageIndex});
        return result.data;
    }
}