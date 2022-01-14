import { Http } from "../../../common";

export class CreateTemplateService {
    public async CreateTemplate(tableId: number, name: string, value: string) {
        const result = await Http.post<{tableId: number, name: string, value: string}, {}>("/template/createTemplate", {tableId, name, value});
        return result.data;
    }

    public async UpdateTemplate(templateId: number, name: string, value: string) {
        const result = await Http.post<{templateId: number, name: string, value: string}, {}>("/template/updateTemplate", {templateId, name, value});
        return result.data;
    }
}