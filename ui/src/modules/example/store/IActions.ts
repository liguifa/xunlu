import { IAction } from "../../../store";
import { IColumnItem } from "../common/ColumnItem";

export interface IGetTableExampleAction extends IAction {
    rows: string[],
    columns: IColumnItem[]
}

export interface IEditFieldDescriptionAction extends IAction {
    description: string,
    fieldId: string
}

export interface IEditFieldDictAction extends IAction {
    dict: string,
    fieldId: string
}