import { ChangeValidateStatusAction, HideCreateTemplateAction, ShowCreateTemplateAction, SubmitTemplateAction, UpdateTemplateAction } from "./store/Actions";
import { IChangeValidateStatusAction, IHideCreateTemplateAction, IShowCreateTemplateAction, ISubmitTemplateAction, IUpdateTemplateAction } from "./store/IActions";
import { CreateTemplateComponent } from "./view/CreateTemplateComponent";
export { ICreateTemplateState } from "./store/IState";
import { connect } from "react-redux";
export { CreateTemplateReducer } from "./store/Reducer";
import { IState } from "../../store";
import { EditMode as EditTemplateMode } from "./common/EditMode";
import { ICreateTemplateDispatchProps, ICreateTemplateStateProps } from "./props/CreateTemplateProps";

const mapStateToProps: (state: IState) => ICreateTemplateStateProps = ({ CreateTemplate }) => ({
    isShow: CreateTemplate && CreateTemplate.isShow,
    mode: CreateTemplate && CreateTemplate.mode,
    name: CreateTemplate && CreateTemplate.name,
    templateId: CreateTemplate && CreateTemplate.templateId,
    validateStatus: CreateTemplate && CreateTemplate.status,
    value: CreateTemplate && CreateTemplate.value
});

type trunkSubmitTemplateDispatch = (dispatch: (action: ISubmitTemplateAction) => void) => void;
type trunkUpdateTemplatedispatch = (dispatch: (action: IUpdateTemplateAction) => void) => void;

const mapDispatchToProps: (dispatch: (action: trunkUpdateTemplatedispatch | IChangeValidateStatusAction | trunkSubmitTemplateDispatch | IHideCreateTemplateAction) => void) => ICreateTemplateDispatchProps = (dispatch: (action: trunkUpdateTemplatedispatch | IChangeValidateStatusAction | trunkSubmitTemplateDispatch | IHideCreateTemplateAction) => void) => ({
    ChangeValidateStatus: (status: Array<{itemKey: string, status: "success" | "warning" | "error" | "validating" | ""}>) => dispatch(ChangeValidateStatusAction(status)),
    HideCreateTemplateWindow: () => dispatch(HideCreateTemplateAction()),
    SubmitTemplate: (tableId: number, name: string, value: string) => dispatch(SubmitTemplateAction(tableId, name, value)),
    UpdateTemplate: (templateId: number, name: string, value: string) => dispatch(UpdateTemplateAction(templateId, name, value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateTemplateComponent);
export { IShowCreateTemplateAction, ShowCreateTemplateAction, EditTemplateMode }