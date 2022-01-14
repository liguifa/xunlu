import { Http } from "../../../common/http";
import { ITemplate } from "../common/TemplateItem";

export class TemplateService {
    public async GetTemplates(pageIndex: number, searchKey: string) {
        const result = await Http.get<{pageIndex: number, searchKey: string}, {templates: ITemplate[], total: number}>("/template/getTemplatesForPage", { pageIndex, searchKey });
        return result.data;
    }

    public async RemoveTemplate(templateId: number) {
        const result = await Http.post<{templateId: number}, {}>("/template/deleteTemplate", { templateId });
        return result.data;
    }
}