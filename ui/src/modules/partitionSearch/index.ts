import { PartitionSearchComponent } from "./view/PartitionSearchComponent";
export { IPartitionSearchState } from "./store/IState";
export { PartitionSearchReducer } from "./store/Reducer";
import { connect } from "react-redux";
import { IState } from "../../store";
import { IPartitionSearchDispatchProps, IPartitionSearchStateProps } from "./props/PartitionSearchProps";
import { SearchAction } from "./store/Actions";
import { ISearchAction } from "./store/IActions";

const mapStateToProps: (state: IState) => IPartitionSearchStateProps = ({ PartitionSearch }) => ({
    searchResult: PartitionSearch && PartitionSearch.searchResult
})

type thunkSearchDispatch = (dispatch: (action: ISearchAction) => void) => void;

const mapDispatchToProps: (dispatch: (action: thunkSearchDispatch) => void) => IPartitionSearchDispatchProps = (dispatch: (action: thunkSearchDispatch) => void) => ({
    Search: (keys: string[]) => dispatch(SearchAction(keys))
})

export default connect(mapStateToProps, mapDispatchToProps)(PartitionSearchComponent);