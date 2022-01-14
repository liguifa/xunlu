import { OperationLogsComponent } from "./view/OperationLogsComponent";
export { IOperationLogsState } from "./store/IState";
export { OperationLogsReducer } from "./store/Reducer";
import { IState } from "../../store";
import { WrapWithCrumbsConnect } from "../header";
import { OperationType } from "./common/OperationItem";
import { IOperationLogsDispatchProps, IOperationLogsStateProps } from "./props/OperationLogsProps";
import { GetOperationLogsAction } from "./store/Actions";
import { IGetOperationLogsAction } from "./store/IActions";

const mapStateToProps: (state: IState) => IOperationLogsStateProps = ({ OperationLogs }) => ({
    end: OperationLogs && OperationLogs.end,
    logs: OperationLogs && OperationLogs.logs,
    pageIndex: OperationLogs && OperationLogs.pageIndex,
    start: OperationLogs && OperationLogs.start,
    total: OperationLogs && OperationLogs.total,
    type: OperationLogs && OperationLogs.type
})

const mapDispatchToProps: (dispatch: (d: (action: (a: IGetOperationLogsAction) => void) => void) => void) => IOperationLogsDispatchProps = (dispatch: (d: (action: (a: IGetOperationLogsAction) => void) => void) => void) => ({
    GetOperationLogs: (pageIndex: number, searchKey: string, filterType: 0 | OperationType, start: number, end: number) => dispatch(GetOperationLogsAction(pageIndex, searchKey, filterType, start, end))
})

export default WrapWithCrumbsConnect(mapStateToProps, mapDispatchToProps)(OperationLogsComponent);