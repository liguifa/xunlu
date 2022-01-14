import { IAction } from "../../../store";
import { ITemplateItem } from "../common/TemplateItem";

export interface IGetTemplatesAction extends IAction {
    templates: ITemplateItem[]
    table: {name: string, fields: string[]}
}

export interface IChangeCurrentTabAction extends IAction {
    currentTab: number
}

export interface IChangeViewTemplateAction extends IAction {
    visible: boolean
}