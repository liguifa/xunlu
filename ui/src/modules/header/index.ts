import { HeaderComponent } from "./view/HeaderComponent";
export { Crumbs } from "./store/Crumbs";
export { HeaderReducer } from "./store/Reducer";
import { connect } from "react-redux";
import { IState } from "../../store";
import { IHeaderDispatchProps, IHeaderStateProps } from "./props/HeaderProps";
export { IHeaderState } from "./store/IState";
export { WrapWithCrumbsConnect } from "./store/Crumbs";
import { ChangeNavStatusAction } from "./store/Actions";
import { IChangeNavStatusAction } from "./store/IActions";

const mapStateToProps: (state: IState) => IHeaderStateProps = ({ Header, Main }) => {
    return {
        Crumbs: Header && Header.Crumbs,
        UserInfo: Main && { ...Main.userInfo },
        isShrink: Header && Header.isShrink
    }
}

const mapDispatchToProps: (dispatch: (action: IChangeNavStatusAction) => void) => IHeaderDispatchProps = (dispatch: (action: IChangeNavStatusAction) => void) => ({
    ChangeNavShrinkStatus: (isShrink: boolean) => dispatch(ChangeNavStatusAction(isShrink))
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent)