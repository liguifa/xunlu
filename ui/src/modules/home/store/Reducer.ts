import { HomeActionTypes } from './ActionTypes';
import { IGetStatisticsInfoAction } from "./IActions";
import { IHomeState } from "./IState";

export const HomeReducer: (state: IHomeState, action: IGetStatisticsInfoAction) => IHomeState = (state: IHomeState, action: IGetStatisticsInfoAction) => {
    switch(action.type) {
        case HomeActionTypes.GET_STATISTICS_INFO:
            return { ...state, totals: action.totals, businesses: action.businesses }
    }
    return { ...state }
}