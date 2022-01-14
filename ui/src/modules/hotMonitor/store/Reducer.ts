import { HotMonitorActionTypes } from "./ActionTypes";
import { IGetTableQuerytimesAction } from "./IActions";
import { IHotMonitorState } from "./IState";

export const HotMonitorReducer: (state: IHotMonitorState, action: IGetTableQuerytimesAction) => IHotMonitorState = (state: IHotMonitorState, action: IGetTableQuerytimesAction) => {
    switch(action.type) {
        case HotMonitorActionTypes.GET_TABLE_QUERYTIMES:
            return { 
                ...state,
                end: (action as IGetTableQuerytimesAction).end,
                hots: (action as IGetTableQuerytimesAction).hots,
                model: (action as IGetTableQuerytimesAction).model,
                start: (action as IGetTableQuerytimesAction).start,
            };
    }
    return { ...state };
}