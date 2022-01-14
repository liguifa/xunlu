import { Http } from "../../../common";
import { IRownumItem } from "../common/RownumItem";
import { ViewModel } from "../common/ViewModel";

export class RownumMonitorService {
    public async GetTableRownums(tableId: number, start: number, end: number, model: ViewModel) {
        const result = await Http.get<{tableId: number, start: number, end: number, model: ViewModel}, {rownums: IRownumItem[]}>("/table/getTableRownums", {tableId, start, end, model});
        return result.data;
    }
}