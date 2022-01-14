import { CreateBusinessActives } from "./ActiveTypes";
import { IChangeActviesAction, ICreateBusinessAction, IHideCreateBusinessWindowAction, IShowCreateBusinessWindowAction } from "./IActvies";
import { ICreateBusinessState } from "./IState";

export const CreateBusinessReducer: (state: ICreateBusinessState, action: IChangeActviesAction | IHideCreateBusinessWindowAction | IShowCreateBusinessWindowAction | ICreateBusinessAction) => ICreateBusinessState = (state: ICreateBusinessState, action: IChangeActviesAction | IHideCreateBusinessWindowAction | IShowCreateBusinessWindowAction | ICreateBusinessAction) => {
    switch(action.type) {
        case CreateBusinessActives.CHANGE_ACTIVES:
            return { ...state, actives: (action as IChangeActviesAction).actvies.map((active, index) => ({ ...active, index: index + 1 })) }
        case CreateBusinessActives.HIDE_CREATE_BUSINESS_WINDOW:
            return { ...state, isShow: (action as IHideCreateBusinessWindowAction).isShow }
        case CreateBusinessActives.SHOW_CREATE_BUSINESS_WINDOW:
            return { ...state, isShow: (action as IShowCreateBusinessWindowAction).isShow }
        case CreateBusinessActives.CREATE_BUSINESS:
            return { ...state, isShow: (action as ICreateBusinessAction).isShow }
    }
    return { ...state }
}