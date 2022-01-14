export interface ITableState {
    tableId: number,
    tableName: string,
    businessId: number,
    businessName: string,
    isSecret: boolean,
    type: string,
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