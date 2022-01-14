import { PartitionService }  from "../service/PartitionService";
import { PartitionActionTypes } from "./ActionTypes";
import { IGetPartitionAction } from "./IActions";

export const GetPartitionAction: (tableId: number, pageIndex: number) => (dispatch: (action: IGetPartitionAction) => void) => void  = (tableId: number, pageIndex: number) => (
    async (dispatch: (action: IGetPartitionAction) => void) => {
        const result = await new PartitionService().GetPartition(tableId, pageIndex);
        dispatch({
            items: result.items,
            pageIndex,
            total: result.total,
            type: PartitionActionTypes.GET_PARTITION
        })
    }
)