import { IState } from  "../../store";
import { TableType } from "./common/TableItem";
import { ISecretDispatchProps, ISecretStateProps } from "./props/SecretProps";
import { GetSecretTablesAction, LockTablesAction, SetTableNameWidthAction, UnLockTableAction } from "./store/Actions";
import { IGetSecretTablesAction, ILockTablesAction, ISetTableNameWidthAction, IUnLockTableAction } from "./store/IActions";
import { SecretComponent } from "./view/SecretComponent";
export { ISecretState } from "./store/IState";
export { SecretReducer } from "./store/Reducer";
import { WrapWithCrumbsConnect } from "../header";

const mapStateToProps: ((state: IState) => ISecretStateProps) = ({ Secret }) => ({
    filterType: Secret && Secret.filterType,
    pageIndex: Secret && Secret.pageIndex,
    pageSize: Secret && Secret.pageSize,
    searchKey: Secret && Secret.searchKey,
    sortKey: Secret && Secret.sortKey,
    sortOrder: Secret && Secret.sortOrder,
    tableNameWidth: Secret && Secret.tableNameWidth,
    tables: Secret && Secret.tables && Secret.tables.map(table => ({...table})),
    total: Secret && Secret.total,
});

type trunkGetSecretTablesDispatch = (a: (action: IGetSecretTablesAction) => void) => void;
type trunkUnLockTableDispatch = (a: (action: IUnLockTableAction) => void) => void;
type trunkLockTablesDispatch = (a: (action: ILockTablesAction) => void) => void;

const mapDispatchToProps: (dispatch: (action: trunkGetSecretTablesDispatch | ISetTableNameWidthAction | trunkUnLockTableDispatch | trunkLockTablesDispatch) => void) => ISecretDispatchProps = (dispatch: (action:  trunkGetSecretTablesDispatch | ISetTableNameWidthAction | trunkUnLockTableDispatch | trunkLockTablesDispatch) => void) => ({
    GetSecretTables: (searchKey: string, filterType: TableType,  pageIndex: number, pageSize: number, sortKey: string, sortOredr: "descend" | "ascend") =>  dispatch(GetSecretTablesAction(searchKey, filterType,  pageIndex, pageSize, sortKey, sortOredr)),
    LockTables: (tableIds: number[]) => dispatch(LockTablesAction(tableIds)),
    SetTableNameWidth: (width: number) => dispatch(SetTableNameWidthAction(width)),
    UnLockTable: (tableId: number) => dispatch(UnLockTableAction(tableId))
});

export default WrapWithCrumbsConnect(mapStateToProps, mapDispatchToProps)(SecretComponent);