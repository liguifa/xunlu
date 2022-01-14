import { WrapWithCrumbsConnect } from "../header";
import { TablesComponent } from "./view/TablesComponent";
export { ITablesState } from "./store/IState";
import { IState } from "../../store/IState";
import { ITablesDispatchProps, ITablesStateProps } from "./props/ITablesProps";
export { TablesReducer } from "./store/Reducer";
import { AccessTypes, ResourceTypes } from "../common/CommonEnum";
import { TableType } from "./common/TableType";
import { EditTableBusinessAction, EditTableDescriptionAction, GetBusinessForAdminAction, GetBussionInfoAction, LockTableAction, SetTableNameColumnWidthAction, UnLockTableAction } from "./store/Actions";
import { IEditTableBusinessAction, IEditTableDescriptionAction, IGetBusinessForAdminAction, IGetBussionInfoAction, ILockTableAction, ISetTableNameColumnWidthAction, IUnLockTableAction } from "./store/IActions";

const mapStateToProps: ((state: IState) => ITablesStateProps) = ({ Tables, Main, Header }) => ({
    businessId: Tables && Tables.businessId,
    businessName: Tables && Tables.businessName,
    businesses: Tables && Tables.businesses,
    filterType: Tables && Tables.filterType,
    isAdmin: Main && Main.userInfo && (Main.userInfo.role <= 10 || Main.userInfo.access.filter(a => a.accessType === AccessTypes.Admin && a.resourceType === ResourceTypes.Business && a.resourceId === Tables.businessId).length > 0),
    isCanViewOperationLogs: Main && Main.userInfo &&  Main.userInfo.access.filter(a => a.accessType === AccessTypes.OperationLogs && a.resourceType === ResourceTypes.Business && a.resourceId === Tables.businessId).length > 0,
    isShrink: Header.isShrink,
    pageIndex: Tables && Tables.pageIndex,
    pageSize: Tables && Tables.pageSize,
    searchKey: Tables && Tables.searchKey,
    sortKey: Tables && Tables.sortKey,
    sortOrder: Tables && Tables.sortOrder,
    tableNameWidth: Tables && Tables.tableNameColumnWidth,
    tables: Tables && Tables.tables && Tables.tables.map(table => ({...table})),
    total: Tables && Tables.total,
});

type trunkEditDescriptionDispatch = (a: (action: IEditTableDescriptionAction) => void) => void;
type trunkGetBussionInfoDispatch = (a: (action: IGetBussionInfoAction) => void) => void;
type trunkLockTableDispatch = (a: (action: ILockTableAction) => void) => void;
type trunkUnLockTableDispatch = (a: (action: IUnLockTableAction) => void) => void;
type trunkGetBusinessForAdminDispatch = (a: (action: IGetBusinessForAdminAction) => void) => void;
type trunkIEditTableBusinessDispatch = (a: (action: IEditTableBusinessAction) => void) => void;

const mapDispatchToProps: (dispatch: (action: trunkIEditTableBusinessDispatch | trunkGetBusinessForAdminDispatch | trunkEditDescriptionDispatch | ISetTableNameColumnWidthAction | trunkGetBussionInfoDispatch | trunkLockTableDispatch | trunkUnLockTableDispatch) => void) => ITablesDispatchProps = (dispatch: (action:  trunkIEditTableBusinessDispatch | trunkGetBusinessForAdminDispatch | trunkEditDescriptionDispatch | ISetTableNameColumnWidthAction | trunkGetBussionInfoDispatch | trunkLockTableDispatch | trunkUnLockTableDispatch) => void) => ({
    EditTableBusiness: (tableId: number, businessId: number) => dispatch(EditTableBusinessAction(tableId, businessId)),
    EditTableDescription: (tableId: number, description: string) => dispatch(EditTableDescriptionAction(tableId, description)),
    GetBusinessForAdmin: () => dispatch(GetBusinessForAdminAction()),
    GetBusinessInfo: (businessId: number, searchKey: string, filterType: TableType,  pageIndex: number, pageSize: number, sortKey: string, sortOredr: "descend" | "ascend") =>  dispatch(GetBussionInfoAction(businessId, searchKey, filterType,  pageIndex, pageSize, sortKey, sortOredr)),
    LockTable: (tableId: number) => dispatch(LockTableAction(tableId)),
    SetTableNameWidth: (width: number) => dispatch(SetTableNameColumnWidthAction(width)),
    UnLockTable: (tableId: number) => dispatch(UnLockTableAction(tableId)),
});

export default WrapWithCrumbsConnect(mapStateToProps, mapDispatchToProps)(TablesComponent);