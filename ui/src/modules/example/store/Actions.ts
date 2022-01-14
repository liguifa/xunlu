import { ExampleService } from "../service/ExampleService";
import { ExampleActionTypes } from "./ActionTypes";
import { IEditFieldDescriptionAction, IEditFieldDictAction, IGetTableExampleAction } from "./IActions";

export const GetTableExampleAction: (tableId: number) => (dispatch: (action: IGetTableExampleAction) => void) => void = (tableId: number) => (
    async (dispatch: (action: IGetTableExampleAction) => void) => {
        const result = await new ExampleService().GetTableExample(tableId);
        dispatch({
            columns: result.columns,
            rows: result.rows,
            type: ExampleActionTypes.GET_TABLE_EXAMPLE
        });
    }
)

export const EditFieldDescriptionAction: (fieldId: string, description: string) => (dispatch: (action: IEditFieldDescriptionAction) => void) => void = (fieldId: string, description: string) => (
    async (dispatch: (action: IEditFieldDescriptionAction) => void) => {
        await new ExampleService().EditFieldDescript(fieldId, description);
        dispatch({
            description,
            fieldId,
            type: ExampleActionTypes.EDIT_FIELD_DESCRIPTION
        })
    }
)

export const EditFieldDictAction: (fieldId: string, dict: string) => (dispatch: (action: IEditFieldDictAction) => void) => void = (fieldId: string, dict: string) => (
    async (dispatch: (action: IEditFieldDictAction) => void) => {
        await new ExampleService().EditFieldict(fieldId, dict);
        dispatch({
            dict,
            fieldId,
            type: ExampleActionTypes.EDIT_FIELD_DICT
        })
    }
)