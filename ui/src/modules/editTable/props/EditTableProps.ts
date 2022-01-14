export interface IEditTableProps extends IEditTableStateProps, IEditTableDispatchProps {
    id: number
    name: string
    type: 1 | 2 | ""
    isSecret: boolean
    businessId: string
    businessName: string
    description: string
    onOk: () => void
    buttonText: string
    isAdmin: boolean
}

export interface IEditTableStateProps {
    allBusinesses: Array<{id: number, name: string}>
    visible: boolean
    templates: Array<{id: number, name: string, value: string}>
    templateIds: number[]
}

export interface IEditTableDispatchProps {
    ShowCreateTemplate: () => void
    ShowEditTableWindow: () => void
    HideEditTableWindow: () => void
    EditTable: (id: number, isSecret: boolean, businessName: string, templateIds: number[], description: string) => void
    GetAllTemplates: () => void
    GetBusinessForAdmin: () => void
}