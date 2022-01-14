import { Http } from "../../../common";
import { IFieldItem } from "../common/FieldItem";
import { ILineage } from "../common/Lineage";
import { ITableItem } from "../common/TableItem";

export class LineageService {
    public async GetTableLineages(currentTableId: number) {
        const result =  await Http.get<{currentTableId: number}, { tables: ITableItem[], lineages: ILineage[] }>("/table/getTableLineages", {currentTableId});
        return result.data;
    } 

    public async GetFields(tableId: string) {
        const result = await Http.get<{tableId: string}, {items: IFieldItem[]}>("/field/getFields", {tableId});
        return result.data;
    }
}