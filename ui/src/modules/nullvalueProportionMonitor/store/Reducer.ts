import { FieldNullvalueMonitorActionTypes } from "./ActionTypes";
import { IGetFieldNullvaluesAction } from "./IActions";
import { INullvalueProportionMonitorState } from "./IState";

export const NullvalueProportionMonitorReducer: (state: INullvalueProportionMonitorState, action: IGetFieldNullvaluesAction) => INullvalueProportionMonitorState = (state: INullvalueProportionMonitorState, action: IGetFieldNullvaluesAction) => {
    switch(action.type) {
        case FieldNullvalueMonitorActionTypes.GET_FIELD_NULLVALUES:
            return { 
                ...state,
                end: (action as IGetFieldNullvaluesAction).end,
                model: (action as IGetFieldNullvaluesAction).model,
                nullvalues: (action as IGetFieldNullvaluesAction).nullvalues,
                start: (action as IGetFieldNullvaluesAction).start,
            };
    }
    return { ...state };
}