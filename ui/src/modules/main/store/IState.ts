import { IUserInfo,  UserAceess} from "../common/UserInfo";
import { LoadingStatus } from "./LoadingStatus";

export interface IMainState {
    status: LoadingStatus,
    userInfo: IUserInfo,
    access: UserAceess
}