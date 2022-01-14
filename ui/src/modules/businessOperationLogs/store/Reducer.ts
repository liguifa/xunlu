import { BusinessOperationLogsActionTypes } from "./ActionTypes";
import { IChangeBusinessOperationLogsWindowStatusAction, IGetBusinessOperationLogsAction } from "./IActions";
import { IBusinessOperationLogsState } from "./IState";

export const BusinessOperationLogsReducer: (state: IBusinessOperationLogsState, action: IChangeBusinessOperationLogsWindowStatusAction | IGetBusinessOperationLogsAction) =>  IBusinessOperationLogsState = (state: IBusinessOperationLogsState, action: IChangeBusinessOperationLogsWindowStatusAction | IGetBusinessOperationLogsAction) => {
    switch(action.type) {
        case BusinessOperationLogsActionTypes.CHANGE_BUSINESS_OPERATION_LOGS_WINDOW_STATUS:
            return { ...state, isShow: (action as IChangeBusinessOperationLogsWindowStatusAction).isShow }
        case BusinessOperationLogsActionTypes.GET_BUSINESS_OPERATION_LOGS:
            return { ...state, logs: (action as IGetBusinessOperationLogsAction).logs, total: (action as IGetBusinessOperationLogsAction).total, pageIndex: (action as IGetBusinessOperationLogsAction).pageIndex, start: (action as IGetBusinessOperationLogsAction).start, end: (action as IGetBusinessOperationLogsAction).end, isIncludeView: (action as IGetBusinessOperationLogsAction).isIncludeView }
    }
    return { ...state }
}