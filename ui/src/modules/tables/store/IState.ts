import { ITableItem } from "../common/TableItem";
import { TableType } from "../common/TableType";

export interface ITablesState {
    businessId: string | number,
    businessName: string,
    tables: ITableItem[],
    filterType: TableType,
    searchKey: string,
    pageIndex: number,
    pageSize: number,
    total: number,
    sortKey: string, 
    sortOrder: "descend" | "ascend",
    tableNameColumnWidth: number,
    businesses: Array<{id: number, name: string}>
}