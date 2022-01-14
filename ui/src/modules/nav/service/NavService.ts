import { Http } from "../../../common";
import { IBusinessItem } from "../common/BusinessItem";

export class NavService {
    public async GetBusinesses(): Promise<IBusinessItem[]> {
        const result = await Http.get<{}, {items: IBusinessItem[]}>("/business/getAllBusinesses");
        return result.data.items;
    }
}