export interface IEditTableState {
    businesses: Array<{id: number, name: string}>
    visible: boolean
    templates: Array<{id: number, name: string, value: string}>
}