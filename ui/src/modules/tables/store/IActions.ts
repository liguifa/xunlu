import { IAction } from "../../../store";
import { ITableItem } from "../common/TableItem";
import { TableType } from "../common/TableType";

export interface IGetBussionInfoAction extends IAction {
    businessId: number,
    businessName: string,
    searchKey: string,
    pageIndex: number,
    pageSize: number
    filterType: TableType,
    tables: ITableItem[],
    total: number,
    sortKey: string, 
    sortOrder: "descend" | "ascend"
}

export interface ILockTableAction extends IAction {
    tableId: number,
}

export interface IUnLockTableAction extends IAction {
    tableId: number,
}

export interface IEditTableDescriptionAction extends IAction {
    description: string,
    tableId: number
}

export interface ISetTableNameColumnWidthAction extends IAction {
    tableNameColumnWidth: number,
}

export interface IGetBusinessForAdminAction extends IAction {
    businesses: Array<{id: number, name: string}>
}

// tslint:disable-next-line
export interface IEditTableBusinessAction extends IAction {
    
}