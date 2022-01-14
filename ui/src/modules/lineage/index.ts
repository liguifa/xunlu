import { LineageComponent } from "./view/LineageComponent";
export { ILineageState } from "./store/IState";
export { LineageReducer } from "./store/Reducer";
import { connect } from "react-redux";
import { IState } from "../../store";
import { ViewModel } from './common/Lineage';
import { ILineageDispatchProps, ILineageStateProps } from "./props/LineageComponentProps";
import { AddTableLineagesAction, ChangeUnWatchTablesAction, ChangeViewModelAction, GetTableLineagesAction, HideTableInfoAction, ShowTableInfoAction } from "./store/Actions";
import { IAddTableLineageAction, IChangeUnWatchTablesAction, IChangeViewModelAction, IGetTableLineageAction, IHideTableInfoAction, IShowTableInfoAction } from "./store/IActions";

const mapStateToProps: (state: IState) => ILineageStateProps = ({ Lineage }) => ({
    isShowTableInfo: Lineage && Lineage.isShowTableInfo,
    lineages: Lineage && Lineage.lineages,
    model: Lineage && Lineage.model,
    nodeLevel: Lineage && Lineage.nodeLevel,
    tableInfo: Lineage && Lineage.showInfo,
    tables: Lineage && Lineage.tables,
    unWatchTableIds: Lineage && Lineage.unWatchTableIds,
})

type trunkGetTableLineageDispatch = (dispatch: (action: IGetTableLineageAction) => void) => void;
type trunkAddTableLineageDispatch = (dispatch: (action: IAddTableLineageAction) => void) => void;
type trunkShowTableInfoDispatch = (dispatch: (action: IShowTableInfoAction) => void) => void;

const mapDispatchToProps: (dispatch: (action: IChangeViewModelAction | IHideTableInfoAction | trunkShowTableInfoDispatch | trunkAddTableLineageDispatch | IChangeUnWatchTablesAction | trunkGetTableLineageDispatch) => void) => ILineageDispatchProps = (dispatch: (action: IChangeViewModelAction | IHideTableInfoAction | trunkShowTableInfoDispatch | trunkAddTableLineageDispatch | IChangeUnWatchTablesAction | trunkGetTableLineageDispatch) => void) => ({
    AddTableLineages: (tableId: number) => dispatch(AddTableLineagesAction(tableId)),
    ChangeUnWatchTables: (unWatchTableIds: string[]) => dispatch(ChangeUnWatchTablesAction(unWatchTableIds)),
    ChangeViewModel: (model: ViewModel) => dispatch(ChangeViewModelAction(model)),
    GetTableLineages: (tableId: number) => dispatch(GetTableLineagesAction(tableId)),
    HideTableInfo: () => dispatch(HideTableInfoAction()),
    ShowTableInfo: (tableId: string, tableName: string, tableType: 1 | 2, tableDescription: string) => dispatch(ShowTableInfoAction(tableId, tableName, tableType, tableDescription))
})

export default connect(mapStateToProps, mapDispatchToProps)(LineageComponent);