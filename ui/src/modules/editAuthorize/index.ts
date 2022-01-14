import { connect } from "react-redux";
import { IState } from "../../store";
import { IEditAuthorizeDispatchProps, IEditAuthorizeStateProps } from "./props/EditAuthorizeProps";
import { EditAuthorizeComponent } from "./view/EditAuthorizeComponent";
export { IEditAuthorizeState } from "./store/IState";
export { EditAuthorizeReducer } from "./store/Reducer";
import { ChangeActivesAction, EditAuthorizeAction, GetAllSecretTablesAction, GetUserAuthorizeAction, HideEditAuthorizeAction, ShowEditAuthorizeAction } from "./store/Actions";
import { IChangeActivesAction, IEditAuthorizeAction, IGetAllSecretTablesAction, IGetUserAuthorizeAction, IHideEditAuthorizeAction, IShowEditAuthorizeAction } from "./store/IActions";

const mapStateToProps: (state: IState) => IEditAuthorizeStateProps = ({ EditAuthorize }) => ({
    actives: EditAuthorize && EditAuthorize.actives,
    isShow: EditAuthorize && EditAuthorize.isShow,
    roleId: EditAuthorize && EditAuthorize.roleId,
    tables: EditAuthorize && EditAuthorize.tables,
    total: EditAuthorize && EditAuthorize.total,
    userId: EditAuthorize && EditAuthorize.id,
    username: EditAuthorize && EditAuthorize.username,
})

type trunkGetUserAuthorizeDispatch = (dispatch: (action: IGetUserAuthorizeAction) => void) => void;
type trunkGetAllSetretTablesDispatch = (dispatch: (action: IGetAllSecretTablesAction) => void) => void;
type trunkEditAuthorizeDispatch = (dispatch: (action: IEditAuthorizeAction) => void) => void;

const mapDispatchToProps: (dispatch: (action: trunkEditAuthorizeDispatch | IChangeActivesAction | trunkGetAllSetretTablesDispatch | IHideEditAuthorizeAction | trunkGetUserAuthorizeDispatch) => void) => IEditAuthorizeDispatchProps = (dispatch: (action: trunkEditAuthorizeDispatch | IChangeActivesAction | trunkGetAllSetretTablesDispatch | IHideEditAuthorizeAction | trunkGetUserAuthorizeDispatch) => void) => ({
    ChangeActives: (actives: number[]) => dispatch(ChangeActivesAction(actives)),
    EditAuthorize: (userId: number, roleId: number, actives: number[]) => dispatch(EditAuthorizeAction(userId, roleId, actives)),
    GetAllSecretTables: () => dispatch(GetAllSecretTablesAction()),
    GetUserAuthorize: (userId: number) => dispatch(GetUserAuthorizeAction(userId)),
    HideWindow: () => dispatch(HideEditAuthorizeAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditAuthorizeComponent);
export { IShowEditAuthorizeAction, ShowEditAuthorizeAction }