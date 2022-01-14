import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import * as React from "react";
import { ILoginProps } from "../props/ILoginProps";

export class LoginComponent extends React.Component<ILoginProps, {}> {
    private username: string | null
    private password: string | null

    constructor(props: ILoginProps, context: {}) {
        super(props, context);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.login = this.login.bind(this);
    }

    public render(): JSX.Element {
        return (
            <div className="pa-login">
                <div className="pa-login-form">
                    <h1>pm2admin</h1>
                    <Form>
                        <Form.Item>
                            <Input type="text" placeholder="账号" onChange={this.onUsernameChange} />
                        </Form.Item>
                        <Form.Item>
                            <Input type="password" placeholder="密码" onChange={this.onPasswordChange} />
                        </Form.Item>
                        <Form.Item>
                            <Button onClick={this.login} type="primary" block={true}>登录</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }

    private login(): void {
        this.props.Login!(this.username as string, this.password as string);
    }

    private onUsernameChange(e: React.ChangeEvent<HTMLInputElement>): void {
        this.username = e.currentTarget.value;
    }

    private onPasswordChange(e: React.ChangeEvent<HTMLInputElement>): void {
        this.password = e.currentTarget.value;
    }
}