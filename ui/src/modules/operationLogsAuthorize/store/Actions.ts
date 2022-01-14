import { OperationLogsAuthorizeService } from "../service/OperationLogsAuthorizeService";
import { OperationLogsAuthorizeActionTypes } from "./ActionTypes";
import { IChangeActivesAction,IGetOperationLogsAuthorize, IGetUsersAction, ISubmitAuthorizeAction } from "./IActions";

export const GetUsersAction: (pageIndex: number, searchkey: string) => (dispatch: (action: IGetUsersAction) => void) => void =  (pageIndex: number, searchkey: string) => (
    async (dispatch: (action: IGetUsersAction) => void) =>  {
        const result = await new OperationLogsAuthorizeService().GetUsers(pageIndex, searchkey);
        dispatch({
            pageIndex,
            total: result.total,
            type: OperationLogsAuthorizeActionTypes.GET_USERS,
            users: result.users,
        })
    }
)

export const ChangeActivesAction: (activeIds: number[]) => IChangeActivesAction = (activeIds: number[]) => ({
    activeIds,
    type: OperationLogsAuthorizeActionTypes.CHNAGE_ACTIVES
})

export const SubmitAuthorizeAction: (businessId: number, userIds: number[]) => (dispatch: (action: ISubmitAuthorizeAction) => void) => void =  (businessId: number, userIds: number[]) => (
    async (dispatch: (action: ISubmitAuthorizeAction) => void) =>  {
        await new OperationLogsAuthorizeService().SubmitAuthorize(businessId, userIds);
        dispatch({
            type: OperationLogsAuthorizeActionTypes.SUBMIT_AUTHORIZE,
            userIds,
        })
    }
) 

export const GetOperationLogsAuthorize: (businessId: number) => (dispatch: (action: IGetOperationLogsAuthorize) => void) => void = (businessId: number) => (
    async (dispatch: (action: IGetOperationLogsAuthorize) => void)  => {
        const result = await new OperationLogsAuthorizeService().GetOperationLogsAuthorize(businessId);
        dispatch({
            type: OperationLogsAuthorizeActionTypes.GET_OPERATION_LOGS_AUTHORIZE,
            userIds: result
        })
    }
)