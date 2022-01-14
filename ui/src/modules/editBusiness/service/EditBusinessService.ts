import { Http } from "../../../common";
import { ITableItem } from "../common/TableItem";

export class EditBusinessService {
    public async SaveBusiness(id: number, name: string, tableIds: number[]) {
        const result = await Http.post<{id: number, name: string, tableIds: number[]}, {}>("/business/editBusiness", {id, name, tableIds});
        return result.isSuccess;
    }

    public async GetBusinessInfo(businessId: number) {
        const result = await Http.get<{businessId: number}, {businessName: string, tables: ITableItem[]}>("/business/getBusinessInfo", {businessId});
        return result.data;
    }
}