export interface IHomeState {
    totals: Array<{type: 1 | 2, total: number}>
    businesses: Array<{name: string, id: number, total: number}>
}