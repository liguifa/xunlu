import { IAction } from "../../../store"
import { IFieldItem } from "../common/FieldItem";

export interface IGetFieldsAction extends IAction {
    items: IFieldItem[]
}

export interface IEditFieldDescriptionAction extends IAction {
    description: string,
    fieldId: string
}

export interface IEditFieldDictAction extends IAction {
    dict: string,
    fieldId: string
}

export interface ISetFieldNameColumnWidthAction extends IAction {
    width: number
}

export interface  IChangeLockStatusAction extends IAction {
    fieldId: string,
    isLock: boolean
}