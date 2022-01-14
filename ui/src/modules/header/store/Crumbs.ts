import * as React from "react";
import { connect } from "react-redux";
import { IState } from "../../../store";
import { IAction } from "../../../store";
import { HeaderActionTypes } from "./ActionTypes";
import { IChangeCrumbsAction } from "./IActions";

export interface ICrumb {
    icon?: string,
    url?: string,
    title?: string,
    key?: number
}

export function Crumbs<T extends typeof React.Component>(crumbs: ICrumb[]): (Component: T) => T {
    const checkDependent = (cbs: ICrumb[], component: React.Component<{ ChangeCrumbs: (crumbs: ICrumb[]) => void }>) => {
        return crumbs.filter(c => {
            let dependents: string[] = [];
            if (c.title) {
                const titleDependents = c.title!.match!(/{{(.*?)}}/g); // match(/(?<={{).*?(?=}})/g);
                if (titleDependents) {
                    dependents = dependents.concat(titleDependents.map(t => t.replace("{{", "").replace("}}", "")))
                }
            }
            if (c.url) {
                const urlDependents = c.url!.match!(/{{(.*?)}}/g) // match(/(?<={{).*?(?=}})/g);
                if (urlDependents) {
                    dependents = dependents.concat(urlDependents.map(t => t.replace("{{", "").replace("}}", "")))
                }
            }
            return dependents.filter(d => component[d] === undefined).length > 0
        }).length === 0;
    }
    let isComplete: boolean = false;
    let crumbsHash: string = location.hash;
    let title: string = "";
    return (Component: T) => {
        const updateCrumbs = (component: {title: string} | React.Component<{ ChangeCrumbs: (crumbs: ICrumb[]) => void }>) => {
            if (crumbsHash !== location.hash || title !== (component as {title: string}).title) {
                isComplete = false;
                crumbsHash = location.hash;
                title = (component as {title: string}).title;
            }
            if ((!isComplete) && checkDependent(crumbs, component as React.Component<{ ChangeCrumbs: (crumbs: ICrumb[]) => void }>)) {
                const newCrumbs = crumbs.map(crumb => ({ ...crumb, title: crumb.title!.replace(/{{(.*?)}}/g, (match, p) => component[p] ? component[p] : ""), url: crumb.url ? (crumb.url!.replace(/{{(.*?)}}/g, (match, p) => component[p] ? component[p] : "")) : undefined }));
                (component as React.Component<{ ChangeCrumbs: (crumbs: ICrumb[]) => void }>).props.ChangeCrumbs(newCrumbs);
                isComplete = true;
            }
        }
        const componentDidUpdate = Component.prototype.componentDidUpdate;
        Component.prototype.componentDidUpdate = function () {
            if (componentDidUpdate) {
                (componentDidUpdate.bind(this))();
            }
            updateCrumbs(this);
        }
        return Component;
    }
}

type trunkDispatch = (a: (action: IAction) => void) => void;

export function WrapWithCrumbsConnect<TStateProps, TDsipatchProps, TAction extends IAction>(mapStateToProps?: ((state: IState) => TStateProps), mapDispatchToProps?: (dispatch: (action: trunkDispatch | IAction) => void) => TDsipatchProps) {
    const wrapMapDispatchToProps = (dispatch: ((action: IAction) => void) | ((d: (a: (action: IAction) => void) => void) => void)) => {
        const props = (mapDispatchToProps ? mapDispatchToProps(dispatch as (d: (a: (action: TAction) => void) => void) => void) : {}) as { ChangeCrumbs: (crumbs: ICrumb[]) => void };
        props.ChangeCrumbs = (crumbs: ICrumb[]) => (dispatch as ((action: IChangeCrumbsAction) => void))({
            Crumbs: crumbs,
            type: HeaderActionTypes.CHNAGE_CRUMBS,
        });
        return props;
    }
    return connect(mapStateToProps, wrapMapDispatchToProps)
}