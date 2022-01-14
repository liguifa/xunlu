import { NavService } from "../service/NavService";
import { NavActionTypes } from "./ActionTypes";
import { IChangeMenuAction, IChangeSelectKeyAction, IGetBusinessesAction } from "./IActions";

export const GetBusinessesAction: () => (dispatch: (action: IGetBusinessesAction) => void) => void = () => (
    async (dispatch: (action: IGetBusinessesAction) => void) => {
        const result = await (new NavService()).GetBusinesses();
        dispatch({
            Businesses: result.map(item => ({ ...item })),
            type: NavActionTypes.GET_BUSINESSES
        })
    }
)

export const ChangeMenuAction: (activeId: string) => IChangeMenuAction = (activeId: string) => ({
    activeId,
    type: NavActionTypes.CHANGE_MENU
})

export const ChangeSelectKeyAction: (selectKey: string) => IChangeSelectKeyAction = (selectKey: string) => ({
    selectKey,
    type: NavActionTypes.CHANGE_MENU
})
