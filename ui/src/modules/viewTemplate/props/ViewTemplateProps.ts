import { ITemplateItem } from "../common/TemplateItem";

export interface IViewTemplateProps extends IViewTemplateStateProps, IViewTemplateDispatchProps {
    tableId: number
}

export interface IViewTemplateStateProps {
    templates: ITemplateItem[],
    currentTab: number,
    visible: boolean,
    table: {name: string, fields: string[]},
    isAdmin: boolean
}

export interface IViewTemplateDispatchProps {
    GetTemplates: (tableId: number) => void;
    ChangeCurrentTab: (activeKey: number) => void;
    OpenViewTemplate: () => void;
    CloseViewTemplate: () => void;
    ShowCreateTemplate: () => void;
    ShowEditTemplate: () => void;
}