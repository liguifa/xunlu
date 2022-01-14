import { Http } from "../../../common";
import { IUserItem } from "../common/UserItem";

export class UserService {
    public async GetUsers(pageIndex: number, searchKey: string) {
        const result = await Http.get<{pageIndex: number, pageSize: number, searchKey: string}, {users: IUserItem[], total: number}>("/user/getUsers", {pageIndex, pageSize: 20, searchKey});
        return result.data;
    }

    public async DisableUser(userId: number) {
        const result = await Http.post<{userId: number}, {}>("/user/disableUser", {userId});
        return result.data;
    }

    public async ActiveUser(userId: number) {
        const result = await Http.post<{userId: number}, {}>("/user/activeUser", {userId});
        return result.data;
    }
}