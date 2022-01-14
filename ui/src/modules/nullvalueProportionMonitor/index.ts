import { NullvalueProportionMonitorComponent } from "./view/NullvalueProportionMonitorComponent";
export { INullvalueProportionMonitorState } from "./store/IState";
export { NullvalueProportionMonitorReducer } from "./store/Reducer";
import { connect } from "react-redux";
import { IState } from "../../store";
import { ViewModel } from "./common/ViewModel";
import { INullvalueProportionMonitorDispatchProps, INullvalueProportionMonitorStateProps } from "./props/NullvalueProportionMonitorProps";
import { GetFieldNullvaluesAction } from './store/Actions';
import { IGetFieldNullvaluesAction } from './store/IActions';

const mapStateToProps: (state: IState) =>  INullvalueProportionMonitorStateProps = ({ FieldNullvalueMonitor }) => ({
    end: FieldNullvalueMonitor && FieldNullvalueMonitor.end,
    model: FieldNullvalueMonitor && FieldNullvalueMonitor.model,
    nullvalues: FieldNullvalueMonitor && FieldNullvalueMonitor.nullvalues,
    start: FieldNullvalueMonitor && FieldNullvalueMonitor.start,
})

type trunkGetFieldNullvalueDsipatch = (dispatch: (acton: IGetFieldNullvaluesAction) => void) => void;

const mapDispatchToProps: (dispatch: (action: trunkGetFieldNullvalueDsipatch) => void) => INullvalueProportionMonitorDispatchProps = (dispatch: (action: trunkGetFieldNullvalueDsipatch) => void) => ({
    GetFieldNullvalues: (tableId: number, start: number, end: number, model: ViewModel) => dispatch(GetFieldNullvaluesAction(tableId, start, end, model)),
})

export default connect(mapStateToProps, mapDispatchToProps)(NullvalueProportionMonitorComponent);