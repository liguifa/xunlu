import { FieldNullvalueMonitorComponent } from "./view/FieldNullvalueMonitorComponent";
export { IFieldNullvalueMonitorState } from "./store/IState";
export { FieldNullvalueMonitorReducer } from "./store/Reducer";
import { connect } from "react-redux";
import { IState } from "../../store";
import { ViewModel } from "./common/ViewModel";
import { IFieldNullvalueMonitorDispatchProps, IFieldNullvalueMonitorStateProps } from "./props/FieldNullvalueMonitorProps";
import { ChangeFieldAction, GetFieldNullvaluesAction, GetFieldsAction } from './store/Actions';
import { IChangeFieldAction, IGetFieldNullvaluesAction, IGetFieldsAction } from './store/IActions';

const mapStateToProps: (state: IState) =>  IFieldNullvalueMonitorStateProps = ({ FieldNullvalueMonitor }) => ({
    currentField: FieldNullvalueMonitor && FieldNullvalueMonitor.currentField,
    end: FieldNullvalueMonitor && FieldNullvalueMonitor.end,
    fields: FieldNullvalueMonitor && FieldNullvalueMonitor.fields,
    model: FieldNullvalueMonitor && FieldNullvalueMonitor.model,
    nullvalues: FieldNullvalueMonitor && FieldNullvalueMonitor.nullvalues,
    start: FieldNullvalueMonitor && FieldNullvalueMonitor.start,
})

type trunkGetFieldNullvalueDsipatch = (dispatch: (acton: IGetFieldNullvaluesAction) => void) => void;
type trunkGetFieldsNDsipatch = (dispatch: (acton: IGetFieldsAction) => void) => void;

const mapDispatchToProps: (dispatch: (action: IChangeFieldAction | trunkGetFieldsNDsipatch | trunkGetFieldNullvalueDsipatch) => void) => IFieldNullvalueMonitorDispatchProps = (dispatch: (action: IChangeFieldAction | trunkGetFieldsNDsipatch | trunkGetFieldNullvalueDsipatch) => void) => ({
    ChangeCurrentField: (currentField: string) => dispatch(ChangeFieldAction(currentField)),
    GetFieldNullvalues: (tableId: number, start: number, end: number, model: ViewModel) => dispatch(GetFieldNullvaluesAction(tableId, start, end, model)),
    GetFields: (tableId: number) => dispatch(GetFieldsAction(tableId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FieldNullvalueMonitorComponent);