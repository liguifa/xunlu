import { Http } from "../../../common";
import { IOperationItem } from "../common/OperationItem";

export class BusinessOperationService {
    public async GetBusinessOperationLogs(businessId: number, pageIndex: number, searchKey: string, isIncludeView: boolean, start: number, end: number) {
        const result = await Http.get<{businessId: number, pageIndex: number, searchKey: string, isIncludeView: boolean, start: number, end: number}, {logs: IOperationItem[], total: number}>("/common/getBusinessOperationLogs", {businessId, pageIndex, searchKey, isIncludeView, start, end});
        return result.data;
    }
}