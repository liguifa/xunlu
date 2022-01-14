import { TableNullvalueMonitorComponent } from "./view/TableNullvalueMonitorComponent";
export { ITableNullvalueMonitorState } from "./store/IState";
export { TableNullvalueMonitorReducer } from "./store/Reducer";
import { connect } from "react-redux";
import { IState } from "../../store";
import { ViewModel } from "./common/ViewModel";
import { ITableNullvalueMonitorDispatchProps, ITableNullvalueMonitorStateProps } from "./props/TableNullvalueMonitorProps";
import { GetTableNullvaluesAction } from './store/Actions';
import { IGetTableNullvaluesAction } from './store/IActions';

const mapStateToProps: (state: IState) =>  ITableNullvalueMonitorStateProps = ({ TableNullvalueMonitor }) => ({
    end: TableNullvalueMonitor && TableNullvalueMonitor.end,
    model: TableNullvalueMonitor && TableNullvalueMonitor.model,
    nullvalues: TableNullvalueMonitor && TableNullvalueMonitor.nullvalues,
    start: TableNullvalueMonitor && TableNullvalueMonitor.start,
})

type trunkGetTableNullvalueDsipatch = (dispatch: (acton: IGetTableNullvaluesAction) => void) => void;

const mapDispatchToProps: (dispatch: (action: trunkGetTableNullvalueDsipatch) => void) => ITableNullvalueMonitorDispatchProps = (dispatch: (action: trunkGetTableNullvalueDsipatch) => void) => ({
    GetTableNullvalues: (tableId: number, start: number, end: number, model: ViewModel) => dispatch(GetTableNullvaluesAction(tableId, start, end, model))
})

export default connect(mapStateToProps, mapDispatchToProps)(TableNullvalueMonitorComponent);