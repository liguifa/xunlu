import { HotMonitorComponent } from "./view/HotMonitorComponent";
export { IHotMonitorState } from "./store/IState";
export { HotMonitorReducer } from "./store/Reducer";
import { connect } from "react-redux";
import { IState } from "../../store";
import { ViewModel } from "./common/ViewModel";
import { IHotMonitorDispatchProps, IHotMonitorStateProps } from "./props/HotMonitorProps";
import { GetTableQuerytimesAction } from './store/Actions';
import { IGetTableQuerytimesAction } from './store/IActions';

const mapStateToProps: (state: IState) =>  IHotMonitorStateProps = ({ HotMonitor }) => ({
    end: HotMonitor && HotMonitor.end,
    hots: HotMonitor && HotMonitor.hots,
    model: HotMonitor && HotMonitor.model,
    start: HotMonitor && HotMonitor.start,
})

type trunkGetTableQuerytimesDsipatch = (dispatch: (acton: IGetTableQuerytimesAction) => void) => void;

const mapDispatchToProps: (dispatch: (action: trunkGetTableQuerytimesDsipatch) => void) => IHotMonitorDispatchProps = (dispatch: (action: trunkGetTableQuerytimesDsipatch) => void) => ({
    GetTableQuerytimes: (tableId: number, start: number, end: number, model: ViewModel) => dispatch(GetTableQuerytimesAction(tableId, start, end, model))
})

export default connect(mapStateToProps, mapDispatchToProps)(HotMonitorComponent);