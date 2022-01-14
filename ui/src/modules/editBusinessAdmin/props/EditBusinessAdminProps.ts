export interface IEditBusinessAdminProps extends IEditBusinessAdminDispatchProps, IEditBusinessAdminStateProps {
    businessId: number,
    businessName: string
}

export interface IEditBusinessAdminStateProps {
    searching: boolean
    users: Array<{id: number, username: string}>
    total: number
    admins: Array<{id: number, username: string}>
}

export interface IEditBusinessAdminDispatchProps {
    SearchUsers: (searchKey: string) => void
    SaveBusinessAdmin: (businessId: number, values: Array<{id: number, username: string}>) => void
    GetBusinessAdmin: (businessId: number) => void
}