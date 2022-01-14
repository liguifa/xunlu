import { ITemplateDispatchProps, ITemplateStateProps } from "./props/TemplateProps";
import { TemplateComponent } from "./view/TemplateComponent";
export { ITemplateState } from "./store/IState";
import { IState } from "../../store";
import { WrapWithCrumbsConnect } from "../header";
export { TemplateReducer } from "./store/Reducer";
import { EditTemplateMode, IShowCreateTemplateAction, ShowCreateTemplateAction } from "../createTemplate";
import { GetTemplatesAction, RemoveTemplateAction } from "./store/Actions";
import { IGetTemplateAction, IRemoveTemplateAction } from "./store/IActions";

const mapStateToProps: (state: IState) => ITemplateStateProps = ({ Template }) => ({
    items: Template && Template.items,
    pageIndex: Template && Template.pageIndex,
    total: Template && Template.total,
})

type thunnkGetTemplatesDispatch =  (a: (action: IGetTemplateAction) => void) => void;
type thrunkRemoveTemplateDispatch = (a: (acti0on: IRemoveTemplateAction) => void) => void;

const mapDispatchToProps: (dispatch: (d: thrunkRemoveTemplateDispatch | thunnkGetTemplatesDispatch | IShowCreateTemplateAction) => void) => ITemplateDispatchProps = (dispatch: (d: thrunkRemoveTemplateDispatch | thunnkGetTemplatesDispatch | IShowCreateTemplateAction) => void) => ({
    GetTemplates: (pageIndex: number, searchKey: string) => dispatch(GetTemplatesAction(pageIndex, searchKey)),
    RemoveTemplate: (templateId: number) => dispatch(RemoveTemplateAction(templateId)),
    ShowCreateTemplate: () => dispatch(ShowCreateTemplateAction()),
    UpdateTemplate: (templateId: number, name: string, value: string) => dispatch(ShowCreateTemplateAction(EditTemplateMode.Update, templateId, name, value)),
})

export default WrapWithCrumbsConnect(mapStateToProps, mapDispatchToProps)(TemplateComponent)