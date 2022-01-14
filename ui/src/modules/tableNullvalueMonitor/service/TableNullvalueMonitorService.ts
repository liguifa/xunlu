import { Http } from "../../../common";
import { INullvalue } from "../common/Nullvalue";
import { ViewModel } from "../common/ViewModel";

export class TableNullvalueMonitorService {
    public async GetTableNullvalues(tableId: number, start: number, end: number, model: ViewModel) {
        const result = await Http.get<{tableId: number, start: number, end: number, model: ViewModel}, {nullvalues: INullvalue[]}>("/table/getTableNullvalues", {tableId, start, end, model});
        return result.data;
    }
}