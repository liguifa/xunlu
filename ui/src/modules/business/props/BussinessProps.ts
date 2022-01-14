import { IBusinessItem } from "../common/BusinessItem"; 

export interface IBusinessProps extends IBusinessStateProps, IBusinessDispatchProps {

}

export interface IBusinessStateProps {
    items: IBusinessItem[]
}

export interface IBusinessDispatchProps {
    GetAllBusinesses: () => void; 
    ShowEditBusiness: (id: number) => void
}