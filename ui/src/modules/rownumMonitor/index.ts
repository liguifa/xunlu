import { RownumMonitorComponent } from "./view/RownumMonitorComponent";
export { IRownumMonitorState } from "./store/IState";
export { RownumMonitorReducer } from "./store/Reducer";
import { connect } from "react-redux";
import { IState } from "../../store";
import { ViewModel } from "./common/ViewModel";
import { IRownumMonitorDispatchProps, IRownumMonitorStateProps } from "./props/RownumMonitorProps";
import { GetTableRownumsAction } from './store/Actions';
import { IGetTableRownumsAction } from './store/IActions';

const mapStateToProps: (state: IState) =>  IRownumMonitorStateProps = ({ RownumMonitor }) => ({
    end: RownumMonitor && RownumMonitor.end,
    model: RownumMonitor && RownumMonitor.model,
    rownums: RownumMonitor && RownumMonitor.rownums,
    start: RownumMonitor && RownumMonitor.start,
})

type trunkGetTableRownumsDsipatch = (dispatch: (acton: IGetTableRownumsAction) => void) => void;

const mapDispatchToProps: (dispatch: (action: trunkGetTableRownumsDsipatch) => void) => IRownumMonitorDispatchProps = (dispatch: (action: trunkGetTableRownumsDsipatch) => void) => ({
    GetTableRownums: (tableId: number, start: number, end: number, model: ViewModel) => dispatch(GetTableRownumsAction(tableId, start, end, model))
})

export default connect(mapStateToProps, mapDispatchToProps)(RownumMonitorComponent);