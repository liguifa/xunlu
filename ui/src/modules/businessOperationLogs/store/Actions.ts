import { BusinessOperationService } from "../service/BusinessOperationLogsService";
import { BusinessOperationLogsActionTypes } from "./ActionTypes";
import { IChangeBusinessOperationLogsWindowStatusAction, IGetBusinessOperationLogsAction } from "./IActions";

export const ShowBusinessOperationLogsWindowStatusAction: () => IChangeBusinessOperationLogsWindowStatusAction = () => ({
    isShow: true,
    type: BusinessOperationLogsActionTypes.CHANGE_BUSINESS_OPERATION_LOGS_WINDOW_STATUS
});

export const HideBusinessOperationLogsWindowStatusAction: () => IChangeBusinessOperationLogsWindowStatusAction = () => ({
    isShow: false,
    type: BusinessOperationLogsActionTypes.CHANGE_BUSINESS_OPERATION_LOGS_WINDOW_STATUS
});

export const GetBusinessOperationLogsAction: (businessId: number, pageIndex: number, searchKey: string, isIncludeView: boolean, start: number, end: number) => (dispatch: (action: IGetBusinessOperationLogsAction) => void) => void = (businessId: number, pageIndex: number, searchKey: string, isIncludeView: boolean, start: number, end: number) => (
    async (dispatch: (action: IGetBusinessOperationLogsAction) => void) => {
        const result = await new BusinessOperationService().GetBusinessOperationLogs(businessId, pageIndex, searchKey, isIncludeView, start, end);
        dispatch({
            end,
            isIncludeView,
            logs: result.logs,
            pageIndex,
            start,
            total: result.total,
            type: BusinessOperationLogsActionTypes.GET_BUSINESS_OPERATION_LOGS,
        })
    }
)