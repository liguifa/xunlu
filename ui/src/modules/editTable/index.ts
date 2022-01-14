import { connect } from "react-redux";
import { IState } from "../../store";
import { IEditTableDispatchProps, IEditTableStateProps } from "./props/EditTableProps";
import { EditTableComponent } from "./view/EditTableComponent";
export { IEditTableState } from "./store/IState";
export { EditTableReducer } from "./store/Reducer";
import { IShowCreateTemplateAction, ShowCreateTemplateAction } from "../createTemplate"; 
import { EditTableAction, GetAllTemplatesAction, GetBusinessForAdminAction, HideEditTableWindowAction, ShowEditTableWindowAction } from "./store/Actions";
import { IEditTableAction, IGetAllTemplatesAction, IGetBusinessForAdminAction, IHideEditTableWindowAction, IShowEditTableWindowAction } from "./store/IActions";

const mapStateToProps: (state: IState) =>  IEditTableStateProps = ({ EditTable, ViewTemplate }) => ({
    allBusinesses: EditTable && EditTable.businesses,
    templateIds: ViewTemplate && ViewTemplate.templates && ViewTemplate.templates.map(t => t.id),
    templates: EditTable && EditTable.templates,
    visible: EditTable && EditTable.visible,
})

type thunnkEditTableDispatch =  (a: (action: IEditTableAction) => void) => void;
type thunnkGetAllTemplateDispatch =  (a: (action: IGetAllTemplatesAction) => void) => void;
type thrunkGetBusinessForAdminDispatch = (a: (action: IGetBusinessForAdminAction) => void) => void;

const mapDispatchToProps: (dispatch: (action: thrunkGetBusinessForAdminDispatch | thunnkGetAllTemplateDispatch | IShowCreateTemplateAction | thunnkEditTableDispatch | IHideEditTableWindowAction | IShowEditTableWindowAction) => void) => IEditTableDispatchProps = (dispatch: (action: thrunkGetBusinessForAdminDispatch | thunnkGetAllTemplateDispatch | IShowCreateTemplateAction | thunnkEditTableDispatch | IHideEditTableWindowAction | IShowEditTableWindowAction) => void) => ({
    EditTable: (id: number, isSecret: boolean, businessName: string, templateIds: number[], description: string) => dispatch(EditTableAction(id, isSecret, businessName, templateIds, description)),
    GetAllTemplates: () => dispatch(GetAllTemplatesAction()),
    GetBusinessForAdmin: () => dispatch(GetBusinessForAdminAction()),
    HideEditTableWindow: () => dispatch(HideEditTableWindowAction()),
    ShowCreateTemplate: () => dispatch(ShowCreateTemplateAction()),
    ShowEditTableWindow: () => dispatch(ShowEditTableWindowAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditTableComponent);
export { IShowEditTableWindowAction, ShowEditTableWindowAction }