import { IShowEditBusinessWindowAction, ShowEditBusinessWindowAction } from "../editBusiness";
import { IBusinessDispatchProps, IBusinessStateProps } from "./props/BussinessProps";
import { BusinessComponent } from "./view/BusinessComponent";
export { IBusinessState } from "./store/IState";
import { IState } from "../../store";
export { BusinessReducer } from "./store/Reducer";
import { WrapWithCrumbsConnect } from "../header";
import { GetAllBusinessesAction } from "./store/Actions";
import { IGetAllBusinessesAction } from "./store/IActions";

const mapStateToProps: (state: IState) => IBusinessStateProps = ({ Business }) => ({
    items: Business && Business.items
})

type thunnkGetBusinessDispatch =  (a: (action: IGetAllBusinessesAction) => void) => void;
type thunnkShowEditBusinessDispatch =  (a: (action: IShowEditBusinessWindowAction) => void) => void;

const mapDispatchToProps: (dispatch: (d: thunnkGetBusinessDispatch | thunnkShowEditBusinessDispatch) => void) => IBusinessDispatchProps = (dispatch: (d: thunnkGetBusinessDispatch | thunnkShowEditBusinessDispatch) => void) => ({
    GetAllBusinesses: () => dispatch(GetAllBusinessesAction()),
    ShowEditBusiness: (businessId: number) => dispatch(ShowEditBusinessWindowAction(businessId))
})

export default WrapWithCrumbsConnect(mapStateToProps, mapDispatchToProps)(BusinessComponent)