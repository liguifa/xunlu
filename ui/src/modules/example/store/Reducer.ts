import { ExampleActionTypes } from "./ActionTypes";
import { IEditFieldDescriptionAction, IEditFieldDictAction, IGetTableExampleAction } from "./IActions";
import { IExampleState } from "./IState";

export const ExampleReducer: (state: IExampleState, action: IEditFieldDescriptionAction | IEditFieldDictAction | IGetTableExampleAction) => IExampleState = (state: IExampleState, action: IEditFieldDescriptionAction | IEditFieldDictAction | IGetTableExampleAction) => {
    switch(action.type) {
        case ExampleActionTypes.GET_TABLE_EXAMPLE:
            return {
                ...state,
                columns: (action as IGetTableExampleAction).columns,
                rows: (action as IGetTableExampleAction).rows
            }
        case ExampleActionTypes.EDIT_FIELD_DESCRIPTION:
            return { ...state, columns: state.columns.map(item => ({ ...item, description: (action as IEditFieldDescriptionAction).fieldId === item.id ? (action as IEditFieldDescriptionAction).description : item.description })) }
        case ExampleActionTypes.EDIT_FIELD_DICT:
            return { ...state, columns: state.columns.map(item => ({ ...item, dict: (action as IEditFieldDictAction).fieldId === item.id ? (action as IEditFieldDictAction).dict : item.dict })) }
    }
    return { ...state }
}