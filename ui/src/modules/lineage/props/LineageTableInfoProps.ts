import { IFieldItem } from "../common/FieldItem";

export interface ILineageTableInfoProps {
    tableId: string,
    tableName: string,
    tableType: 1 | 2,
    tableDescription: string
    fields: IFieldItem[],
    isShow: boolean,
    onClose: () => void
}