import { Http } from "../../../common";
import { IUserInfo } from "../common/UserInfo";

export class MainService {
    public async getUerInfo(): Promise<IUserInfo> {
        const result = await Http.get<{}, IUserInfo>("/user/getUserInfo");
        return result.data;
    }
}