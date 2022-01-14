import { ViewTemplateTypes } from "./ActionTypes";
import { IChangeCurrentTabAction, IChangeViewTemplateAction, IGetTemplatesAction } from "./IActions";
import { IViewTemplateState } from "./IState";

export const ViewTemplateReducer: (state: IViewTemplateState, action: IGetTemplatesAction | IChangeCurrentTabAction | IChangeViewTemplateAction) => IViewTemplateState = (state: IViewTemplateState, action: IGetTemplatesAction | IChangeCurrentTabAction | IChangeViewTemplateAction) => {
    switch (action.type) {
        case ViewTemplateTypes.GET_TEMPLATES:
            return {
                ...state,
                currentTab: (action as IGetTemplatesAction).templates.length > 0 ? (action as IGetTemplatesAction).templates[0].id : 0,
                table: (action as IGetTemplatesAction).table,
                templates: (action as IGetTemplatesAction).templates,
            };
        case ViewTemplateTypes.CHANGE_CURRENT_TAB:
            return {
                ...state,
                currentTab: (action as IChangeCurrentTabAction ).currentTab
            }
        case ViewTemplateTypes.CHCNAGE_VIEW_TEMPLATE_VISIBLE:
            return {
                ...state,
                visible: (action as IChangeViewTemplateAction).visible
            }
    }
    return { ...state };
}