import { ViewModel } from "../common/ViewModel";
import { RownumMonitorService } from "../service/RownumMonitorService";
import { RownumMonitorActionTypes } from "./ActionTypes";
import { IGetTableRownumsAction } from "./IActions";

export const GetTableRownumsAction: (tableId: number, start: number, end: number, model: ViewModel) => (dispatch: (action: IGetTableRownumsAction) => void) => void = (tableId: number, start: number, end: number, model: ViewModel) => (
    async (dispatch: (action: IGetTableRownumsAction) => void) => {
        const result = await new RownumMonitorService().GetTableRownums(tableId, start, end, model);
        dispatch({
            end,
            model,
            rownums: result.rownums,
            start,
            type: RownumMonitorActionTypes.GET_TABLE_NUMBERS
        })
    }
)