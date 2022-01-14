import { Http } from "../../../common";
import { ITablesResult } from "../common/TablesResult";
import { TableType } from "../common/TableType";

export class TablesService {
    public async GetBusinessInfo(businessId: number, searchKey: string, filterType: TableType, pageIndex: number, pageSize: number, sortKey: string, sortOrder: "descend" | "ascend"): Promise<ITablesResult> {
        const result = await Http.get<{ businessId: number, searchKey: string, filterType: TableType, pageIndex: number, pageSize: number, sortKey: string, sortOrder: "desc" | "asc" }, ITablesResult>('/business/getBusinessesInfo', {
            businessId,
            filterType,
            pageIndex,
            pageSize,
            searchKey, 
            sortKey,
            sortOrder: sortOrder === "ascend" ? "asc" : "desc"
        });
        return result.data;
    }

    public async LockTable(tableId: number) {
        const result = await Http.get<{tableId: number, isLock: boolean}, {}>("/table/changeLockStatus", {tableId, isLock: true});
        return result.data;
    }

    public async UnLockTable(tableId: number) {
        const result = await Http.get<{tableId: number, isLock: boolean}, {}>("/table/changeLockStatus", {tableId, isLock: false});
        return result.data;
    }

    public async EditTableDescript(tableId: number, description: string) {
        const result = await Http.post<{tableId: number, description: string}, {}>("/table/editTableDescription", {tableId, description});
        return result.data;
    }

    public async GetBusinessForAdmin() {
        const result = await Http.get<{}, {items: Array<{id: number, name: string}>}>("/business/getBusinessForAdmin");
        return result.data;
    }

    public async EditTableBusiness(tableId: number, businessId: number) {
        const result = await Http.post<{tableId: number, businessId: number}, {items: Array<{id: number, name: string}>}>("/table/editTableBusiness", {tableId, businessId});
        return result.data;
    }
}