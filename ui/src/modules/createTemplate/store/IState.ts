import { EditMode } from "../common/EditMode";

export interface ICreateTemplateState {
    isShow: boolean,
    status: Array<{itemKey: string, status: "success" | "warning" | "error" | "validating" | ""}>,
    mode: EditMode,
    templateId: number,
    value: string,
    name: string,
}