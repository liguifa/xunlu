import { match } from "react-router"
import { ITableItem } from "../common/TableItem";
import { TableType } from "../common/TableType";

export interface ITablesProps extends ITablesStateProps, ITablesDispatchProps {
    match?: match<{businessId: string}>,
}

export interface ITablesStateProps {
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
    isAdmin: boolean,
    tableNameWidth: number,
    isShrink: boolean,
    businesses: Array<{id: number, name: string}>,
    isCanViewOperationLogs: boolean
}

export interface ITablesDispatchProps {
    GetBusinessInfo: (businessId: number, searchKey: string, filterType: TableType,  pageIndex: number, pageSize: number, sortKey: string, sortOredr: "descend" | "ascend") => void
    GetBusinessForAdmin: () => void
    LockTable: (tableId: number) => void
    UnLockTable: (tableId: number) => void
    EditTableBusiness: (tableId: number, businessId: number) => void
    EditTableDescription: (tableId: number, desctiption: string) => void
    SetTableNameWidth: (width: number) => void
}