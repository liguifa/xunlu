import { Http } from "../../../common";
import { INullvalue } from "../common/Nullvalue";
import { ViewModel } from "../common/ViewModel";

export class FieldNullvalueMonitorService {
    public async getFieldNullvalueProportion(tableId: number, start: number, end: number, model: ViewModel) {
        const result = await Http.get<{tableId: number, start: number, end: number, model: ViewModel}, {items: INullvalue[]}>("/table/getFieldNullvalueProportion", {tableId, start, end, model});
        return result.data;
    }

    public async GetFields(tableId: number) {
        const result = await Http.get<{tableId: number}, {items: Array<{name: string}>}>("/field/getFields", {tableId});
        return result.data;
    }
}