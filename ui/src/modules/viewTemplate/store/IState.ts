import { ITemplateItem } from "../common/TemplateItem";

export interface IViewTemplateState {
    templates: ITemplateItem[],
    currentTab: number,
    visible: boolean,
    table: {name: string, fields: string[]}
}