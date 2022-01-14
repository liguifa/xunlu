import { ChooseTablesActionTypes } from "./ActionTypes";
import { IChangeActviesAction, IGetTablesAction, IHideChooseWindowAction, IShowChooseWindowAction } from "./IActions";
import { IChooseTablesState } from "./IState";

export const ChooseTablesReducer: (state: IChooseTablesState, action: IHideChooseWindowAction | IShowChooseWindowAction | IGetTablesAction | IChangeActviesAction) => IChooseTablesState = (state: IChooseTablesState, action: IHideChooseWindowAction | IShowChooseWindowAction | IGetTablesAction | IChangeActviesAction) => {
    switch(action.type) {
        case ChooseTablesActionTypes.HIDE_CHOOSE_WINDOW:
            return { ...state, isShow: (action as IShowChooseWindowAction).isShow }
        case ChooseTablesActionTypes.SHOW_CHOOSE_WINDOW:
            return { ...state, isShow: (action as IHideChooseWindowAction).isShow }
        case ChooseTablesActionTypes.GET_TABLES:
            return { ...state, pageIndex: (action as IGetTablesAction).pageIndex, items: (action as IGetTablesAction).items, total: (action as IGetTablesAction).total }
        case ChooseTablesActionTypes.CHANGE_ACTIVES:
            return { ...state, actives: (action as IChangeActviesAction).actives.map((item, index) => ({ ...item, index: index + 1 })) }
    }
    return { ...state }
}