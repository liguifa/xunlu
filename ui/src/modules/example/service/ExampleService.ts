import { Http } from "../../../common";
import { IExampleResult } from "../common/ExampleResult";

export class ExampleService {
    public async GetTableExample(tableId: number) {
        const result = await Http.get<{tableId: number}, IExampleResult>("/table/getTableExample", {tableId})
        return result.data as IExampleResult;
    }

    public async EditFieldDescript(fieldId: string, description: string) {
        const result = await Http.post<{fieldId: string, description: string}, {}>("/field/editFieldDescription", {fieldId, description});
        return result.data;
    }

    public async EditFieldict(fieldId: string, dict: string) {
        const result = await Http.post<{fieldId: string, dict: string}, {}>("/field/editFieldDict", {fieldId, dict});
        return result.data;
    }
}