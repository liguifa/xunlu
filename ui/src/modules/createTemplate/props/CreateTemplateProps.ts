import { EditMode } from "../common/EditMode";

export interface ICreateTemplateProps extends ICreateTemplateDispatchProps, ICreateTemplateStateProps {
    tableId: number,
    name: string,
    templateId: number,
    value: string,
    mode: EditMode,
    onOk: () => void
}

export interface ICreateTemplateStateProps {
    isShow: boolean,
    validateStatus: Array<{itemKey: string, status: "success" | "warning" | "error" | "validating" | ""}>
}

export interface ICreateTemplateDispatchProps {
    SubmitTemplate: (tableId: number, name: string, value: string) => void,
    UpdateTemplate: (templateId: number, name: string, value: string) => void,
    HideCreateTemplateWindow: () => void,
    ChangeValidateStatus: (status: Array<{itemKey: string, status: "success" | "warning" | "error" | "validating" | ""}>) => void
}