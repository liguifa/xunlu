import * as React from "react";
import { Http } from "../../../common";
import "../style/SSOLoginComponent.css";

export class SSOLoginComoonent extends React.Component {
    public componentDidMount(): void {
        Http.reload(`https://ips.zuoyebang.cc/static/cas-fe/?sid=metadata&service=http://${location.host}/api/user/ssoLogin`);
    }

    public render(): JSX.Element {
        return (
            <div className="meta-login">
                <div className="meta-login-message">
                    跳转登录中...
                </div>
            </div>
        )
    }
}