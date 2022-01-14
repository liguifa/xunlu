import { TableType } from "./TableType";

export interface ITableItem {
    id: number,
    name: string,
    type: TableType,
    isSecret: boolean,
    createdTime: number,
    description: string,
    hot: number,
    key?: number,
    isCanView: boolean
}