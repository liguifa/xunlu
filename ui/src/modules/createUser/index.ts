import { CreateUserComponent } from "./view/CreateUserComponent";
export { CreateUserReducer } from "./store/Reducer";
export { ICreateUserState } from "./store/IState";
import { connect } from "react-redux";
import { IState } from "../../store";
import { ICreateUserDispatchProps, ICreateUserStateProps } from "./props/CreateUserProps";
import { ChangeUserAction, ChangeUsernameAction, CreateUserAction, HideCreateUserWindowAction, ShowCreateUserWindowAction } from "./store/Actions";
import { IChangeUserAction, IChangeUsernameAction, ICreateUserAction, IHideCreateUserWindowAction, IShowCreateUserWindowAction } from "./store/IActions";

const mapStateToProps: (state: IState) => ICreateUserStateProps = ({ CreateUser }) => ({
    isShow: CreateUser && CreateUser.isShow,
    user: CreateUser && CreateUser.user,
    username: CreateUser && CreateUser.username
});

type thunnkSaveUserDispatch =  (a: (action: ICreateUserAction) => void) => void;
type thunnkChangUserDispatch =  (a: (action: IChangeUserAction) => void) => void;

const mapDispatchToProps: (dispatch: (action: IChangeUsernameAction| thunnkChangUserDispatch | IHideCreateUserWindowAction | IShowCreateUserWindowAction | thunnkSaveUserDispatch) => void) => ICreateUserDispatchProps = (dispatch: (action: IChangeUsernameAction| thunnkChangUserDispatch | IHideCreateUserWindowAction | IShowCreateUserWindowAction | thunnkSaveUserDispatch) => void) => ({
    ChangeUser: (username: string) => dispatch(ChangeUserAction(username)),
    ChangeUsername: (username: string) => dispatch(ChangeUsernameAction(username)),
    HideWindow: () => dispatch(HideCreateUserWindowAction()),
    SaveUser: (username: string, roleId: number) => dispatch(CreateUserAction(username, roleId)),
    ShowWindow: () => dispatch(ShowCreateUserWindowAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateUserComponent);