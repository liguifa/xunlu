import { connect } from "react-redux";
import { IState } from "../../store";
import { BusinessAuthorizeComponent } from "./view/BusinessAuthorizeComponent";
export { IBusinessAuthorizeState } from "./store/IState";
export { BusinessAuthorizeReducer } from "./store/Reducer";
import { IBusinessAuthorizeDispatchProps, IBusinessAuthorizeStateProps } from "./props/BusinessAuthorizeProps";
import { HideBusinessAuthorizeWindowStatusAction, ShowBusinessAuthorizeWindowStatusAction } from "./store/Actions";
import { IChangeBusinessAuthorizeWindowStatusAction } from "./store/IActions";

const mapStateToProps: (state: IState) => IBusinessAuthorizeStateProps = ({ BusinessAuthorize }) => ({
    isShow: BusinessAuthorize && BusinessAuthorize.isShow
});

const mapDispatchToProops: (dispatch: (action: IChangeBusinessAuthorizeWindowStatusAction) => void) => IBusinessAuthorizeDispatchProps = (dispatch: (action: IChangeBusinessAuthorizeWindowStatusAction) => void) => ({
    HideAuthorizeWindow: () => dispatch(HideBusinessAuthorizeWindowStatusAction()),
    ShowAuthorizeWindow: () => dispatch(ShowBusinessAuthorizeWindowStatusAction()),
})

export default connect(mapStateToProps, mapDispatchToProops)(BusinessAuthorizeComponent);