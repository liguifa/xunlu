import { ICrumb } from "./Crumbs";

export interface IHeaderState {
    Crumbs: ICrumb[],
    isShrink: boolean
}