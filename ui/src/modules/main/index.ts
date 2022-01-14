import { connect } from "react-redux"; 
import { IState } from "../../store";
import { IMainDispatchProps, IMainStateProps } from "./props/IMainProps";
import { MainComponent } from "./view/MainComponent";
export { MainReducer } from "./store/Reducer";
export { IMainState } from "./store/IState";
import { GetUserInfoAction, LoadingAction } from "./store/Actions";
import { IGetUserInfoAction, ILoadingAction } from "./store/IActions";
import { LoadingStatus } from "./store/LoadingStatus";

const mapStateToProps: (state: IState) => IMainStateProps = ({ Main }) => {
    return {
        status: Main && Main.status
    }
}

type thunnkDispatch = (a: (action: IGetUserInfoAction) => void) => void;

const mapDispatchToProps: (dispatch: (action: ILoadingAction | thunnkDispatch) => void) => IMainDispatchProps = (dispatch: (action: ILoadingAction | thunnkDispatch) => void) => {
    return {
        ChangeLoadingStatus: (status: LoadingStatus) => dispatch(LoadingAction(status)),
        GetUserInfo: () => dispatch(GetUserInfoAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);

export { LoadingStatus }