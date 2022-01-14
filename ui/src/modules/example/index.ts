import { ExampleComponent } from "./view/ExampleComponent";
export { IExampleState } from "./store/IState";
export { ExampleReducer } from "./store/Reducer";
import { connect } from "react-redux";
import { IState } from "../../store";
import { IExampleDispatchProps, IExampleStateProps } from "./props/ExampleProps"; 
import { EditFieldDescriptionAction, EditFieldDictAction, GetTableExampleAction } from "./store/Actions";
import { IEditFieldDescriptionAction, IEditFieldDictAction, IGetTableExampleAction } from "./store/IActions";

const mapStateToProps: (state: IState) => IExampleStateProps = ({ Example, Main }) => ({
    columns: Example && Example.columns && Example.columns.map(column => ({...column})),
    isAdmin: Main && Main.userInfo && Main.userInfo.role <= 10,
    rows: Example && Example.rows && Example.rows.map(row => { try { return JSON.parse(row); } catch { return {}; }}),
})

const mapDispatchToProps: (dispatch: (d: (a: (action: IEditFieldDescriptionAction | IEditFieldDictAction | IGetTableExampleAction) => void) => void) => void) => IExampleDispatchProps = (dispatch: (d: (a: (action: IEditFieldDescriptionAction | IEditFieldDictAction | IGetTableExampleAction) => void) => void) => void) => ({
    EditFieldDescription: (fieldId: string, description: string) => dispatch(EditFieldDescriptionAction(fieldId, description)),
    EditFieldDict: (fieldId: string, dict: string) => dispatch(EditFieldDictAction(fieldId, dict)),
    GetTableExample: (tableId: number) => dispatch(GetTableExampleAction(tableId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ExampleComponent);