import { ReactNode } from "react";

export interface IFieldProp {
    id?: string,
    name: string | ReactNode,
    type: string | ReactNode,
    description: string | ReactNode,
    dict: string | ReactNode,
    nullValueRatio: string | number | ReactNode,
}