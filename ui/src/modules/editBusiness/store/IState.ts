import { ITableItem } from "../common/TableItem";

export interface IEditBusinessState {
    actives: ITableItem[]
    isShow: boolean,
    businessName: string,
    businessId: number
}