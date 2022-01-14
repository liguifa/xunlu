export interface IBusinessAuthorizeProps extends IBusinessAuthorizeStateProps, IBusinessAuthorizeDispatchProps {
    businessId: number
}

export interface IBusinessAuthorizeStateProps {
    isShow: boolean,
}

export interface IBusinessAuthorizeDispatchProps {
    ShowAuthorizeWindow: () => void,
    HideAuthorizeWindow: () => void
}