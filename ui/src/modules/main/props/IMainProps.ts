import { LoadingStatus } from "../store/LoadingStatus";

export interface IMainProps extends IMainStateProps, IMainDispatchProps {
}

export interface IMainStateProps {
    status: LoadingStatus
}

export interface IMainDispatchProps {
    ChangeLoadingStatus?: (status: LoadingStatus) => void
    GetUserInfo?: () => void
}