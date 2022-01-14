import { match  } from "react-router-dom";
import { IFieldProp } from "./FieldProp";

export interface IExampleProps extends IExampleStateProps, IExampleDispatchProps {
    match: match<{tableId: string}>
}

export interface IExampleStateProps {
    columns: IFieldProp[],
    rows: object[],
    isAdmin: boolean
}

export interface IExampleDispatchProps {
    GetTableExample: (tableId: number) => void
    EditFieldDescription: (fieldId: string, description: string) => void,
    EditFieldDict: (fieldId: string, dict: string) => void
}