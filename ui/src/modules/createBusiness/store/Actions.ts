import { ITableItem } from "../common/TableItem";
import { CreateBusinessService } from "../service/CreateBusinessService";
import { CreateBusinessActives } from "./ActiveTypes";
import { IChangeActviesAction, ICreateBusinessAction, IHideCreateBusinessWindowAction, IShowCreateBusinessWindowAction } from "./IActvies";

export const ChangeActviesAction: (actvies: ITableItem[]) => IChangeActviesAction = (actvies: ITableItem[]) => ({
    actvies,
    type: CreateBusinessActives.CHANGE_ACTIVES
});

export const ShowCreateBusinessWindowAction: () => IShowCreateBusinessWindowAction = () => ({
    isShow: true,
    type: CreateBusinessActives.SHOW_CREATE_BUSINESS_WINDOW
});

export const HideCreateBusinessWindowAction: () => IHideCreateBusinessWindowAction = () => ({
    isShow: false,
    type: CreateBusinessActives.HIDE_CREATE_BUSINESS_WINDOW
});

export const CreateBusinessAction: (name: string, actives: ITableItem[]) => (dispatch: (action: ICreateBusinessAction) => void) => void = (name: string, actives: ITableItem[]) => (
    async (dispatch: (action: ICreateBusinessAction) => void) =>{
        await new CreateBusinessService().SaveBusiness(name, actives.map(active => active.id));
        dispatch({
            isShow: false,
            type: CreateBusinessActives.CREATE_BUSINESS
        });
    }
)