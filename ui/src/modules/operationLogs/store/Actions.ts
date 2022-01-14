import { OperationType } from "../common/OperationItem";
import { OperationService } from "../service/OperationService";
import { OperationActionTypes } from "./ActionTypes";
import { IGetOperationLogsAction } from "./IActions";

export const GetOperationLogsAction: (pageIndex: number, searchKey: string, filterType: 0 | OperationType, start: number, end: number) => (dispatch: (action: IGetOperationLogsAction) => void) => void = (pageIndex: number, searchKey: string, filterType: 0 | OperationType, start: number, end: number) => (
    async (dispatch: (action: IGetOperationLogsAction) => void) => {
        const result = await new OperationService().GetOperationLogs(pageIndex, searchKey, filterType, start, end);
        dispatch({
            end,
            filterType,
            logs: result.logs,
            pageIndex,
            start,
            total: result.total,
            type: OperationActionTypes.GET_OPERATION_LOGS,
        })
    }
)