import { PartitionActionTypes } from "./ActionTypes";
import { IGetPartitionAction } from "./IActions";
import { IPartitionState } from "./IState";

export const PartitionReducer: (state: IPartitionState, action: IGetPartitionAction) => IPartitionState = (state: IPartitionState, action: IGetPartitionAction) => {
    switch(action.type) {
        case PartitionActionTypes.GET_PARTITION:
            return { ...state, pageIndex: action.pageIndex, total: action.total, partitionItems: action.items.map((item, index) => ({ ...item, index: index + 1 })) }
    }
    return { ...state }
}