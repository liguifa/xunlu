import { ViewModel } from "../common/ViewModel";
import { FieldNullvalueMonitorService } from "../service/FieldNullvalueMonitorService";
import { FieldNullvalueMonitorActionTypes } from "./ActionTypes";
import { IChangeFieldAction, IGetFieldNullvaluesAction, IGetFieldsAction } from "./IActions";

export const GetFieldNullvaluesAction: (tableId: number, start: number, end: number, model: ViewModel) => (dispatch: (action: IGetFieldNullvaluesAction) => void) => void = (tableId: number, start: number, end: number, model: ViewModel) => (
    async (dispatch: (action: IGetFieldNullvaluesAction) => void) => {
        const result = await new FieldNullvalueMonitorService().GetTableNullvalues(tableId, start, end, model);
        dispatch({
            end,
            model,
            nullvalues: result.items,
            start,
            type: FieldNullvalueMonitorActionTypes.GET_FIELD_NULLVALUES
        })
    }
)

export const GetFieldsAction: (tableId: number) => (dispatch: (action: IGetFieldsAction) => void) => void = (tableId: number) => (
    async (dispatch: (action: IGetFieldsAction) => void) => {
        const result = await new FieldNullvalueMonitorService().GetFields(tableId);
        dispatch({
            fields: result.items,
            type: FieldNullvalueMonitorActionTypes.GET_FIELD_INFOS
        })
    }
)

export const ChangeFieldAction: (currentField: string) => IChangeFieldAction = (currentField: string) => ({
    currentField,
    type: FieldNullvalueMonitorActionTypes.CHANGE_CURRENT_FIELD,
})