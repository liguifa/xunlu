import { IFieldItem } from "../common/FieldItem";
import { ILineage, ViewModel } from "../common/Lineage";
import { ITableItem } from "../common/TableItem";

export interface ILineageState {
    tables: ITableItem[],
    lineages: ILineage[],
    nodeLevel: number,
    unWatchTableIds: string[],
    showInfo: {
        tableId: string,
        tableName: string,
        tableType: 1 | 2,
        tableDescription: string
        fields: IFieldItem[]
    },
    isShowTableInfo: boolean,
    model: ViewModel
}