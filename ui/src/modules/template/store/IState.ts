import { ITemplate } from "../common/TemplateItem";

export interface ITemplateState {
    items: ITemplate[],
    total: number,
    pageIndex: number
}