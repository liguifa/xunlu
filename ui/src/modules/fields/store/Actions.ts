import { FieldsService } from "../service/FieldsService";
import { FieldsActionTypes } from "./ActionTypes";
import { IChangeLockStatusAction, IEditFieldDescriptionAction, IEditFieldDictAction, IGetFieldsAction, ISetFieldNameColumnWidthAction } from "./IActions";

export const GetFieldsAction: (tableId: number) => (dispatch: (action: IGetFieldsAction) => void) => void = (tableId: number) => (
    async (dispatch: (action: IGetFieldsAction) => void) => {
        const result = await new FieldsService().GetFields(tableId);
        dispatch({
            items: result.items,
            type: FieldsActionTypes.GET_FIELDS
        });
    }
)

export const EditFieldDescriptionAction: (fieldId: string, description: string) => (dispatch: (action: IEditFieldDescriptionAction) => void) => void = (fieldId: string, description: string) => (
    async (dispatch: (action: IEditFieldDescriptionAction) => void) => {
        await new FieldsService().EditFieldDescript(fieldId, description);
        dispatch({
            description,
            fieldId,
            type: FieldsActionTypes.EDIT_FIELD_DESCRIPTION
        })
    }
)

export const EditFieldDictAction: (fieldId: string, dict: string) => (dispatch: (action: IEditFieldDictAction) => void) => void = (fieldId: string, dict: string) => (
    async (dispatch: (action: IEditFieldDictAction) => void) => {
        await new FieldsService().EditFieldict(fieldId, dict);
        dispatch({
            dict,
            fieldId,
            type: FieldsActionTypes.EDIT_FIELD_DICT
        })
    }
)

export const SetFieldNameColumnWidthAction: (width: number) =>  ISetFieldNameColumnWidthAction = (width: number) => ({
    type: FieldsActionTypes.SET_FIELD_NAME_COLUMN_WIDTH,
    width,
})

export const ChangeLockStatusAction: (fieldid: string, isLock: boolean) => (dispatch: (action: IChangeLockStatusAction) => void)  => void = (fieldId: string, isLock: boolean) => (
    async (dispatch: (action: IChangeLockStatusAction) => void) => {
        await  new FieldsService().ChangeLockStatus(fieldId, isLock);
        dispatch({
            fieldId,
            isLock,
            type: FieldsActionTypes.CHANGE_LOCK_STARUS
        })
    }
)