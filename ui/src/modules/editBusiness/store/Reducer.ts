import { EditBusinessActionTypes } from "./ActionTypes";
import { IChangeActviesAction, IEditBusinessAction, IHideEditBusinessWindowAction, IShowEditBusinessWindowAction } from "./IActions";
import { IEditBusinessState } from "./IState";

export const EditBusinessReducer: (state: IEditBusinessState, action: IChangeActviesAction | IHideEditBusinessWindowAction | IShowEditBusinessWindowAction | IEditBusinessAction) => IEditBusinessState = (state: IEditBusinessState, action: IChangeActviesAction | IHideEditBusinessWindowAction | IShowEditBusinessWindowAction | IEditBusinessAction) => {
    switch(action.type) {
        case EditBusinessActionTypes.CHANGE_ACTIVES:
            return { ...state, actives: (action as IChangeActviesAction).actvies.map((active, index) => ({ ...active, index: index + 1 })) }
        case EditBusinessActionTypes.HIDE_EDIT_BUSINESS_WINDOW:
            return { ...state, isShow: (action as IHideEditBusinessWindowAction).isShow }
        case EditBusinessActionTypes.SHOW_Edit_BUSINESS_WINDOW:
            return { ...state, isShow: (action as IShowEditBusinessWindowAction).isShow, businessId: (action as IShowEditBusinessWindowAction).businessId, businessName: (action as IShowEditBusinessWindowAction).businessName, actives: (action as IShowEditBusinessWindowAction).actvies.map((active, index) => ({ ...active, index: index + 1 })) }
        case EditBusinessActionTypes.EDIT_BUSINESS:
            return { ...state, isShow: (action as IEditBusinessAction).isShow }
    }
    return { ...state }
}