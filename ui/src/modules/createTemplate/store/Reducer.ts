import { CreateTemplateActionTypes } from "./ActionTypes";
import { IChangeValidateStatusAction, IHideCreateTemplateAction, IShowCreateTemplateAction, ISubmitTemplateAction } from "./IActions";
import { ICreateTemplateState } from "./IState";

export const CreateTemplateReducer: (state: ICreateTemplateState, action: IChangeValidateStatusAction | IHideCreateTemplateAction | IShowCreateTemplateAction | ISubmitTemplateAction) => ICreateTemplateState = (state: ICreateTemplateState, action: IChangeValidateStatusAction | IHideCreateTemplateAction | IShowCreateTemplateAction | ISubmitTemplateAction) => {
    switch(action.type) {
        case CreateTemplateActionTypes.SHOW_CREATE_TEMPLATE:
            return { ...state, isShow: true, name: (action as IShowCreateTemplateAction).name, mode: (action as IShowCreateTemplateAction).mode, templateId: (action as IShowCreateTemplateAction).templateId, value: (action as IShowCreateTemplateAction).value };
        case CreateTemplateActionTypes.HIDE_CREATE_TEMPLATE:
            return { ...state, isShow: false };
        case CreateTemplateActionTypes.SUBMIT_TEMPLATE:
            return { ...state, isShow: false };
        case CreateTemplateActionTypes.CHANGE_VALIDATE_STATUS:
            return { ...state, status: (action as IChangeValidateStatusAction).status }
        case CreateTemplateActionTypes.UPDATE_TEMPLATE:
            return { ...state, isShow: false }
    }
    return { ...state };
}