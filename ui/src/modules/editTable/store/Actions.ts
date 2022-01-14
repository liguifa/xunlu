import { EditTableService } from "../service/EditTableService";
import { EditTypeActionTypes } from "./ActionTypes";
import { IEditTableAction, IGetAllTemplatesAction, IGetBusinessForAdminAction, IHideEditTableWindowAction, IShowEditTableWindowAction } from "./IActions";

export const ShowEditTableWindowAction: () => IShowEditTableWindowAction = () => ({
    isShow: true,
    type: EditTypeActionTypes.SHOW_EDIT_TABLE_WINDOW
})

export const HideEditTableWindowAction: () => IHideEditTableWindowAction = () => ({
    isShow: false,
    type: EditTypeActionTypes.HIDE_EDIT_TABLE_WINDOW
})

export const EditTableAction: (id: number, isSecret: boolean, businessName: string, templateIds: number[], description: string) => (dispatchj: (action: IEditTableAction) => void) => void = (id: number, isSecret: boolean, businessName: string, templateIds: number[], description: string) => (
    async (dispatch: (action: IEditTableAction) => void) => {
        await new EditTableService().EditTable(id, isSecret, businessName, templateIds, description);
        dispatch({
            isShow: false,
            type: EditTypeActionTypes.EDIT_TABLE
        })
    }
)

export const GetAllTemplatesAction: () => (dispatch: (action: IGetAllTemplatesAction) => void) => void = () => (
    async (dispatch: (action: IGetAllTemplatesAction) => void) => {
        const result = await new EditTableService().GetAllTemplates();
        dispatch({
            templates: result.templates,
            type: EditTypeActionTypes.GET_ALL_TEMPLATES
        })
    }
)

export const GetBusinessForAdminAction: () => (dispatch: (action: IGetBusinessForAdminAction) => void) => void = () => (
    async (dispatch: (action: IGetBusinessForAdminAction) => void) => {
        const result = await new EditTableService().GetBusinessForAdmin();
        dispatch({
            businesses: result.items,
            type: EditTypeActionTypes.GET_BUSINESS_FOR_ADMIN
        })
    }
)