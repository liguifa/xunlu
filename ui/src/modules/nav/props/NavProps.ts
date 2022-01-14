import { match } from "react-router-dom";
import { IBusinessItem } from "../common/BusinessItem";

export interface INavProps extends INavStateProps, INavDispatchProps {
    mode: 'inline' | 'horizontal',
    showLogo: boolean,
    match?: match<{key: string}>
}

export interface INavStateProps {
    role: number,
    businesses: IBusinessItem[],
    activeId: string,
    selectedKey: string,
    inlineCollapsed: boolean
}

export interface INavDispatchProps {
    GetBusinesses: () => void,
    ChangeMenu: (activeId: string) => void,
    ChangeSelectedKey: (selectKey: string) => void,
}