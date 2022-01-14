import { connect } from "react-redux";
import { IState } from "../../store";
import { IChooseTablesDispatchProps, IChooseTablesStateProps } from "./props/ChooseTablesProps";
import { ChooseTablesComponent } from "./view/ChooseTablesComponent";
export { IChooseTablesState } from "./store/IState";
import { ITableItem } from "./common/TableItem";
export { ChooseTablesReducer } from "./store/Reducer";
import { ChangeActviesAction, GetTablesAction, HideChooseWindowAction, ShowChooseWindowAction } from "./store/Actions";
import { IChangeActviesAction, IGetTablesAction, IHideChooseWindowAction, IShowChooseWindowAction } from "./store/IActions";

const mapStateToProps: (state: IState) => IChooseTablesStateProps = ({ ChooseTables }) => ({
    actives: ChooseTables && ChooseTables.actives,
    isShow: ChooseTables && ChooseTables.isShow,
    items: ChooseTables && ChooseTables.items,
    pageIndex: ChooseTables && ChooseTables.pageIndex,
    total: ChooseTables && ChooseTables.total
});

type thunnkGetTablesDispatch =  (a: (action: IGetTablesAction) => void) => void;

const mapDispatchToProps: (dispatch: (action: IHideChooseWindowAction | IShowChooseWindowAction | thunnkGetTablesDispatch | IChangeActviesAction) => void) => IChooseTablesDispatchProps = (dispatch: (action: IHideChooseWindowAction | IShowChooseWindowAction | thunnkGetTablesDispatch | IChangeActviesAction) => void) => ({
    ChangeActives: (actives: ITableItem[]) => dispatch(ChangeActviesAction(actives)),
    GetTables: (pageIndex: number, isIncludeSecret: boolean) => dispatch(GetTablesAction(pageIndex, isIncludeSecret)),
    HideChooseWindow: () => dispatch(HideChooseWindowAction()),
    ShowChooseWindow: () => dispatch(ShowChooseWindowAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ChooseTablesComponent);
export { ITableItem }