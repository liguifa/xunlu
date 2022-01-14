import { ITableItem } from "../common/ITableItem";

export interface IEditAuthorizeState {
    id: number,
    isShow: boolean,
    actives: number[],
    username: string,
    tables: ITableItem[],
    total: number,
    roleId: number
}