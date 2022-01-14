import { BusinessActionTypes } from "./ActionTypes";
import { IGetAllBusinessesAction } from "./IActions";
import { IBusinessState } from "./IState";

export const BusinessReducer: (state: IBusinessState, action: IGetAllBusinessesAction) => IBusinessState = (state: IBusinessState, action: IGetAllBusinessesAction) => {
    switch(action.type) {
        case BusinessActionTypes.GET_ALL_BUSINESSES:
            return { ...state, items: action.items.map((item, index) => ({ ...item, index: index + 1 })) }
    }
    return { ...state }
}