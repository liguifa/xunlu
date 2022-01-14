import { IAction } from "../../../store";

export interface IGetTableInfoAction extends IAction {
    tableId: number,
    tableName: string,
    businessId: number,
    businessName: string,
    tableType: string,
    isSecret: boolean,
    rowTotal: number,
    description: string,
    dbName: string,
    location: string,
    format: string,
    tblType: string,
    createTime: number,
    updateTime: number,
    isCanAccess: boolean,
    extends: Array<{name: string, value: string}>
}

export interface IEditTableDescriptionAction extends IAction {
    description: string
}

export interface IUpdateTableExtendAction extends IAction {
    tableId: number
    key: string
    value: string
}