import { Http } from "../../../common";
import { ITableResult }  from "../common/TableResult";

export class TableService {
    public async GetTableInfo(tableId: number) {
        const result = await Http.get<{tableId: number}, ITableResult>("/table/getTableInfo", {tableId});
        return result.data as ITableResult;
    }

    public ExportExample(tableId: number): void {
        Http.reload(`/table/exportExample?tableId=${tableId}`);
    }

    public async EditTableDescript(tableId: number, description: string) {
        const result = await Http.post<{tableId: number, description: string}, {}>("/table/editTableDescription", {tableId, description});
        return result.data;
    }

    public async UpdateTableExtend(tableId: number, key: string, value: string) {
        const result = await Http.post<{tableId: number, key: string, value: string}, {}>("/table/updateTableExtend", {tableId, key, value})
        return result.isSuccess;
    }
}