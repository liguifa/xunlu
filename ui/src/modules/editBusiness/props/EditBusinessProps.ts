import * as React from "react";
import { ITableItem } from "../common/TableItem";

export interface IEditBusinessProps extends IEditBusinessStateProps, IEditBusinessDispatchProps, React.Props<any> {
    onOk: () => void
}

export interface IEditBusinessStateProps {
    actives: ITableItem[]
    isShow: boolean,
    businessId: number,
    businessName: string,
}

export interface IEditBusinessDispatchProps {
    ChangeActives: (actives: ITableItem[]) => void
    SaveBusiness: (businessId: number, businessName: string, actives: ITableItem[]) => void
    HideWindow: () => void
    ShowWindow: (businessId: number) => void
}