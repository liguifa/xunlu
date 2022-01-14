import { match } from "react-router";

export enum ViewType {
    Example = "example",
    Paritition = "paritition",
    Fields = "fields",
    Lineage = "lineage",
    Rownum = "rownum",
    Hot = "hot",
    Nullvalue = "nullvalue"
}

export interface ITableComponentProps extends ITableDispatchProps, ITableStateProps  {
    match: match<{tableId?: string, view?: ViewType}>,
}

export interface ITableDispatchProps {
    GetTableInfo: (tableId: number) => void
    EditTableDescription: (tableId: number, desctiption: string) => void
    UpdateTableExtend: (tableId: number, key: string, value: string) => void
}

export interface ITableStateProps {
    tableName: string,
    businessId: number,
    businessName: string,
    tableType: string,
    rowTotal: number,
    isSecret: boolean,
    description: string,
    dbName: string,
    location: string,
    format: string,
    tblType: string,
    createTime: number,
    updateTime: number,
    isAdmin: boolean,
    isCanAccess: boolean,
    extends: Array<{name: string, value: string}>
}