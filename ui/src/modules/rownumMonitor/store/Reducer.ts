import { RownumMonitorActionTypes } from "./ActionTypes";
import { IGetTableRownumsAction } from "./IActions";
import { IRownumMonitorState } from "./IState";

export const RownumMonitorReducer: (state: IRownumMonitorState, action: IGetTableRownumsAction) => IRownumMonitorState = (state: IRownumMonitorState, action: IGetTableRownumsAction) => {
    switch(action.type) {
        case RownumMonitorActionTypes.GET_TABLE_NUMBERS:
            return { 
                ...state,
                end: (action as IGetTableRownumsAction).end,
                model: (action as IGetTableRownumsAction).model,
                rownums: (action as IGetTableRownumsAction).rownums,
                start: (action as IGetTableRownumsAction).start,
            };
    }
    return { ...state };
}