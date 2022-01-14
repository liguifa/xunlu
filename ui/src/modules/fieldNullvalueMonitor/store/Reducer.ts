import { FieldNullvalueMonitorActionTypes } from "./ActionTypes";
import { IChangeFieldAction, IGetFieldNullvaluesAction, IGetFieldsAction } from "./IActions";
import { IFieldNullvalueMonitorState } from "./IState";

export const FieldNullvalueMonitorReducer: (state: IFieldNullvalueMonitorState, action: IChangeFieldAction | IGetFieldsAction | IGetFieldNullvaluesAction) => IFieldNullvalueMonitorState = (state: IFieldNullvalueMonitorState, action: IChangeFieldAction | IGetFieldsAction | IGetFieldNullvaluesAction) => {
    switch(action.type) {
        case FieldNullvalueMonitorActionTypes.GET_FIELD_NULLVALUES:
            return { 
                ...state,
                end: (action as IGetFieldNullvaluesAction).end,
                model: (action as IGetFieldNullvaluesAction).model,
                nullvalues: (action as IGetFieldNullvaluesAction).nullvalues,
                start: (action as IGetFieldNullvaluesAction).start,
            };
        case FieldNullvalueMonitorActionTypes.GET_FIELD_INFOS:
            return { ...state, fields: (action as IGetFieldsAction).fields, currentField: (action as IGetFieldsAction).fields.length > 0 ? (action as IGetFieldsAction).fields[0].name : ""}
        case FieldNullvalueMonitorActionTypes.CHANGE_CURRENT_FIELD:
            return { ...state, currentField: (action as IChangeFieldAction).currentField }
    }
    return { ...state };
}