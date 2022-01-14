import { EditMode } from "../common/EditMode";
import { CreateTemplateService } from "../service/CreateTemplateService";
import { CreateTemplateActionTypes } from "./ActionTypes";
import { IChangeValidateStatusAction, IHideCreateTemplateAction, IShowCreateTemplateAction, ISubmitTemplateAction } from "./IActions";

export const ShowCreateTemplateAction: (mode?: EditMode, templateId?: number, name?: string, value?: string) => IShowCreateTemplateAction = (mode?: EditMode, templateId?: number, name?: string, value?: string) => ({
    isShow: true,
    mode: mode ? mode : EditMode.Create,
    name: name ? name : "",
    templateId: templateId ? templateId : 0,
    type: CreateTemplateActionTypes.SHOW_CREATE_TEMPLATE,
    value: value ? value : "",
})

export const HideCreateTemplateAction: () => IHideCreateTemplateAction = () => ({
    isShow: false,
    type: CreateTemplateActionTypes.HIDE_CREATE_TEMPLATE
})

export const SubmitTemplateAction: (tableId: number, name: string, value: string) => (dispatch: (action: ISubmitTemplateAction) => void) => void = (tableId: number, name: string, value: string) => (
    async (dispatch: (action: ISubmitTemplateAction) => void) => {
        await new CreateTemplateService().CreateTemplate(tableId, name, value);
        dispatch({
            isShow: false,
            type: CreateTemplateActionTypes.SUBMIT_TEMPLATE,
        })
    }
)

export const UpdateTemplateAction: (template: number, name: string, value: string) => (dispatch: (action: ISubmitTemplateAction) => void) => void = (templateId: number, name: string, value: string) => (
    async (dispatch: (action: ISubmitTemplateAction) => void) => {
        await new CreateTemplateService().UpdateTemplate(templateId, name, value);
        dispatch({
            isShow: false,
            type: CreateTemplateActionTypes.UPDATE_TEMPLATE,
        })
    }
)

export const ChangeValidateStatusAction: (status: Array<{itemKey: string, status: "success" | "warning" | "error" | "validating" | ""}>) => IChangeValidateStatusAction = (status: Array<{itemKey: string, status: "success" | "warning" | "error" | "validating" | ""}>) => ({
    status,
    type: CreateTemplateActionTypes.CHANGE_VALIDATE_STATUS
})