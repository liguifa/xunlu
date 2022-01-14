import { ITemplateItem } from "./TemplateItem";

export interface IViewTemplateResult {
    templates: ITemplateItem[],
    table: {name: string, fields: string[]}
}