import { WrapWithCrumbsConnect } from "../header";
import { HomeComponent } from "./view/HomeComponent";
export { IHomeState } from "./store/IState";
export { HomeReducer } from "./store/Reducer";
import { IState } from "../../store";
import { IHomeDispatchProps, IHomeStateProps } from "./props/HomeProps";
import { GetStatisticsInfoAction } from "./store/Actions";
import { IGetStatisticsInfoAction } from "./store/IActions";

const mapStateToProps: (state: IState) => IHomeStateProps = ({ Home }) => ({
    businesses: Home && Home.businesses,
    totals: Home && Home.totals,
});

const mapDispatchToProps: (dispatch: (d: (a: (action: IGetStatisticsInfoAction) => void) => void) => void) => IHomeDispatchProps = (dispatch: (d: (a: (action: IGetStatisticsInfoAction) => void) => void) => void) => ({
    GetStatisticsInfo: () => dispatch(GetStatisticsInfoAction())
})

export default WrapWithCrumbsConnect(mapStateToProps, mapDispatchToProps)(HomeComponent);