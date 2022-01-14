import { EditBusinessAdminService } from "../service/EditBusinessAdminService";
import { EditBusinessAdminActionTypes } from "./ActionTypes";
import { IChangeSearchStatusAction, IGetBusinessAdminAction, ISaveBusinessAdminAction, ISearchUsersAction } from "./IActions";

export const SearchUsersAction: (searchKey: string) => (dispatch: (action: ISearchUsersAction | IChangeSearchStatusAction) => void) => void =  (searchKey: string) => (
    async (dispatch: (action: ISearchUsersAction | IChangeSearchStatusAction) => void) => {
        dispatch({
            searching: true,
            type: EditBusinessAdminActionTypes.CHANGE_SEARCH_STATUS
        });
        const result = await new EditBusinessAdminService().SearchUsers(searchKey);
        dispatch({
            total: result.total,
            type: EditBusinessAdminActionTypes.SEARCH_USERS,
            users: result.users,
        });
    }
)

export const SaveBusinessAdminAction: (businessId: number, values: Array<{id: number, username: string}>) => (dispatch: (action: ISaveBusinessAdminAction) => void) => void = (businessId: number, values: Array<{id: number, username: string}>) => (
    async (dispatch: (action: ISaveBusinessAdminAction) => void) => {
        await new EditBusinessAdminService().SaveBusinessAdmin(values.map(value => value.id), businessId);
        dispatch({
            businessAdmins: values,
            type: EditBusinessAdminActionTypes.CHANGE_BUSINESS_ADMIN
        });
    }
)

export const GetBusinessAdminAction: (businessId: number) => (dispatch: (action: IGetBusinessAdminAction) => void) => void = (businessId: number) => (
    async (dispatch: (action: IGetBusinessAdminAction) => void) => {
        const result = await new EditBusinessAdminService().GetBusinessAdmin(businessId);
        dispatch({
            businessAdmins: result,
            type: EditBusinessAdminActionTypes.GET_BUSINESS_ADMIN
        });
    }
)