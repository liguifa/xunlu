import { PartitionSearchService } from "../service/PartitionSearchService";
import { PartitionSearchActionTypes } from "./ActionTypes";
import { ISearchAction } from "./IActions";

export const SearchAction: (keys: string[]) => (dispatch: (action: ISearchAction) => void) => void = (keys: string[]) => (
    (dispatch: (action: ISearchAction) => void) => {
        const searchResult: {[key: string]: string} = {};
        for(const key of keys) {
            searchResult[key] = new PartitionSearchService().Search(key);
        }
        dispatch({
            searchResult,
            type: PartitionSearchActionTypes.PARTITION_SEARCH,
        })
    }
)