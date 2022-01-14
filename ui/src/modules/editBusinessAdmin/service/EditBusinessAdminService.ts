import { Http } from "../../../common";

export class EditBusinessAdminService {
    public async SearchUsers(searchKey: string) {
        const result = await Http.getWithNoInterceptors<{pageIndex: number, pageSize: number, searchKey: string}, {users: Array<{id: number, username: string}>, total: number}>("/user/getUsers", {pageIndex: 1, pageSize: 100, searchKey});
        return result.data;
    }

    public async SaveBusinessAdmin(values: number[], businessId: number) {
        const result = await Http.post<{values: number[], businessId: number}, {}>("/business/saveBusinessAdmin", {values, businessId});
        return result.data;
    }

    public async GetBusinessAdmin(businessId: number) {
        const result = await Http.get<{businessId: number}, Array<{id: number, username: string}>>("/business/getBusinessAdmin", {businessId});
        return result.data;
    }
}