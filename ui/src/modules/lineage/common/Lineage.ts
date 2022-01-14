export interface ILineage {
    source: string,
    target: string
}

export enum ViewModel {
    Simple = 1,
    Detailed = 2,
    Tree = 3
}