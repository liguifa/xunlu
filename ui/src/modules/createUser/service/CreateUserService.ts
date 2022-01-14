import { Http } from "../../../common";
import { IUserItem } from "../common/UserItem";

export class CreateUserService {
    public async SaveUser(username: string, roleId: number) {
        const result = await Http.post<{username: string, roleId: number}, {}>("/user/saveUser", {username, roleId});
        return result.isSuccess;
    }

    public async GetLDAPUserByUsername(username: string) {
        const result = await Http.get<{username: string}, {user: IUserItem}>("/user/getLDAPUserByUsername", {username});
        return result.data;
    }
}