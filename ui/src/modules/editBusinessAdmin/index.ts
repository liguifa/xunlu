import { EditBusinessAdminComponent } from "./view/EditBusinessAdminComponent";
export { IEditBusinessAdminState } from "./store/IState";
export { EditBusinessAdminReducer } from "./store/Reducer";
import { connect } from "react-redux";
import { IState } from "../../store";
import { IEditBusinessAdminDispatchProps, IEditBusinessAdminStateProps } from "./props/EditBusinessAdminProps";
import { GetBusinessAdminAction, SaveBusinessAdminAction, SearchUsersAction } from "./store/Actions";
import { IChangeSearchStatusAction, IGetBusinessAdminAction, ISaveBusinessAdminAction, ISearchUsersAction } from "./store/IActions";

const mapStateToProps: (state: IState) => IEditBusinessAdminStateProps = ({ EditBusinessAdmin }) => ({
    admins: EditBusinessAdmin && EditBusinessAdmin.admins,
    searching: EditBusinessAdmin && EditBusinessAdmin.searching,
    total: EditBusinessAdmin && EditBusinessAdmin.total,
    users: EditBusinessAdmin && EditBusinessAdmin.users,
});

type trunkSearchUsersDispatch = (dispatch: (action: ISearchUsersAction | IChangeSearchStatusAction) => void) => void;
type trunkSaveBusinessAdminDispatch = (dispatch: (action: ISaveBusinessAdminAction) => void) => void;
type trunkGetBusinessAdminDispoatch = (dispatch: (action: IGetBusinessAdminAction) => void) => void;

const mapDispatchToProps: (dispatch: (action: trunkSearchUsersDispatch | trunkSaveBusinessAdminDispatch | trunkGetBusinessAdminDispoatch) => void) => IEditBusinessAdminDispatchProps = (dispatch: (action: trunkSearchUsersDispatch | trunkSaveBusinessAdminDispatch | trunkGetBusinessAdminDispoatch) => void) => ({
    GetBusinessAdmin: (businessId: number) => dispatch(GetBusinessAdminAction(businessId)),
    SaveBusinessAdmin: (businessId: number, values: Array<{id: number, username: string}>) => dispatch(SaveBusinessAdminAction(businessId, values)),
    SearchUsers: (searchKey: string) => dispatch(SearchUsersAction(searchKey)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditBusinessAdminComponent);