import { ViewModel } from "../common/Lineage";
import { LineageService } from "../service/LineageService";
import { LineageActionTypes } from "./ActionTypes";  
import { IAddTableLineageAction, IChangeUnWatchTablesAction, IChangeViewModelAction, IGetTableLineageAction, IHideTableInfoAction, IShowTableInfoAction } from "./IActions";

export const GetTableLineagesAction: (tableId: number) => (dispatch: (action: IGetTableLineageAction) => void) => void = (tableId: number) => (
    async (dispatch: (action: IGetTableLineageAction) => void) => {
        const result = await new LineageService().GetTableLineages(tableId);
        dispatch({
            lineages: result.lineages,
            tables: result.tables,
            type: LineageActionTypes.GET_TABLE_LINEAGE
        })
    }
)

export const ChangeUnWatchTablesAction: (unWatchTableIds: string[]) => IChangeUnWatchTablesAction = (unWatchTableIds: string[]) => ({
    type: LineageActionTypes.CHNAGE_UNWATCH_TABLES,
    unWatchTableIds,
})

export const AddTableLineagesAction: (tableId: number) => (dispatch: (action: IAddTableLineageAction) => void) => void = (tableId: number) => (
    async (dispatch: (action: IGetTableLineageAction) => void) => {
        const result = await new LineageService().GetTableLineages(tableId);
        dispatch({
            lineages: result.lineages,
            tables: result.tables,
            type: LineageActionTypes.ADD_TABLE_LINEAGE
        })
    }
)

export const ShowTableInfoAction: (tableId: string, tableName: string, tableType: 1 | 2, tableDescription: string) => (dispatch: (action: IShowTableInfoAction) => void) => void = (tableId: string, tableName: string, tableType: 1 | 2, tableDescription: string) => (
    async (dispatch: (action: IShowTableInfoAction) => void) => {
        const result = await new LineageService().GetFields(tableId);
        dispatch({
            fields: result.items,
            tableDescription,
            tableId,
            tableName,
            tableType,
            type: LineageActionTypes.SHOW_TABLE_INFO
        })
    }
)

export const HideTableInfoAction: () => IHideTableInfoAction = () => ({
    type: LineageActionTypes.HIDE_TABLE_INFO
})

export const ChangeViewModelAction: (model: ViewModel) => IChangeViewModelAction = (model: ViewModel) => ({
    model,
    type: LineageActionTypes.CHANGE_VIEW_MODL
})