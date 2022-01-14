import { IBusinessState } from "../modules/business";
import { IBusinessAuthorizeState } from "../modules/businessAuthorize";
import { IBusinessOperationLogsState } from "../modules/businessOperationLogs";
import { IChooseTablesState } from "../modules/chooseTables";
import { ICreateBusinessState } from "../modules/createBusiness";
import { ICreateTemplateState } from "../modules/createTemplate";
import { ICreateUserState } from "../modules/createUser";
import { IEditAuthorizeState } from "../modules/editAuthorize";
import { IEditBusinessState } from "../modules/editBusiness";
import { IEditBusinessAdminState } from "../modules/editBusinessAdmin";
import { IEditTableState } from "../modules/editTable";
import { IExampleState } from "../modules/example";
import { IFieldNullvalueMonitorState } from "../modules/fieldNullvalueMonitor";
import { IFieldsState } from "../modules/fields"; 
import { IHeaderState } from "../modules/header";
import { IHomeState } from "../modules/home";
import { IHotMonitorState } from "../modules/hotMonitor";
import { ILineageState } from "../modules/lineage";
import { ILoginState } from "../modules/login";
import { IMainState } from "../modules/main";
import { INavState } from "../modules/nav";
import { IOperationLogsState } from "../modules/operationLogs";
import { IOperationLogsAuthorizeState } from "../modules/operationLogsAuthorize";
import { IPartitionState } from "../modules/partition";
import { IPartitionSearchState } from  "../modules/partitionSearch";
import { IRownumMonitorState } from "../modules/rownumMonitor";
import { ISecretState } from "../modules/secret";
import { ITableState } from "../modules/table";
import { ITableNullvalueMonitorState } from "../modules/tableNullvalueMonitor";
import { ITablesState } from "../modules/tables";
import { ITemplateState } from "../modules/template";
import { IUserState } from "../modules/user";
import { IViewTemplateState } from  "../modules/viewTemplate";

export interface IState {
    Header: IHeaderState,
    Login: ILoginState,
    Main: IMainState,
    Tables: ITablesState,
    Table: ITableState,
    Example: IExampleState,
    ViewTemplate: IViewTemplateState,
    Nav: INavState,
    Fields: IFieldsState,
    Partition: IPartitionState,
    Business: IBusinessState,
    ChooseTables: IChooseTablesState,
    CreateBusiness: ICreateBusinessState,
    User: IUserState,
    CreateUser: ICreateUserState,
    Home: IHomeState,
    EditBusiness: IEditBusinessState,
    EditTable: IEditTableState,
    Secret: ISecretState,
    EditAuthorize: IEditAuthorizeState,
    CreateTemplate: ICreateTemplateState,
    Lineage: ILineageState,
    RownumMonitor: IRownumMonitorState,
    HotMonitor: IHotMonitorState,
    TableNullvalueMonitor: ITableNullvalueMonitorState,
    FieldNullvalueMonitor: IFieldNullvalueMonitorState,
    OperationLogs: IOperationLogsState,
    Template: ITemplateState,
    EditBusinessAdmin: IEditBusinessAdminState,
    BusinessAuthorize: IBusinessAuthorizeState,
    OperationLogsAuthorize: IOperationLogsAuthorizeState,
    BusinessOperationLogs: IBusinessOperationLogsState,
    PartitionSearch: IPartitionSearchState,
}