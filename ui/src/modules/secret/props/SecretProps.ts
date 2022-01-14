import { match } from "react-router"
import { ITableItem, TableType } from "../common/TableItem";

export interface ISecretProps extends ISecretStateProps, ISecretDispatchProps {
    match?: match<{ businessId: string }>,
}

export interface ISecretStateProps {
    tables: ITableItem[],
    filterType: TableType,
    searchKey: string,
    pageIndex: number,
    pageSize: number,
    total: number,
    sortKey: string,
    sortOrder: "descend" | "ascend",
    tableNameWidth: number,
}

export interface ISecretDispatchProps {
    GetSecretTables: (searchKey: string, filterType: TableType, pageIndex: number, pageSize: number, sortKey: string, sortOrder: "descend" | "ascend") => void
    SetTableNameWidth: (width: number) => void
    UnLockTable: (tableId: number) => void,
    LockTables: (tableIds: number[]) => void
}