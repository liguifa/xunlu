import { Http } from "../../../common/http";
import { IFieldItem } from "../common/FieldItem";

export class FieldsService {
    public async GetFields(tableId: number) {
        const result = await Http.get<{tableId: number}, {items: IFieldItem[]}>("/field/getFields", {tableId});
        return result.data;
    }

    public async EditFieldDescript(fieldId: string, description: string) {
        const result = await Http.post<{fieldId: string, description: string}, {}>("/field/editFieldDescription", {fieldId, description});
        return result.data;
    }

    public async EditFieldict(fieldId: string, dict: string) {
        const result = await Http.post<{fieldId: string, dict: string}, {}>("/field/editFieldDict", {fieldId, dict});
        return result.data;
    }

    public async  ChangeLockStatus(fieldId: string, isLock: boolean) {
        const result = await Http.post<{fieldId: string, isLock: boolean}, {}>("/field/changeLockStatus", {fieldId, isLock});
        return result.data;
    }
}