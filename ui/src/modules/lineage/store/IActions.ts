import { IAction } from "../../../store";
import { IFieldItem } from "../common/FieldItem";
import { ILineage, ViewModel } from "../common/Lineage";
import { ITableItem } from "../common/TableItem";

export interface IGetTableLineageAction extends IAction {
    tables: ITableItem[],
    lineages: ILineage[]
}

export interface IAddTableLineageAction extends IAction {
    tables: ITableItem[],
    lineages: ILineage[]
}

export interface IChangeUnWatchTablesAction extends IAction {
    unWatchTableIds: string[]
} 

export interface IShowTableInfoAction extends IAction {
    tableId: string,
    tableName: string,
    tableType: 1 | 2,
    tableDescription: string
    fields: IFieldItem[],
}

// tslint:disable-next-line
export interface IHideTableInfoAction extends IAction {

}

export interface IChangeViewModelAction extends IAction {
    model: ViewModel
}