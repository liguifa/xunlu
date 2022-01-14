declare module '@antv/data-set' {
    export default class DataSe {
        public createView: () => { 
                source: (data: object) => {
                    transform: (data: {
                        fields: string[],
                        key: string,
                        type: string,
                        value: string
                    }) => void
                }
            }
    }
}