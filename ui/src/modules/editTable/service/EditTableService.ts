import { Http } from "../../..//common";

export class EditTableService {
    public async EditTable(id: number, isSecret: boolean, businessName: string, templateIds: number[], description: string) {
        const result = await Http.post<{id: number, isSecret: boolean, businessName: string, templateIds: number[], description: string}, {}>("/table/editTable", {id, isSecret, businessName, templateIds, description});
        return result.data
    }

    public async GetAllTemplates() {
        const result = await Http.get<{}, {templates: Array<{id: number, name: string, value: string}>}>("/template/getAllTemplates");
        return result.data;
    }

    public async GetBusinessForAdmin() {
        const result = await Http.get<{}, {items: Array<{id: number, name: string}>}>("/business/getBusinessForAdmin");
        return result.data;
    }
}