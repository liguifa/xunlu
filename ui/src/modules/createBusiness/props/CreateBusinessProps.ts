import * as React from "react";
import { ITableItem } from "../common/TableItem";

export interface ICreateBusinessProps extends ICreateBusinessStateProps, ICreateBusinessDispatchProps, React.Props<string> {
    onOk: () => void
}

export interface ICreateBusinessStateProps {
    actives: ITableItem[]
    isShow: boolean
}

export interface ICreateBusinessDispatchProps {
    ChangeActives: (actives: ITableItem[]) => void
    SaveBusiness: (bane: string, actives: ITableItem[]) => void
    ShowWindow: () => void
    HideWindow: () => void
}