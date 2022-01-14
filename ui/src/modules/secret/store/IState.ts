import { ITableItem, TableType } from "../common/TableItem";

export interface ISecretState {
    tables: ITableItem[],
    filterType: TableType,
    searchKey: string,
    pageIndex: number,
    pageSize: number,
    total: number,
    sortKey: string, 
    sortOrder: "descend" | "ascend",
    tableNameWidth: number
}