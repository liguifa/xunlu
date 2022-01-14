import { ITableItem } from "../common/TableItem";
import { ChooseTablesService } from "../service/ChooseTablesService";
import { ChooseTablesActionTypes } from "./ActionTypes";
import { IChangeActviesAction, IGetTablesAction, IHideChooseWindowAction, IShowChooseWindowAction } from "./IActions";

export const ShowChooseWindowAction: () => IShowChooseWindowAction = () => ({
    isShow: true,
    type: ChooseTablesActionTypes.SHOW_CHOOSE_WINDOW
});

export const HideChooseWindowAction: () => IHideChooseWindowAction = () => ({
    isShow: false,
    type: ChooseTablesActionTypes.HIDE_CHOOSE_WINDOW
});

export const GetTablesAction: (pageIndex: number, isIncludeSceret: boolean) => (dispatch: (action: IGetTablesAction) => void) => void  = (pageIndex: number, isIncludeSceret: boolean) => (
    async (dispatch: (action: IGetTablesAction) => void) => {
        const result = await new ChooseTablesService().GetTables(pageIndex, isIncludeSceret);
        dispatch({
            items: result.items,
            pageIndex,
            total: result.total,
            type: ChooseTablesActionTypes.GET_TABLES
        })
    }
)

export const ChangeActviesAction: (actives: ITableItem[]) => IChangeActviesAction = (actives: ITableItem[]) => ({
    actives,
    type: ChooseTablesActionTypes.CHANGE_ACTIVES
})