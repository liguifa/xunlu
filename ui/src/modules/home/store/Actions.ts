import { HomeService } from "../service/HomeService";
import { HomeActionTypes } from "./ActionTypes";
import { IGetStatisticsInfoAction } from "./IActions";

export const GetStatisticsInfoAction: () => (dispatch: (action: IGetStatisticsInfoAction) => void) => void = () => (
    async (dispatch: (action: IGetStatisticsInfoAction) => void) => {
        const result =  await new HomeService().GetStatisticsInfo();
        dispatch({
            businesses: result.businesses,
            totals: result.totals,
            type: HomeActionTypes.GET_STATISTICS_INFO,
        })
    }
)