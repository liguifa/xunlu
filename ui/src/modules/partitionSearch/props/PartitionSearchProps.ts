export interface IPartitionSearchProps extends IPartitionSearchStateProps, IPartitionSearchDispatchProps {

}

export interface IPartitionSearchStateProps {
    searchResult: { [key: string]: string }
}

export interface IPartitionSearchDispatchProps {
    Search: (keys: string[]) => void
}