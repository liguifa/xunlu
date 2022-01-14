import { OperationLogsAuthorizeActionTypes } from "./ActionTypes";
import { IChangeActivesAction, IGetOperationLogsAuthorize, IGetUsersAction, ISubmitAuthorizeAction } from "./IActions";
import { IOperationLogsAuthorizeState } from "./IState";

export const OperationLogsAuthorizeReducer: (state: IOperationLogsAuthorizeState, action: IGetUsersAction | IGetOperationLogsAuthorize | IChangeActivesAction | ISubmitAuthorizeAction) => IOperationLogsAuthorizeState = (state: IOperationLogsAuthorizeState, action: IGetUsersAction | IChangeActivesAction | ISubmitAuthorizeAction) => {
    switch(action.type) {
        case OperationLogsAuthorizeActionTypes.GET_USERS:
            return { ...state, users: (action as IGetUsersAction).users, total: (action as IGetUsersAction).total, pageIndex: (action as IGetUsersAction).pageIndex }
        case OperationLogsAuthorizeActionTypes.CHNAGE_ACTIVES:
            return { ...state, activeIds: (action as IChangeActivesAction).activeIds }
        case OperationLogsAuthorizeActionTypes.SUBMIT_AUTHORIZE:
            return { ...state, authorizeUserIds: (action as ISubmitAuthorizeAction).userIds }
        case OperationLogsAuthorizeActionTypes.GET_OPERATION_LOGS_AUTHORIZE:
            return { ...state, authorizeUserIds: (action as IGetOperationLogsAuthorize).userIds, activeIds: (action as IGetOperationLogsAuthorize).userIds }
    }
    return { ...state }
}