import { ICrumb } from "../store/Crumbs";

export interface IHeaderProps extends IHeaderDispatchProps, IHeaderStateProps {
    
}

export interface IHeaderStateProps {
    Crumbs: ICrumb[],
    UserInfo: {
        displayName: string,
        username: string,
        role: number
    },
    isShrink: boolean
}

export interface IHeaderDispatchProps {
    ChangeNavShrinkStatus: (isShrink: boolean) => void
}