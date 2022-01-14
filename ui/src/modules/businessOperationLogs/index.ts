import { connect } from "react-redux";
import { IState } from "../../store";
import { BusinessOperationLogsComponent } from "./view/BusinessOperationLogsComponent";
export { IBusinessOperationLogsState } from "./store/IState";
export { BusinessOperationLogsReducer } from "./store/Reducer";
import { IBusinessOperationLogsDispatchProps, IBusinessOperationLogsStateProps } from "./props/BusinessOperationLogsProps";
import { GetBusinessOperationLogsAction, HideBusinessOperationLogsWindowStatusAction, ShowBusinessOperationLogsWindowStatusAction } from "./store/Actions";
import { IChangeBusinessOperationLogsWindowStatusAction, IGetBusinessOperationLogsAction } from "./store/IActions";

const mapStateToProps: (state: IState) => IBusinessOperationLogsStateProps = ({ BusinessOperationLogs }) => ({
    end: BusinessOperationLogs && BusinessOperationLogs.end,
    isIncludeView: BusinessOperationLogs && BusinessOperationLogs.isIncludeView,
    isShow: BusinessOperationLogs && BusinessOperationLogs.isShow,
    logs: BusinessOperationLogs && BusinessOperationLogs.logs && BusinessOperationLogs.logs.map((log, index) => ({ ...log, index: index + 1 })),
    pageIndex: BusinessOperationLogs && BusinessOperationLogs.pageIndex,
    start: BusinessOperationLogs && BusinessOperationLogs.start,
    total: BusinessOperationLogs && BusinessOperationLogs.total,
})

type trunkGetOperationLogsDispatch = (action: (a: IGetBusinessOperationLogsAction) => void) => void;

const mapDispatchToProps: (dispatch: (d: trunkGetOperationLogsDispatch | IChangeBusinessOperationLogsWindowStatusAction) => void) => IBusinessOperationLogsDispatchProps = (dispatch: (d: trunkGetOperationLogsDispatch | IChangeBusinessOperationLogsWindowStatusAction) => void) => ({
    GetBusinessOperationLogs: (businessId: number, pageIndex: number, searchKey: string, isIncludeView: boolean, start: number, end: number) => dispatch(GetBusinessOperationLogsAction(businessId, pageIndex, searchKey, isIncludeView, start, end)),
    HideBusinessOperationLogsWindow: () => dispatch(HideBusinessOperationLogsWindowStatusAction()),
    ShowBusinessOperationLogsWindow: () => dispatch(ShowBusinessOperationLogsWindowStatusAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(BusinessOperationLogsComponent);