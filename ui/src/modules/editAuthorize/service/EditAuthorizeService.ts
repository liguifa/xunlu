import { Http } from "../../../common";
import { ITableItem } from "../common/ITableItem";

export class EditAuthorizeService {
    public async GetUserAuthorize(userId: number) {
        const result = await Http.get<{userId: number}, {username: string, tableIds: number[], role: number}>("/user/getUserAuthorize", {userId});
        return result.data;
    }

    public async GetAllSecretTables() {
        const result = await Http.get<{}, {items: ITableItem[], total: number}>("/table/getAllSecretTables");
        return result.data
    }

    public async EditAuthorize(userId: number, roleId: number, actives: number[]) {
        const result = await Http.post<{userId: number, roleId: number, actives: number[]}, {}>("/user/editAuthorize", {userId, roleId, actives});
        return result.data;
    }
}