import { ITableItem } from "../common/TableItem";
import { EditBusinessService } from "../service/EditBusinessService";
import { EditBusinessActionTypes } from "./ActionTypes";
import { IChangeActviesAction, IEditBusinessAction, IHideEditBusinessWindowAction, IShowEditBusinessWindowAction } from "./IActions";

export const ChangeActviesAction: (actvies: ITableItem[]) => IChangeActviesAction = (actvies: ITableItem[]) => ({
    actvies,
    type: EditBusinessActionTypes.CHANGE_ACTIVES
});

export const HideEditBusinessWindowAction: () => IHideEditBusinessWindowAction = () => ({
    isShow: false,
    type: EditBusinessActionTypes.HIDE_EDIT_BUSINESS_WINDOW
});

export const EditBusinessAction: (businessId: number, name: string, actives: ITableItem[]) => (dispatch: (action: IEditBusinessAction) => void) => void = (businessId: number, name: string, actives: ITableItem[]) => (
    async (dispatch: (action: IEditBusinessAction) => void) => {
        await new EditBusinessService().SaveBusiness(businessId, name, actives.map(active => active.id));
        dispatch({
            isShow: false,
            type: EditBusinessActionTypes.EDIT_BUSINESS
        });
    }
)

export const ShowEditBusinessWindowAction: (businessId: number) => (dispatch: (action: IShowEditBusinessWindowAction) => void) => void = (businessId: number) => (
    async (dispatch: (action: IShowEditBusinessWindowAction) => void) => {
        const result = await new EditBusinessService().GetBusinessInfo(businessId);
        dispatch({
            actvies: result.tables,
            businessId,
            businessName: result.businessName,
            isShow: true,
            type: EditBusinessActionTypes.SHOW_Edit_BUSINESS_WINDOW
        })
    }
)