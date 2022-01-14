export interface ITableResult {    
    tableId: number,
    tableName: string,
    businessId: number,
    businessName: string,
    type: string,
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