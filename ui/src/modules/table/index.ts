import { WrapWithCrumbsConnect } from "../header";
import { TableComponent  } from "./view/TableComponent";
export { ITableState } from "./store/IState";
import { IState } from "../../store";
import { ITableDispatchProps, ITableStateProps } from "./props/TableComponentProps";
export { TableReducer } from "./store/Reducer";
import { AccessTypes, ResourceTypes } from "../common/CommonEnum";
import { EditTableDescriptionAction, GetTableInfoAction, UpdateTableExtendAcction as UpdateTableExtendAction } from "./store/Actions";
import { IEditTableDescriptionAction, IGetTableInfoAction, IUpdateTableExtendAction } from "./store/IActions";

const mapStateToProps: ((state: IState) => ITableStateProps) = ({ Table, Main }) => ({
    businessId: Table && Table.businessId,
    businessName: Table && Table.businessName,
    createTime: Table && Table.createTime,
    dbName: Table && Table.dbName,
    description: Table && Table.description,
    extends: Table && Table.extends,
    format: Table && Table.format,
    isAdmin: Main && Main.userInfo && (Main.userInfo.role <= 10 || Main.userInfo.access.filter(a => a.accessType === AccessTypes.Admin && a.resourceType === ResourceTypes.Business && a.resourceId === Table.businessId).length > 0),
    isCanAccess: Table && Table.isCanAccess,
    isSecret: Table && Table.isSecret,
    location: Table && Table.location,
    rowTotal: Table && Table.rowTotal,
    tableName: Table && Table.tableName,
    tableType: Table && Table.type,
    tblType: Table && Table.tblType,
    updateTime: Table && Table.updateTime,
})

const mapDispatchToProps: (dispatch: (d: (a: (action: IGetTableInfoAction | IEditTableDescriptionAction | IUpdateTableExtendAction) => void) => void) => void) => ITableDispatchProps = (dispatch: (d: (a: (action: IGetTableInfoAction | IEditTableDescriptionAction | IUpdateTableExtendAction) => void) => void) => void) => ({
    EditTableDescription: (tableId: number, description: string) => dispatch(EditTableDescriptionAction(tableId, description)),
    GetTableInfo : (tableId: number) =>  dispatch(GetTableInfoAction(tableId)),
    UpdateTableExtend: (tableId: number, key: string, value: string) => dispatch(UpdateTableExtendAction(tableId, key, value))
})

export default WrapWithCrumbsConnect(mapStateToProps, mapDispatchToProps)(TableComponent);