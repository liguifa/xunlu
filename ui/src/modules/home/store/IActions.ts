import { IAction } from "../../../store";

export interface IGetStatisticsInfoAction extends IAction {
    totals: Array<{type: 1 | 2, total: number}>
    businesses: Array<{name: string, id: number, total: number}>
}