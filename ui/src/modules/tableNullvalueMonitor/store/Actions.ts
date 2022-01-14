import { ViewModel } from "../common/ViewModel";
import { TableNullvalueMonitorService } from "../service/TableNullvalueMonitorService";
import { TableNullvalueMonitorActionTypes } from "./ActionTypes";
import { IGetTableNullvaluesAction } from "./IActions";

export const GetTableNullvaluesAction: (tableId: number, start: number, end: number, model: ViewModel) => (dispatch: (action: IGetTableNullvaluesAction) => void) => void = (tableId: number, start: number, end: number, model: ViewModel) => (
    async (dispatch: (action: IGetTableNullvaluesAction) => void) => {
        const result = await new TableNullvalueMonitorService().GetTableNullvalues(tableId, start, end, model);
        dispatch({
            end,
            model,
            nullvalues: result.nullvalues,
            start,
            type: TableNullvalueMonitorActionTypes.GET_TABLE_NULLVALUES
        })
    }
)