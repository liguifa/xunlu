import message from "antd/lib/message";
import { Http } from "../../../common";
import { IUserItem } from "../common/UserItem";

export class OperationLogsAuthorizeService {
    public async GetUsers(pageIndex: number, searchKey: string) {
        const result = await Http.get<{pageIndex: number, pageSize: number, searchKey: string}, {users: IUserItem[], total: number}>("/user/getUsers", {pageIndex, pageSize: 20, searchKey});
        return result.data;
    }

    public async GetOperationLogsAuthorize(businessId: number) {
        const result = await Http.get<{businessId: number}, number[]>("/business/getOperationLogsAuthorize", {businessId});
        return result.data;
    }

    public async SubmitAuthorize(businessId: number, userIds: number[]) {
        const result = await Http.post<{userIds: number[], businessId: number}, {}>("/business/saveOperationLogsAuthorize", { businessId, userIds });
        message.success("操作记录权限修改成功");
        return result.data;
    }
}