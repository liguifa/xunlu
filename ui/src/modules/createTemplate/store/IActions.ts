import { IAction } from "../../../store";
import { EditMode } from "../common/EditMode";

export interface IShowCreateTemplateAction extends IAction {
    isShow: true,
    mode: EditMode
    templateId: number,
    name: string,
    value: string
}

export interface IHideCreateTemplateAction extends IAction {
    isShow: false
}

export interface ISubmitTemplateAction extends IAction {
    isShow: false
}

export interface IUpdateTemplateAction extends IAction {
    isShow: false
}

export interface IChangeValidateStatusAction extends IAction {
    status: Array<{itemKey: string, status: "success" | "warning" | "error" | "validating" | ""}>
}