import "antd/dist/antd.css";
import { createBrowserHistory } from "history";
import * as Cookie from "js-cookie";
import * as React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import _401 from "../../../_error/_401";
import _404 from "../../../_error/_404";
import { Http } from '../../../common';
import Login from '../../../modules/ssoLogin';
import Business from "../../business";
import Header from "../../header";
import Home from "../../home";
import Nav from "../../nav";
import OperationLogs from "../../operationLogs";
import PartitionSearch from "../../partitionSearch";
import Secret from "../../secret";
import Table from "../../table";
import Tables from "../../tables";
import Template from "../../template";
import User from "../../user";
import { IMainProps } from "../props/IMainProps";
import { LoadingStatus } from '../store/LoadingStatus';
import "../style/MainComponent.css";

export class MainComponent extends React.Component<IMainProps> {
    public componentWillMount() {
        createBrowserHistory().listen(this.LoginVerification);
        this.CheckLogingRedirect();
        this.LoginVerification(location);
        Http.interceptors(this.props.ChangeLoadingStatus!);
        if (Cookie.get("metadata-session-id")) {
            this.props.GetUserInfo!();
        }
    }

    public render(): JSX.Element {
        return (
            <Router>
                <div className="pa-main">
                    <div className="meta-main-nav">
                        <Nav mode="inline" showLogo={true} />
                    </div>
                    <div className="pa-main-right">
                        <Header />
                        <div className="pa-main-right-body">
                            <Switch>
                                <Route path="/login" component={Login} />
                                <Route path="/" exact={true} component={Home} key="/home" />
                                <Route path="/tables/:businessId" component={Tables} key="/tables/:businessId" />
                                <Route path="/table/:tableId/:view" component={Table} key="/table/:tableId/:view" />
                                <Route path="/business" component={Business} key="/business" />
                                <Route path="/user" component={User} key="/user" />
                                <Route path="/secret" component={Secret} key="/secret" />
                                <Route path="/operation" component={OperationLogs} key="OperationLogs" />
                                <Route path="/template" component={Template} key="template" />
                                <Route path="/partition/search" component={PartitionSearch} key="/partition/search" />
                                <Route path="/401" component={_401} />
                                <Route path="*" exact={true} component={_404} key="404" />
                            </Switch>
                        </div>
                    </div>
                    {this.props.status === LoadingStatus.LOADING ? <div className="meta-main-loading">
                        <svg className="meta-main-loading-svg" width="16px" height="16px" viewBox="0 0 100 100" >
                            <g transform="translate(50,50)">
                                <circle cx="0" cy="0" r="8.333333333333334" fill="none" stroke="#e90c59" strokeWidth="2" strokeDasharray="26.179938779914945 26.179938779914945" transform="rotate(260.656)">
                                    <animateTransform attributeName="transform" type="rotate" values="0 0 0;360 0 0" dur="1s" calcMode="spline" keySplines="0.2 0 0.8 1" begin="0" repeatCount="indefinite" />
                                </circle>
                                <circle cx="0" cy="0" r="16.666666666666668" fill="none" stroke="#fe718d" strokeWidth="2" strokeDasharray="52.35987755982989 52.35987755982989" transform="rotate(336.769)">
                                    <animateTransform attributeName="transform" type="rotate" values="0 0 0;360 0 0" dur="1s" calcMode="spline" keySplines="0.2 0 0.8 1" begin="-0.2" repeatCount="indefinite" />
                                </circle>
                                <circle cx="0" cy="0" r="25" fill="none" stroke="#ffe6f5" strokeWidth="2" strokeDasharray="78.53981633974483 78.53981633974483" transform="rotate(13.1544)">
                                    <animateTransform attributeName="transform" type="rotate" values="0 0 0;360 0 0" dur="1s" calcMode="spline" keySplines="0.2 0 0.8 1" begin="-0.4" repeatCount="indefinite" />
                                </circle>
                                <circle cx="0" cy="0" r="33.333333333333336" fill="none" stroke="#c2dfd7" strokeWidth="2" strokeDasharray="104.71975511965978 104.71975511965978" transform="rotate(84.6423)">
                                    <animateTransform attributeName="transform" type="rotate" values="0 0 0;360 0 0" dur="1s" calcMode="spline" keySplines="0.2 0 0.8 1" begin="-0.6" repeatCount="indefinite" />
                                </circle>
                                <circle cx="0" cy="0" r="41.666666666666664" fill="none" stroke="#46dff0" strokeWidth="2" strokeDasharray="130.89969389957471 130.89969389957471" transform="rotate(170.555)">
                                    <animateTransform attributeName="transform" type="rotate" values="0 0 0;360 0 0" dur="1s" calcMode="spline" keySplines="0.2 0 0.8 1" begin="-0.8" repeatCount="indefinite" />
                                </circle>
                            </g>
                        </svg>
                        <span>玩命加载中</span>
                    </div> : null}
                </div>
            </Router>
        );
    }

    private LoginVerification(location: { pathname: string, search: string, hash: string }) {
        const url = `${location.pathname}${location.search}${location.hash}`;
        if (url !== "#/login") {
            if (!Cookie.get("metadata-session-id")) {
                sessionStorage.setItem("reload", location.hash);
                createBrowserHistory().push("/#/login");
            }
        }
    }

    private CheckLogingRedirect() {
        const reload = sessionStorage.getItem("reload");
        if (reload) {
            sessionStorage.removeItem("reload");
            if (reload !== location.hash) {
                createBrowserHistory().push(`/${reload}`);
            }
        }
    }
}
