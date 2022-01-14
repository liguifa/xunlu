import { Http } from "../../../common";
import { ITableItem, TableType } from "../common/TableItem";

export class SecretService {
    public async GetSecretTables(searchKey: string, filterType: TableType,  pageIndex: number, pageSize: number, sortKey: string, sortOrder: "descend" | "ascend") {
        const result = await Http.get<{searchKey: string, filterType: TableType,  pageIndex: number, pageSize: number, sortKey: string, sortOrder: string}, {items: ITableItem[], total: number}>("/table/getSecretTables", {
            filterType,  
            pageIndex, 
            pageSize, 
            searchKey, 
            sortKey, 
            sortOrder: sortOrder === "ascend" ? "asc" : "desc",
        });
        return result.data;
    }

    public async UnLockTable(tableId: number) {
        const result = await Http.get<{tableId: number, isLock: boolean}, {}>("/table/changeLockStatus", {tableId, isLock: false});
        return result.data;
    }

    public async LockTables(tableIds: number[]) {
        const result = await Http.get<{tableIds: number[], isLock: boolean}, {}>("/table/changeLockStatusForTables", {tableIds, isLock: true});
        return result.data;
    }
}