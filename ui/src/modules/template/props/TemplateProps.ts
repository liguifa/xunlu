import { ITemplate } from "../common/TemplateItem"; 

export interface ITemplateProps extends ITemplateStateProps, ITemplateDispatchProps {

}

export interface ITemplateStateProps {
    items: ITemplate[]
    total: number
    pageIndex: number
}

export interface ITemplateDispatchProps {
    GetTemplates: (pageIndex: number, searchKey: string) => void
    ShowCreateTemplate: () => void
    UpdateTemplate: (templateId: number, name: string, value: string) => void,
    RemoveTemplate: (templateId: number) => void
}