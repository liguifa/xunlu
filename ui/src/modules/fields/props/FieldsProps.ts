import { match } from "react-router-dom";
import { IFieldItem } from "../common/FieldItem";

export interface IFieldsProps extends IFieldsStateProps, IFieldsDispatchProps {
    match: match<{tableId: string}>
}

export interface IFieldsStateProps {
    items: IFieldItem[]
    isAdmin: boolean,
    fieldWidth: number
}

export interface IFieldsDispatchProps {
    GetFields: (tableId:  number) => void
    EditFieldDescription: (fieldId: string, description: string) => void,
    EditFieldDict: (fieldId: string, dict: string) => void,
    SetFieldNameWidth: (width: number) => void
    ChangeLockStatus: (fieldId: string, isLock: boolean) => void
}