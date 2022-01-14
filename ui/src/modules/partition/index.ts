import { PartitionComponent } from "./view/PartitionComponent";
export { IPartitionState } from "./store/IState";
export { PartitionReducer } from "./store/Reducer";
import { connect } from "react-redux";
import { IState } from "../../store";
import { IPartitionDispatchProps, IPartitionStateProps } from "./props/PartitionProp";
import { GetPartitionAction } from "./store/Actions";
import { IGetPartitionAction } from "./store/IActions";

const mapStateToProps: (state: IState) => IPartitionStateProps = ({ Partition }) => ({
    pageIndex: Partition && Partition.pageIndex,
    partitionItems: Partition && Partition.partitionItems,
    total: Partition && Partition.total
});

const mapDispatchToProps: (dispatch: (d : (a: (action: IGetPartitionAction) => void) => void) => void) => IPartitionDispatchProps = (dispatch: (d : (a: (action: IGetPartitionAction) => void) => void) => void) => ({
    GetPartition: (tableId: number, pageIndex: number) => dispatch(GetPartitionAction(tableId, pageIndex))
})

export default connect(mapStateToProps, mapDispatchToProps)(PartitionComponent);