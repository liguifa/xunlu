import { UserService } from "../service/UserService";
import { UserActionTypes } from "./ActionTypes";
import { IChangeUserStatusAction, IGetUsersAction } from "./IActions";

export const GetUsersAction: (pageIndex: number, searchKey: string) => (dispatch: (action: IGetUsersAction) => void) => void = (pageIndex: number, searchKey: string) => (
    async (dispatch: (action: IGetUsersAction) => void) => {
        const result = await new UserService().GetUsers(pageIndex, searchKey);
        dispatch({
            pageIndex,
            total: result.total,
            type: UserActionTypes.GET_USERS,
            users: result.users,
        })
    }
)

export const DisableUserAction: (userId: number) => (dispatch: (action: IChangeUserStatusAction) => void) => void = (userId: number) => (
    async (dispatch: (action: IChangeUserStatusAction) => void) => {
        await new UserService().DisableUser(userId);
        dispatch({
            status: 0,
            type: UserActionTypes.CHANGE_USER_STATUS,
            userId,
        })
    }
)

export const ActiveUserAction: (userId: number) => (dispatch: (action: IChangeUserStatusAction) => void) => void = (userId: number) => (
    async (dispatch: (action: IChangeUserStatusAction) => void) => {
        await new UserService().ActiveUser(userId);
        dispatch({
            status: 1,
            type: UserActionTypes.CHANGE_USER_STATUS,
            userId,
        })
    }
)