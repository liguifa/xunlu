import { TemplateService } from "../service/TemplateService";
import { TemplateActionTypes } from "./ActionTypes";
import { IGetTemplateAction, IRemoveTemplateAction } from "./IActions";

export const GetTemplatesAction: (pageIndex: number, searchKey: string) => (dispatch: (action: IGetTemplateAction) => void) => void = (pageIndex: number, searchKey: string) => (
    async (dispatch: (action: IGetTemplateAction) => void) => {
        const result = await new TemplateService().GetTemplates(pageIndex, searchKey);
        dispatch({
            items: result.templates,
            pageIndex,
            total: result.total,
            type: TemplateActionTypes.GET_TEMPLATES
        })
    }
)

export const RemoveTemplateAction: (templateId: number) => (dispatch: (action: IRemoveTemplateAction) => void) => void = (templateId: number) => (
    async (dispatch: (action: IRemoveTemplateAction) => void) => {
        new TemplateService().RemoveTemplate(templateId);
        dispatch({
            templateId,
            type: TemplateActionTypes.REMOVE_TEMPLATE
        })
    }
)