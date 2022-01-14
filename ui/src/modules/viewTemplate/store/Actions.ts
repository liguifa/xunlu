import { ViewTemplateService } from "../service/ViewTemplateService";
import { ViewTemplateTypes } from "./ActionTypes";
import { IChangeCurrentTabAction, IChangeViewTemplateAction, IGetTemplatesAction } from "./IActions";

export const GetTemplatesAction: (tableId: number) => (dispatch: (action: IGetTemplatesAction) => void) => void = (tableId: number) => (
    async (dispatch: (action: IGetTemplatesAction) => void) => {
        const result = await new ViewTemplateService().GetTemplates(tableId);
        dispatch({
            table: result.table,
            templates: result.templates,
            type: ViewTemplateTypes.GET_TEMPLATES
        });
    }
)

export const ChangeCurrentTabAction: (currentTab: number) => IChangeCurrentTabAction  = (currentTab: number) => ({
    currentTab,
    type: ViewTemplateTypes.CHANGE_CURRENT_TAB
})

export const OpenViewTemplateAction: () => IChangeViewTemplateAction = () => ({
    type: ViewTemplateTypes.CHCNAGE_VIEW_TEMPLATE_VISIBLE,
    visible: true
})

export const CloseViewTemplateAction: () => IChangeViewTemplateAction = () => ({
    type: ViewTemplateTypes.CHCNAGE_VIEW_TEMPLATE_VISIBLE,
    visible: false
})