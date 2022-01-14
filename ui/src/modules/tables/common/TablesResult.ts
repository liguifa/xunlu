import { ITableItem } from "./TableItem";

export interface ITablesResult {
    total: number,
    businessName: string,
    tables: ITableItem[]
}