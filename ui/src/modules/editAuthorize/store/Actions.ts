import { EditAuthorizeService } from "../service/EditAuthorizeService";
import { EditAuthorizeActionTypes } from "./ActionTypes";
import { IChangeActivesAction, IEditAuthorizeAction, IGetAllSecretTablesAction, IGetUserAuthorizeAction, IHideEditAuthorizeAction, IShowEditAuthorizeAction } from "./IActions";

export const HideEditAuthorizeAction: () => IHideEditAuthorizeAction = () => ({
    isShow: false,
    type: EditAuthorizeActionTypes.HIDE_EDIT_AUTHORIZE
})

export const ShowEditAuthorizeAction: (userId: number) => (dispatch: (action: IShowEditAuthorizeAction) => void) => void = (userId: number) => (
    async (dispatch: (action: IShowEditAuthorizeAction) => void) => {
        const result = await new EditAuthorizeService().GetUserAuthorize(userId);
        dispatch({
            actives: result.tableIds,
            isShow: true,
            roleId: result.role,
            type: EditAuthorizeActionTypes.SHOW_EDIT_AUTHORIZE,
            userId,
            username: result.username,
        });
    }
)

export const GetUserAuthorizeAction: (userId: number) => (dispatch: (action: IGetUserAuthorizeAction) => void) => void = (userId: number) => (
    async (dispatch: (action: IGetUserAuthorizeAction) => void) => {
        const result = await new EditAuthorizeService().GetUserAuthorize(userId);
        dispatch({
            actives: result.tableIds,
            type: EditAuthorizeActionTypes.GET_USER_AUTHORIZE,
            username: result.username,
        });
    }
)

export const GetAllSecretTablesAction: () => (dispatch: (action: IGetAllSecretTablesAction) => void) => void = () => (
    async (dispatch: (action: IGetAllSecretTablesAction) => void) => {
        const result = await new EditAuthorizeService().GetAllSecretTables();
        dispatch({
            tables: result.items,
            total: result.total,
            type: EditAuthorizeActionTypes.GET_ALL_SECRET_TABLES,
        });
    }
)

export const ChangeActivesAction: (actives: number[]) => IChangeActivesAction = (actives: number[]) => ({
    actives,
    type: EditAuthorizeActionTypes.CHANGE_ACTIVES
})

export const EditAuthorizeAction: (userId: number, roleId: number, actives: number[]) => (dispatch: (action: IEditAuthorizeAction) => void) => void = (userId: number, roleId: number,  actives: number[]) => (
    async (dispatch: (action: IEditAuthorizeAction) => void) => {
        new EditAuthorizeService().EditAuthorize(userId, roleId, actives);
        dispatch({
            isShow: false,
            type: EditAuthorizeActionTypes.EDIT_AUTHORIZE    
        });
    }
)