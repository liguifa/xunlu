import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import ReduxThunk from 'redux-thunk'
import { BusinessReducer } from "../modules/business";
import { BusinessAuthorizeReducer } from "../modules/businessAuthorize";
import { BusinessOperationLogsReducer } from "../modules/businessOperationLogs";
import { ChooseTablesReducer } from "../modules/chooseTables";
import { CreateBusinessReducer } from "../modules/createBusiness";
import { CreateTemplateReducer } from "../modules/createTemplate";
import { CreateUserReducer } from "../modules/createUser";
import { EditAuthorizeReducer } from "../modules/editAuthorize";
import { EditBusinessReducer } from "../modules/editBusiness";
import { EditBusinessAdminReducer } from "../modules/editBusinessAdmin";
import { EditTableReducer } from "../modules/editTable";
import { ExampleReducer } from "../modules/example";
import { FieldNullvalueMonitorReducer } from "../modules/fieldNullvalueMonitor";
import { FieldsReducer } from "../modules/fields";
import { HeaderReducer } from "../modules/header";
import { HomeReducer } from "../modules/home";
import { HotMonitorReducer } from "../modules/hotMonitor";
import { LineageReducer } from "../modules/lineage";
import { LoginReducer } from '../modules/login';
import { MainReducer } from '../modules/main';
import { NavReducer } from "../modules/nav";
import { OperationLogsReducer } from "../modules/operationLogs";
import { OperationLogsAuthorizeReducer } from "../modules/operationLogsAuthorize";
import { PartitionReducer } from "../modules/partition";
import { PartitionSearchReducer } from "../modules/partitionSearch";
import { RownumMonitorReducer } from "../modules/rownumMonitor";
import { SecretReducer } from "../modules/secret";
import { TableReducer } from "../modules/table";
import { TableNullvalueMonitorReducer } from "../modules/tableNullvalueMonitor";
import { TablesReducer } from "../modules/tables";
import { TemplateReducer } from "../modules/template";
import { UserReducer } from "../modules/user";
import { ViewTemplateReducer } from "../modules/viewTemplate";

const composedEnhancers = process.env.NODE_ENV === "production" ? compose(applyMiddleware(ReduxThunk)) : compose(applyMiddleware(ReduxThunk), (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__())

const reducer = combineReducers({
    Business: BusinessReducer,
    BusinessAuthorize: BusinessAuthorizeReducer,
    BusinessOperationLogs: BusinessOperationLogsReducer,
    ChooseTables: ChooseTablesReducer,
    CreateBusiness: CreateBusinessReducer,
    CreateTemplate: CreateTemplateReducer,
    CreateUser: CreateUserReducer,
    EditAuthorize: EditAuthorizeReducer,
    EditBusiness: EditBusinessReducer,
    EditBusinessAdmin: EditBusinessAdminReducer,
    EditTable: EditTableReducer,
    Example: ExampleReducer,
    FieldNullvalueMonitor: FieldNullvalueMonitorReducer,
    Fields: FieldsReducer,
    Header: HeaderReducer,
    Home: HomeReducer,
    HotMonitor: HotMonitorReducer,
    Lineage: LineageReducer,
    Login: LoginReducer,
    Main: MainReducer,
    Nav: NavReducer,
    OperationLogs: OperationLogsReducer,
    OperationLogsAuthorize: OperationLogsAuthorizeReducer,
    Partition: PartitionReducer,
    PartitionSearch: PartitionSearchReducer,
    RownumMonitor: RownumMonitorReducer,
    Secret: SecretReducer,
    Table: TableReducer,
    TableNullvalueMonitor: TableNullvalueMonitorReducer,
    Tables: TablesReducer,
    Template: TemplateReducer,
    User: UserReducer,
    ViewTemplate: ViewTemplateReducer,
});

export default createStore(reducer, {}, composedEnhancers)