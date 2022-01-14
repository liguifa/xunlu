export interface ITableItem {
    id: number,
    business: string,
    name: string,
    type: TableType,
    isSecret: boolean,
    createdTime: number,
    description: string,
    hot: number,
    key?: number,
    isCanView: boolean
}

export enum TableType {
    None = "",
    Hive = 1,
    Kylin = 2,
} 