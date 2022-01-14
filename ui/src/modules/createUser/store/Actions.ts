// import { IUserItem } from "../common/UserItem";
import { CreateUserService } from "../service/CreateUserService";
import { CreateUserActionTypes } from "./ActionTypes";
import { IChangeUserAction, IChangeUsernameAction, ICreateUserAction, IHideCreateUserWindowAction, IShowCreateUserWindowAction } from "./IActions";

export const ChangeUserAction: (username: string) => (dispatch: (action: IChangeUserAction) => void) => void = (username: string) => (
    async (dispatch: (action: IChangeUserAction) => void) => {
        const result = await new CreateUserService().GetLDAPUserByUsername(username);
        dispatch({
            type: CreateUserActionTypes.CHANGE_USER,
            user: result.user,
        });
    }
)

export const ShowCreateUserWindowAction: () => IShowCreateUserWindowAction = () => ({
    isShow: true,
    type: CreateUserActionTypes.SHOW_CREATE_USER_WINDOW
});

export const HideCreateUserWindowAction: () => IHideCreateUserWindowAction = () => ({
    isShow: false,
    type: CreateUserActionTypes.HIDE_CREATE_USER_WINDOW
});

export const CreateUserAction: (username: string, roleId: number) => (dispatch: (action: ICreateUserAction) => void) => void = (username: string, roleId: number) => (
    async (dispatch: (action: ICreateUserAction) => void) => {
        await new CreateUserService().SaveUser(username, roleId);
        dispatch({
            isShow: false,
            type: CreateUserActionTypes.CREATE_USER
        });
    }
);

export const ChangeUsernameAction: (username: string) => IChangeUsernameAction = (username: string) => ({
    type: CreateUserActionTypes.CHANGE_USERNAME,
    username,
});