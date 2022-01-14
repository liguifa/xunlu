import { EditTypeActionTypes } from "./ActionTypes";
import { IEditTableAction, IGetAllTemplatesAction, IGetBusinessForAdminAction, IHideEditTableWindowAction, IShowEditTableWindowAction } from "./IActions";
import { IEditTableState } from "./IState";

export const EditTableReducer: (state: IEditTableState, action: IGetBusinessForAdminAction | IGetAllTemplatesAction | IEditTableAction | IHideEditTableWindowAction | IShowEditTableWindowAction) => IEditTableState = (state: IEditTableState, action: IGetBusinessForAdminAction | IGetAllTemplatesAction | IEditTableAction | IHideEditTableWindowAction | IShowEditTableWindowAction) => {
    switch(action.type) {
        case EditTypeActionTypes.HIDE_EDIT_TABLE_WINDOW:
            return { ...state, visible: (action as IHideEditTableWindowAction).isShow }
        case EditTypeActionTypes.EDIT_TABLE:
            return { ...state, visible: (action as IEditTableAction).isShow }
        case EditTypeActionTypes.SHOW_EDIT_TABLE_WINDOW:
            return { ...state, visible: (action as IShowEditTableWindowAction).isShow }
        case EditTypeActionTypes.GET_ALL_TEMPLATES:
            return { ...state, templates: (action as IGetAllTemplatesAction).templates }
        case EditTypeActionTypes.GET_BUSINESS_FOR_ADMIN:
            return { ...state, businesses: (action as IGetBusinessForAdminAction).businesses }
    }
    return { ...state }
}