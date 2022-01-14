import { IBusinessItem } from "../common/BusinessItem";

export interface INavState {
    Businesses: IBusinessItem[],
    activeId: string,
    selectKey: string
}