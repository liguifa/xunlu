import { TableNullvalueMonitorActionTypes } from "./ActionTypes";
import { IGetTableNullvaluesAction } from "./IActions";
import { ITableNullvalueMonitorState } from "./IState";

export const TableNullvalueMonitorReducer: (state: ITableNullvalueMonitorState, action: IGetTableNullvaluesAction) => ITableNullvalueMonitorState = (state: ITableNullvalueMonitorState, action: IGetTableNullvaluesAction) => {
    switch(action.type) {
        case TableNullvalueMonitorActionTypes.GET_TABLE_NULLVALUES:
            return { 
                ...state,
                end: (action as IGetTableNullvaluesAction).end,
                model: (action as IGetTableNullvaluesAction).model,
                nullvalues: (action as IGetTableNullvaluesAction).nullvalues,
                start: (action as IGetTableNullvaluesAction).start,
            };
    }
    return { ...state };
}