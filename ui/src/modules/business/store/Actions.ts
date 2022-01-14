import { BusinessService } from "../service/BusinessService";
import { BusinessActionTypes } from "./ActionTypes";
import { IGetAllBusinessesAction } from "./IActions";

export const GetAllBusinessesAction: () => (dispatch: (action: IGetAllBusinessesAction) => void) => void = () => (
    async (dispatch: (action: IGetAllBusinessesAction) => void) => {
        const result = await new BusinessService().GetAllBusinesses()
        dispatch({
            items: result.items,
            type: BusinessActionTypes.GET_ALL_BUSINESSES
        })
    }
)