import { Http } from "../../../common";
import { IOperationItem, OperationType } from "../common/OperationItem";

export class OperationService {
    public async GetOperationLogs(pageIndex: number, searchKey: string, filterType: 0 | OperationType, start: number, end: number) {
        const result = await Http.get<{pageIndex: number, searchKey: string, filterType: 0 | OperationType, start: number, end: number}, {logs: IOperationItem[], total: number}>("/common/getOperationLogs", {pageIndex, searchKey, filterType, start, end});
        return result.data;
    }
}