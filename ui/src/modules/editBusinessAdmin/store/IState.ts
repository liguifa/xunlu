export interface IEditBusinessAdminState {
    searching: boolean
    users: Array<{id: number, username: string}>
    total: number,
    admins: Array<{id: number, username: string}>
}