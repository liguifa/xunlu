import { connect } from "react-redux";
import "./style/LoginComponent.css";
import { LoginComponent as Login } from "./view/LoginComponent";
export { LoginReducer } from "./store/Reducer";
import { ILoginProps } from "./props/ILoginProps";
import { LoginAction } from "./store/Actions";
export { ILoginState } from "./store/IState";
import { IState } from "../../store";

const mapStateToProps: (state: IState) => ILoginProps = ({ Login: ILoginState }) => {
    return {

    }
}

const mapDispatchToProps: (dispatch: any) => ILoginProps = (dispatch: any) => {
    return {
        Login: (username: string, password: string) =>  dispatch(LoginAction(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)