import { connect }  from  "react-redux";
import { OperationLogsAuthorizeComponent } from "./view/OperationLogsAuthorizeComponent";
export { IOperationLogsAuthorizeState } from "./store/IState";
export { OperationLogsAuthorizeReducer } from "./store/Reducer";
import { IState } from "../../store";
import { IOperationLogsAuthorizeDispatchProps, IOperationLogsAuthorizeStateProps } from "./props/OperationLogsAuthorizeProps";
import { ChangeActivesAction, GetOperationLogsAuthorize, GetUsersAction, SubmitAuthorizeAction } from "./store/Actions";
import { IChangeActivesAction, IGetOperationLogsAuthorize, IGetUsersAction, ISubmitAuthorizeAction } from "./store/IActions";

const mapStateToProps: (state: IState) => IOperationLogsAuthorizeStateProps = ({ OperationLogsAuthorize }) => ({
    activeIds: OperationLogsAuthorize && OperationLogsAuthorize.activeIds,
    authorizeUserIds: OperationLogsAuthorize && OperationLogsAuthorize.authorizeUserIds,
    pageIndex: OperationLogsAuthorize && OperationLogsAuthorize.pageIndex,
    total: OperationLogsAuthorize && OperationLogsAuthorize.total,
    users: OperationLogsAuthorize && OperationLogsAuthorize.users
})

type trunkGetUsersDispatch = (a: (action: IGetUsersAction) => void) => void;
type trunkSubmitAuthorizeDispatch = (a: (action: ISubmitAuthorizeAction) => void) => void;
type trunkGetOperationLogsAuthorizeDispatch = (a: (action: IGetOperationLogsAuthorize) => void) => void;

const mapDispatchToProps: (dispatch: (d: trunkGetUsersDispatch | IChangeActivesAction | trunkSubmitAuthorizeDispatch | trunkGetOperationLogsAuthorizeDispatch) => void) => IOperationLogsAuthorizeDispatchProps = (dispatch: (d: trunkGetUsersDispatch | IChangeActivesAction | trunkSubmitAuthorizeDispatch | trunkGetOperationLogsAuthorizeDispatch) => void) => ({
    ChangeActives: (activeIds: number[]) => dispatch(ChangeActivesAction(activeIds)),
    GetOperationLogsAuthorize: (businessId: number) => dispatch(GetOperationLogsAuthorize(businessId)),
    GetUsers: (pageIndex: number, searchKey: string) => dispatch(GetUsersAction(pageIndex, searchKey)),
    SumitAuthorize: (businessId: number, userIds: number[]) => dispatch(SubmitAuthorizeAction(businessId, userIds)) 
})

export default connect(mapStateToProps, mapDispatchToProps)(OperationLogsAuthorizeComponent);