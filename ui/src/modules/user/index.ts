import { WrapWithCrumbsConnect } from "../header";
import { UserComponent } from "./view/UserComponent";
export { IUserState } from "./store/IState";
export { UserReducer } from "./store/Reducer";
import { IState } from "../../store";
import { IShowEditAuthorizeAction, ShowEditAuthorizeAction } from "../editAuthorize";
import { IUserDispatchProps, IUserStateProps } from "./props/UserProps";
import { ActiveUserAction, DisableUserAction, GetUsersAction } from "./store/Actions";
import { IChangeUserStatusAction, IGetUsersAction } from "./store/IActions";

const mapStateToProps: (state: IState) => IUserStateProps = ({ User, Main }) => ({
    pageIndex: User && User.pageIndex,
    role: Main && Main.userInfo && Main.userInfo.role,
    total: User && User.total,
    users: User && User.users,
});

type trunkGetUsersDispatch = (a: (action: IGetUsersAction) => void) => void;
type trunkShowEditAuthorizeDispatch = (a: (action: IShowEditAuthorizeAction) => void) => void;
type trunkChangeStatusDispatch = (a: (action: IChangeUserStatusAction) => void) => void;

const mapDispatchToProps: (dispatch: (action: trunkChangeStatusDispatch | trunkGetUsersDispatch | trunkShowEditAuthorizeDispatch) => void) => IUserDispatchProps = (dispatch: (action: trunkChangeStatusDispatch | trunkGetUsersDispatch | trunkShowEditAuthorizeDispatch) => void) => ({
    ActiveUser: (userId: number) => dispatch(ActiveUserAction(userId)),
    DisableUser: (userId: number) => dispatch(DisableUserAction(userId)),
    GetUsers: (pageIndex: number, searchKey: string) => dispatch(GetUsersAction(pageIndex, searchKey)),
    ShowEditAuthorize: (userId: number) => dispatch(ShowEditAuthorizeAction(userId))
});

export default WrapWithCrumbsConnect(mapStateToProps, mapDispatchToProps)(UserComponent);