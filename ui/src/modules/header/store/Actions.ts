import { HeaderActionTypes } from "./ActionTypes";
import { IChangeNavStatusAction } from "./IActions";

export const ChangeNavStatusAction: (isShrink: boolean) => IChangeNavStatusAction = (isShrink: boolean) => ({
    isShrink,
    type: HeaderActionTypes.CHANGE_NAV_STATUS
})