/* tslint:disable */
declare module '@antv/g6' {
    const registerNode: (name: string, data: object) => void
    const registerEdge: (name: string, data: object, baseType?: string) => void
    class Tree {
        constructor(data: object)
        public read<T>(data: T): void
        public node<T>(data: T): void
        public edge<T>(data: T): void
    }
    class Graph {
        constructor(data: object)
        public read<T>(data: T): void
        public node<T>(data: T): void
        public edge<T>(data: T): void
    }
    const Util: {
        getRectPath: (left: number, top: number, right: number, bottom: number, padding: number) => object,
        createDOM: (data: string) => HTMLElement,
        pointsToPolygon: (data: object) => void
    }
    const Plugins: Plugin[]
    type Plugin = () => void
    module Layouts {
        class Dendrogram {
            constructor(data: object)
        }
        class CompactBoxTree {
            constructor(data: object)
        }
    }
}