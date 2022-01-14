import { Http } from "../../../common/http";
import { IBusinessItem } from "../common/BusinessItem";

export class BusinessService {
    public async GetAllBusinesses() {
        const result = await Http.get<{}, {items: IBusinessItem[]}>("/business/getAllBusinesses");
        return result.data;
    }
}