import { TemplateActionTypes } from "./ActionTypes";
import { IGetTemplateAction } from "./IActions";
import { ITemplateState } from "./IState";

export const TemplateReducer: (state: ITemplateState, action: IGetTemplateAction) => ITemplateState = (state: ITemplateState, action: IGetTemplateAction) => {
    switch(action.type) {
        case TemplateActionTypes.GET_TEMPLATES:
            return { ...state, items: action.items.map((item, index) => ({ ...item, index: index + 1 })) }
    }
    return { ...state }
}