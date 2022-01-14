export interface IHomeProps extends IHomeStateProps, IHomeDispatchProps {
    
}

export interface IHomeStateProps {
    totals: Array<{type: 1 | 2, total: number}>
    businesses: Array<{name: string, id: number, total: number}>
}

export interface IHomeDispatchProps {
    GetStatisticsInfo: () => void
}