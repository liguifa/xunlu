import { ViewModel } from "../common/ViewModel";
import { HotMonitorService } from "../service/HotMonitorService";
import { HotMonitorActionTypes } from "./ActionTypes";
import { IGetTableQuerytimesAction } from "./IActions";

export const GetTableQuerytimesAction: (tableId: number, start: number, end: number, model: ViewModel) => (dispatch: (action: IGetTableQuerytimesAction) => void) => void = (tableId: number, start: number, end: number, model: ViewModel) => (
    async (dispatch: (action: IGetTableQuerytimesAction) => void) => {
        const result = await new HotMonitorService().GetTableQuerytimes(tableId, start, end, model);
        dispatch({
            end,
            hots: result.hots,
            model,
            start,
            type: HotMonitorActionTypes.GET_TABLE_QUERYTIMES
        })
    }
)