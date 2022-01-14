import { OperationActionTypes } from "./ActionTypes";
import { IGetOperationLogsAction } from "./IActions";
import { IOperationLogsState } from "./IState";

export const OperationLogsReducer: (state: IOperationLogsState, action: IGetOperationLogsAction) => IOperationLogsState = (state: IOperationLogsState, action: IGetOperationLogsAction) => {
    switch(action.type) {
        case OperationActionTypes.GET_OPERATION_LOGS:
            return {
                ...state,
                end: action.end,
                logs: action.logs.map((item, index) => ({ ...item, index: index + 1 })),
                pageIndex: action.pageIndex,
                start: action.start,
                total: action.total,
                type: action.filterType,
            }
    }
    return { ...state }
}