import { IAction } from "../../../store";
import { ITableItem, TableType } from "../common/TableItem";

export interface ISetTableNameWidthAction extends IAction {
    width: number
}

export interface IGetSecretTablesAction extends IAction {
    tables: ITableItem[],
    filterType: TableType,
    searchKey: string,
    pageIndex: number,
    pageSize: number,
    total: number,
    sortKey: string, 
    sortOrder: "descend" | "ascend",
}

export interface IUnLockTableAction extends IAction {
    tableId: number
}

export interface ILockTablesAction extends IAction {
    tableIds: number[]
}