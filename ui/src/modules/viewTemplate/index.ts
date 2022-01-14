import { connect } from "react-redux";
import { IState } from "../../store";
import { IViewTemplateDispatchProps, IViewTemplateStateProps } from "./props/ViewTemplateProps";
import { ViewTemplateComponent } from "./view/ViewTemplateComponent";
export { IViewTemplateState } from "./store/IState"; 
import { ChangeCurrentTabAction, CloseViewTemplateAction, GetTemplatesAction, OpenViewTemplateAction } from "./store/Actions";
import { IChangeCurrentTabAction, IChangeViewTemplateAction, IGetTemplatesAction } from "./store/IActions";
export { ViewTemplateReducer } from "./store/Reducer";
import { IShowCreateTemplateAction, ShowCreateTemplateAction } from "../createTemplate";
import { IShowEditTableWindowAction, ShowEditTableWindowAction } from "../editTable";

const mapStateToProps: (state: IState) => IViewTemplateStateProps = ({ ViewTemplate, Main }) => ({
    currentTab: ViewTemplate && ViewTemplate.currentTab,
    isAdmin: Main && Main.userInfo && Main.userInfo.role <= 10,
    table: ViewTemplate && ViewTemplate.table,
    templates: ViewTemplate && ViewTemplate.templates,
    visible: ViewTemplate && ViewTemplate.visible,
});

type thunnkDispatch =  (a: (action: IGetTemplatesAction) => void) => void;

const mapDispatchToProps: (dispatch: (d: IShowEditTableWindowAction | IShowCreateTemplateAction| IChangeCurrentTabAction | IChangeViewTemplateAction | thunnkDispatch) => void) => IViewTemplateDispatchProps = (dispatch: (d: IShowEditTableWindowAction| IShowCreateTemplateAction | IChangeCurrentTabAction | IChangeViewTemplateAction | thunnkDispatch) => void) => ({
    ChangeCurrentTab: (currentTab: number) => dispatch(ChangeCurrentTabAction(currentTab)),
    CloseViewTemplate: () => dispatch(CloseViewTemplateAction()),
    GetTemplates: (tableId: number) => dispatch(GetTemplatesAction(tableId)),
    OpenViewTemplate: () => dispatch(OpenViewTemplateAction()),
    ShowCreateTemplate: () => dispatch(ShowCreateTemplateAction()),
    ShowEditTemplate: () => dispatch(ShowEditTableWindowAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewTemplateComponent);