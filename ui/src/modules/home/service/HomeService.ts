import { Http } from "../../../common";

export class HomeService {
    public async  GetStatisticsInfo() {
        const result = await Http.get<{}, {
            totals: Array<{type: 1 | 2, total: number}>
            businesses: Array<{name: string, id: number, total: number}>
        }>("/common/getStatisticsInfo");
        return result.data;
    }
}