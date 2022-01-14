import { IState } from "../../store";
import { IFieldsDispatchProps, IFieldsStateProps } from "./props/FieldsProps";
import { FieldsComponent } from "./view/FieldsComponent";
export { IFieldsState } from "./store/IState";
import { connect } from "react-redux";
import { ChangeLockStatusAction, EditFieldDescriptionAction, EditFieldDictAction, GetFieldsAction, SetFieldNameColumnWidthAction } from "./store/Actions";
import { IChangeLockStatusAction, IEditFieldDescriptionAction, IEditFieldDictAction, IGetFieldsAction, ISetFieldNameColumnWidthAction } from "./store/IActions";
export { FieldsReducer } from "./store/Reducer";
import { AccessTypes, ResourceTypes } from "../common/CommonEnum";

const mapStateToProps: (state: IState) => IFieldsStateProps = ({ Fields, Table, Main }) => ({
    fieldWidth: Fields && Fields.fieldWidth,
    isAdmin: Main && Main.userInfo && (Main.userInfo.role <= 10 || Main.userInfo.access.filter(a => a.accessType === AccessTypes.Admin && a.resourceType === ResourceTypes.Business && a.resourceId === Table.businessId).length > 0),
    items: Fields && Fields.items,
});

type trunkGetFieldsDispatch = (a: (action: IGetFieldsAction) => void) => void;
type trunkEditFieldDescriptionDispatch = (a: (action: IEditFieldDescriptionAction) => void) => void;
type trunkEditFieldDictDispatch = (a: (action: IEditFieldDictAction) => void) => void;
type trunkChangeLockStatusDispatch = (a: (action: IChangeLockStatusAction) => void) => void;

const mapDispatchToProps: (dispatch: (action: trunkChangeLockStatusDispatch| trunkGetFieldsDispatch | trunkEditFieldDescriptionDispatch | trunkEditFieldDictDispatch | ISetFieldNameColumnWidthAction) => void) => IFieldsDispatchProps = (dispatch: (action: trunkChangeLockStatusDispatch | trunkGetFieldsDispatch | trunkEditFieldDescriptionDispatch | trunkEditFieldDictDispatch | ISetFieldNameColumnWidthAction) => void) => ({
    ChangeLockStatus: (fieldId: string, isLock: boolean) => dispatch(ChangeLockStatusAction(fieldId, isLock)),
    EditFieldDescription: (fieldId: string, description: string) => dispatch(EditFieldDescriptionAction(fieldId, description)),
    EditFieldDict: (fieldId: string, dict: string) => dispatch(EditFieldDictAction(fieldId, dict)),
    GetFields: (tableId: number) => dispatch(GetFieldsAction(tableId)),
    SetFieldNameWidth: (width: number) => dispatch(SetFieldNameColumnWidthAction(width)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FieldsComponent);