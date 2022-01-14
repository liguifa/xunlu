import { ITableItem } from "../common/TableItem";

export interface IChooseTablesProps extends IChooseTablesStateProps, IChooseTablesDispatchProps {
    onOk: (actvies: ITableItem[]) => void
    className: string
    defaultActives: ITableItem[],
    buttonSize: "large" | "default" | "small",
    buttonTitle: string,
    isIncludeSceret: boolean,
}

export interface IChooseTablesStateProps {
    items: ITableItem[]
    actives: ITableItem[]
    isShow: boolean,
    pageIndex: number,
    total: number,
}

export interface IChooseTablesDispatchProps {
    ShowChooseWindow: () => void
    HideChooseWindow: () => void
    GetTables: (pageIndex: number, isIncludeSceret: boolean) => void 
    ChangeActives: (actvies: ITableItem[]) => void
}