import { Http } from "../../../common";

export class CreateBusinessService {
    public async SaveBusiness(name: string, tableIds: number[]) {
        const result = await Http.post<{name: string, tableIds: number[]}, {}>("/business/saveBusiness", {name, tableIds});
        return result.isSuccess;
    }
}