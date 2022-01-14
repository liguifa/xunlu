import { PartitionSearchActionTypes } from "./ActionTypes";
import { ISearchAction } from "./IActions";
import { IPartitionSearchState } from "./IState";

export const PartitionSearchReducer: (state: IPartitionSearchState, action: ISearchAction) => IPartitionSearchState = (state: IPartitionSearchState, action: ISearchAction) => {
    switch(action.type) {
        case PartitionSearchActionTypes.PARTITION_SEARCH:
            return { ...state, searchResult: (action as ISearchAction).searchResult }
    }
    return { ...state }
}