import { CreateBusinessComponent } from "./view/CreateBusinessComponent";
export { CreateBusinessReducer } from "./store/Reducer";
export { ICreateBusinessState } from "./store/IState";
import { connect } from "react-redux";
import { IState } from "../../store";
import { ITableItem } from "./common/TableItem";
import { ICreateBusinessDispatchProps, ICreateBusinessStateProps } from "./props/CreateBusinessProps";
import { ChangeActviesAction, CreateBusinessAction, HideCreateBusinessWindowAction, ShowCreateBusinessWindowAction } from "./store/Actions";
import { IChangeActviesAction, ICreateBusinessAction, IHideCreateBusinessWindowAction, IShowCreateBusinessWindowAction } from "./store/IActvies";

const mapStateToProps: (state: IState) => ICreateBusinessStateProps = ({ CreateBusiness }) => ({
    actives: CreateBusiness && CreateBusiness.actives,
    isShow: CreateBusiness && CreateBusiness.isShow
});

type thunnkSaveBusinessDispatch =  (a: (action: ICreateBusinessAction) => void) => void;

const mapDispatchToProps: (dispatch: (action: IChangeActviesAction | IHideCreateBusinessWindowAction | IShowCreateBusinessWindowAction | thunnkSaveBusinessDispatch) => void) => ICreateBusinessDispatchProps = (dispatch: (action: IChangeActviesAction | IHideCreateBusinessWindowAction | IShowCreateBusinessWindowAction | thunnkSaveBusinessDispatch) => void) => ({
    ChangeActives: (actives: ITableItem[]) => dispatch(ChangeActviesAction(actives)),
    HideWindow: () => dispatch(HideCreateBusinessWindowAction()),
    SaveBusiness: (name: string, actives: ITableItem[]) => dispatch(CreateBusinessAction(name, actives)),
    ShowWindow: () => dispatch(ShowCreateBusinessWindowAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateBusinessComponent);