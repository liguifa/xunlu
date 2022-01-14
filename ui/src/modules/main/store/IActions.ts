import { IAction } from "../../../store";
import { UserAceess} from "../common/UserInfo";
import { LoadingStatus } from "./LoadingStatus";

export interface ILoadingAction extends IAction {
    status: LoadingStatus
}

export interface IGetUserInfoAction extends IAction {
    username: string,
    displayName: string,
    role: number,
    access: UserAceess
}