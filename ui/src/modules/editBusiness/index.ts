import { EditBusinessComponent } from "./view/EditBusinessComponent";
export { EditBusinessReducer } from "./store/Reducer";
export { IEditBusinessState } from "./store/IState";
import { connect } from "react-redux";
import { IState } from "../../store";
import { ITableItem } from "./common/TableItem";
import { IEditBusinessDispatchProps, IEditBusinessStateProps } from "./props/EditBusinessProps";
import { ChangeActviesAction, EditBusinessAction, HideEditBusinessWindowAction, ShowEditBusinessWindowAction } from "./store/Actions";
import { IChangeActviesAction, IEditBusinessAction, IHideEditBusinessWindowAction, IShowEditBusinessWindowAction } from "./store/IActions";

const mapStateToProps: (state: IState) => IEditBusinessStateProps = ({ EditBusiness }) => ({
    actives: EditBusiness && EditBusiness.actives,
    businessId: EditBusiness && EditBusiness.businessId,
    businessName: EditBusiness && EditBusiness.businessName,
    isShow: EditBusiness && EditBusiness.isShow,
});

type thunnkSaveBusinessDispatch =  (a: (action: IEditBusinessAction) => void) => void;
type thunnkShowEditBusinessDispatch =  (a: (action: IShowEditBusinessWindowAction) => void) => void;

const mapDispatchToProps: (dispatch: (action: thunnkShowEditBusinessDispatch | IChangeActviesAction | IHideEditBusinessWindowAction | IShowEditBusinessWindowAction | thunnkSaveBusinessDispatch) => void) => IEditBusinessDispatchProps = (dispatch: (action: thunnkShowEditBusinessDispatch | IChangeActviesAction | IHideEditBusinessWindowAction | IShowEditBusinessWindowAction | thunnkSaveBusinessDispatch) => void) => ({
    ChangeActives: (actives: ITableItem[]) => dispatch(ChangeActviesAction(actives)),
    HideWindow: () => dispatch(HideEditBusinessWindowAction()),
    SaveBusiness: (businessId: number, name: string, actives: ITableItem[]) => dispatch(EditBusinessAction( businessId, name, actives)),
    ShowWindow: (businessId: number) => dispatch(ShowEditBusinessWindowAction(businessId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditBusinessComponent);
export { IShowEditBusinessWindowAction, ShowEditBusinessWindowAction }