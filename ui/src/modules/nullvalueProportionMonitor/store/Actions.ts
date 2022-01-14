import { ViewModel } from "../common/ViewModel";
import { FieldNullvalueMonitorService } from "../service/NullvalueProportionMonitorService";
import { FieldNullvalueMonitorActionTypes } from "./ActionTypes";
import { IGetFieldNullvaluesAction } from "./IActions";

export const GetFieldNullvaluesAction: (tableId: number, start: number, end: number, model: ViewModel) => (dispatch: (action: IGetFieldNullvaluesAction) => void) => void = (tableId: number, start: number, end: number, model: ViewModel) => (
    async (dispatch: (action: IGetFieldNullvaluesAction) => void) => {
        const result = await new FieldNullvalueMonitorService().getFieldNullvalueProportion(tableId, start, end, model);
        dispatch({
            end,
            model,
            nullvalues: result.items,
            start,
            type: FieldNullvalueMonitorActionTypes.GET_FIELD_NULLVALUES
        })
    }
)