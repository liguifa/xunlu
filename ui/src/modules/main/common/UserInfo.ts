import { AccessTypes, ResourceTypes } from "../../common/CommonEnum";

export type UserAceess = Array<{resourceType: ResourceTypes, accessType: AccessTypes, resourceId: number}>;

export interface IUserInfo {
    username: string,
    displayName: string,
    role: number,
    access: UserAceess
}