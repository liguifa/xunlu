import { NavActionTypes } from "./ActionTypes";
import { IChangeMenuAction, IChangeSelectKeyAction, IGetBusinessesAction } from "./IActions";
import { INavState } from "./IState";

export const NavReducer: (state: INavState, action: IChangeSelectKeyAction | IChangeMenuAction | IGetBusinessesAction) => INavState = (state: INavState, action: IChangeSelectKeyAction | IChangeMenuAction | IGetBusinessesAction) => {
    switch(action.type){
        case NavActionTypes.GET_BUSINESSES:
            return { ...state, Businesses: (action as IGetBusinessesAction).Businesses.map(item => ({ ...item })) }
        case NavActionTypes.CHANGE_MENU:
            return { ...state, activeId: (action as IChangeMenuAction).activeId }
        case NavActionTypes.CHANGE_SELECT_KEY:
            return { ...state, selectKey: (action as IChangeSelectKeyAction).selectKey }
    }
    return { ...state }
}