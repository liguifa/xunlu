export interface IOperationItem {
    username: string
    op: string
    type: string
    time: string
}

export enum OperationType {
    Insert = 1,
    Remove = 2,
    Update = 3,
    View = 4
}