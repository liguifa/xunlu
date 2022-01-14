import { Http } from "../../../common/http";
import { ITableItem } from "../common/TableItem";

export class ChooseTablesService {
    public async GetTables(pageIndex: number, isIncludeSceret: boolean) {
        const result = await Http.get<{pageIndex: number, pageSize: number, isIncludeSceret: boolean}, {items: ITableItem[], total: number}>("/table/getTables", {
            isIncludeSceret,
            pageIndex,
            pageSize: 5,
        });
        return result.data;
    }
}