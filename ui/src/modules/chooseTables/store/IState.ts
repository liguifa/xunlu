import { ITableItem } from "../common/TableItem";

export interface IChooseTablesState {
    items: ITableItem[]
    actives: ITableItem[]
    isShow: boolean,
    pageIndex: number,
    total: number
}