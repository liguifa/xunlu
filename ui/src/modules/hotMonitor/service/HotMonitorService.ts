import { Http } from "../../../common";
import { IHotItem } from "../common/HotItem";
import { ViewModel } from "../common/ViewModel";

export class HotMonitorService {
    public async GetTableQuerytimes(tableId: number, start: number, end: number, model: ViewModel) {
        const result = await Http.get<{tableId: number, start: number, end: number, model: ViewModel}, {hots: IHotItem[]}>("/table/getTableQuerytimes", {tableId, start, end, model});
        return result.data;
    }
}