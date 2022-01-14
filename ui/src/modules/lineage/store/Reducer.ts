import { LineageActionTypes } from "./ActionTypes";
import { IChangeUnWatchTablesAction, IChangeViewModelAction, IGetTableLineageAction, IShowTableInfoAction } from "./IActions";
import { ILineageState } from "./IState";

export const LineageReducer: (state: ILineageState, action: IChangeViewModelAction | IShowTableInfoAction | IChangeUnWatchTablesAction | IGetTableLineageAction) => ILineageState = (state: ILineageState, action: IChangeViewModelAction | IShowTableInfoAction | IChangeUnWatchTablesAction | IGetTableLineageAction) => {
    switch (action.type) {
        case LineageActionTypes.GET_TABLE_LINEAGE:
            return { ...state, nodeLevel: 3, lineages: (action as IGetTableLineageAction).lineages.map(l => ({ source: l.source.toString(), target: l.target.toString() })), tables: (action as IGetTableLineageAction).tables.map(t => ({ ...t, id: t.id.toString() })) }
        case LineageActionTypes.CHNAGE_UNWATCH_TABLES:
            return { ...state, unWatchTableIds: (action as IChangeUnWatchTablesAction).unWatchTableIds };
        case LineageActionTypes.ADD_TABLE_LINEAGE:
            return {
                ...state,
                lineages: state.lineages.concat((action as IGetTableLineageAction).lineages.map(l => ({ source: l.source.toString(), target: l.target.toString() }))),
                nodeLevel: (action as IGetTableLineageAction).tables.length > 0 ? state.nodeLevel + 1 : state.nodeLevel,
                tables: state.tables.concat((action as IGetTableLineageAction).tables.filter(t => state.tables.filter(st => parseInt(st.id, 0) === parseInt(t.id, 0)).length === 0).map(t => ({ ...t, id: t.id.toString() }))),
            }
        case LineageActionTypes.SHOW_TABLE_INFO:
            return {
                ...state,
                isShowTableInfo: true,
                showInfo: {
                    fields: (action as IShowTableInfoAction).fields.map((f, index) => ({ ...f, index: index + 1})),
                    tableDescription: (action as IShowTableInfoAction).tableDescription,
                    tableId: (action as IShowTableInfoAction).tableId,
                    tableName: (action as IShowTableInfoAction).tableName,
                    tableType: (action as IShowTableInfoAction).tableType,
                },
            }
        case LineageActionTypes.HIDE_TABLE_INFO:
            return { ...state, isShowTableInfo: false } 
        case LineageActionTypes.CHANGE_VIEW_MODL:
            return { ...state, model: (action as IChangeViewModelAction).model }
    }
    return { ...state }
}