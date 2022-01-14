import { connect } from "react-redux";
import { ShrinkableComponent } from "./view/ShrinkableComponent";
export { INavState } from "./store/IState";
export { NavReducer } from "./store/Reducer";
import { IState } from "../../store";
import { INavDispatchProps, INavStateProps } from "./props/NavProps";
import { ChangeMenuAction, ChangeSelectKeyAction, GetBusinessesAction } from "./store/Actions";
import { IChangeMenuAction, IChangeSelectKeyAction, IGetBusinessesAction } from "./store/IActions";

const mapStateToProps: (state: IState) => INavStateProps = ({ Main, Nav, Header }) => ({
    activeId: Nav && Nav.activeId,
    businesses: Nav && Nav.Businesses && Nav.Businesses.map(item => ({ ...item })),
    inlineCollapsed: Header && Header.isShrink,
    role: Main && Main.userInfo && Main.userInfo.role,
    selectedKey: Nav && Nav.selectKey,
})

type trunkGetBusinessDispatch = (a: (action: IGetBusinessesAction) => void) => void;

const mapDispatchToProps: (dispatch: (action: IChangeSelectKeyAction | IChangeMenuAction | trunkGetBusinessDispatch) => void) => INavDispatchProps = (dispatch: (action: IChangeSelectKeyAction | IChangeMenuAction | trunkGetBusinessDispatch) => void) => ({
    ChangeMenu: (activeId: string) => dispatch(ChangeMenuAction(activeId)),
    ChangeSelectedKey: (selectKey: string) => dispatch(ChangeSelectKeyAction(selectKey)),
    GetBusinesses: () => dispatch(GetBusinessesAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(ShrinkableComponent);