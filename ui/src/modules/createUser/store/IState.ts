import { IUserItem } from "../common/UserItem";

export interface ICreateUserState {
    user?: IUserItem
    isShow: boolean
    username: string
}