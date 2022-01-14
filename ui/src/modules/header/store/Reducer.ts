import { HeaderActionTypes } from "./ActionTypes";
import { IChangeCrumbsAction, IChangeNavStatusAction } from "./IActions";
import { IHeaderState } from "./IState";

export const HeaderReducer: (state: IHeaderState, action: IChangeNavStatusAction | IChangeCrumbsAction) => IHeaderState = (state: IHeaderState, action: IChangeNavStatusAction | IChangeCrumbsAction) => {
    switch(action.type) {
        case HeaderActionTypes.CHNAGE_CRUMBS: {
            return { ...state, Crumbs: (action as IChangeCrumbsAction).Crumbs.map((item, index: number) => ({...item, key: index}))}
        }
        case HeaderActionTypes.CHANGE_NAV_STATUS: {
            return { ...state, isShrink: (action as IChangeNavStatusAction).isShrink}
        }
    }
    return { ...state }
}