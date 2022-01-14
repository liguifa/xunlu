import {FieldsActionTypes } from "./ActionTypes";
import { IChangeLockStatusAction, IEditFieldDescriptionAction, IEditFieldDictAction, IGetFieldsAction, ISetFieldNameColumnWidthAction } from "./IActions";
import { IFieldsState } from "./IState";

export const FieldsReducer: (state: IFieldsState, action: IChangeLockStatusAction | ISetFieldNameColumnWidthAction| IGetFieldsAction | IEditFieldDescriptionAction | IEditFieldDictAction) => IFieldsState = (state: IFieldsState, action: IChangeLockStatusAction | IGetFieldsAction | IEditFieldDescriptionAction | IEditFieldDictAction | ISetFieldNameColumnWidthAction) => {
    switch(action.type) {
        case FieldsActionTypes.GET_FIELDS: 
            return { ...state, items: (action as IGetFieldsAction).items.map((item, index) => ({ ...item, index: index + 1 })) }
        case FieldsActionTypes.EDIT_FIELD_DESCRIPTION:
            return { ...state, items: state.items.map(item => ({ ...item, description: (action as IEditFieldDescriptionAction).fieldId === item.id ? (action as IEditFieldDescriptionAction).description : item.description })) }
        case FieldsActionTypes.EDIT_FIELD_DICT:
            return { ...state, items: state.items.map(item => ({ ...item, dict: (action as IEditFieldDictAction).fieldId === item.id ? (action as IEditFieldDictAction).dict : item.dict })) }
        case FieldsActionTypes.SET_FIELD_NAME_COLUMN_WIDTH:
            return { ...state, fieldWidth: (action as ISetFieldNameColumnWidthAction).width }
        case FieldsActionTypes.CHANGE_LOCK_STARUS:
            return { ...state, items: state.items.map(item => ({ ...item, secret: item.id === (action as IChangeLockStatusAction).fieldId ?  (action as IChangeLockStatusAction).isLock : item.secret})) }
    }
    return { ...state }
}