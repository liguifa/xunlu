import { match  } from "react-router-dom";
import { IFieldItem  } from "../common/FieldItem";
import { ILineage, ViewModel } from "../common/Lineage";
import { ITableItem } from "../common/TableItem";

export interface ILineageComponentProps extends ILineageDispatchProps, ILineageStateProps {
    match?: match<{tableId: string}>
}

export interface ILineageStateProps {
    tables: ITableItem[],
    lineages: ILineage[],
    nodeLevel: number,
    unWatchTableIds: string[],
    isShowTableInfo: boolean,
    tableInfo?: {
        tableId: string,
        tableName: string,
        tableType: 1 | 2,
        tableDescription: string
        fields: IFieldItem[]
    },
    model: ViewModel
}

export interface ILineageDispatchProps {
    GetTableLineages: (tableId: number) => void,
    ChangeUnWatchTables: (unWatchTableIds: string[]) => void,
    AddTableLineages: (tableId: number) => void,
    ShowTableInfo: (tableId: string, tableName: string, tableType: 1 | 2, tableDescription: string) => void,
    HideTableInfo: () => void,
    ChangeViewModel: (model: ViewModel) => void
}

export interface ILineageChartProps {
    lineage?: { nodes: ITableItem[], edges: ILineage[] },
    currentId: string,
    onAddTableLineages: (tableId: number) => void
    onShowTableInfo: (table: ITableItem) => void
    onUnWatchTable: (tableId: string) => void
}