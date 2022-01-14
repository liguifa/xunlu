import { Http } from "../../../common";
import { IViewTemplateResult } from "../common/ViewTemplateResult";

export class ViewTemplateService {
    public async GetTemplates(tableId: number): Promise<IViewTemplateResult> {
        const result = await Http.get<{tableId: number}, IViewTemplateResult>("/template/getTemplates", {tableId});
        return result.data;
    }

    public ExportSQLTemplate(tableId: number): void {
        Http.reload(`/template/exportTemplates?tableId=${tableId}`)
    }
}