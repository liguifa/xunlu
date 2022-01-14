import { IAction } from "../../../store";
import { ITemplate } from "../common/TemplateItem";

export interface IGetTemplateAction extends IAction {
    items: ITemplate[],
    total: number,
    pageIndex: number
}

export interface IRemoveTemplateAction extends IAction {
    templateId: number
}