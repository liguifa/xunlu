import Button from "antd/lib/button";
import Divider from "antd/lib/divider";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Modal from "antd/lib/modal";
import Select from "antd/lib/select";
import Table from "antd/lib/table";
import autobind from "autobind-decorator";
import * as React from "react";
import { ICreateUserProps } from "../props/CreateUserProps"
import "../style/CreateUserComponent.css";

export class CreateUserComponent extends React.Component<ICreateUserProps> {
    public static defaultProps: ICreateUserProps = {
        ChangeUser: () => ({}),
        ChangeUsername: () => ({}),
        HideWindow: () => ({}),
        SaveUser: () => ({}),
        ShowWindow: () => ({}),
        isShow: false,
        onOk: () => ({}),
        username: "",
    }

    private mRoleId: number;

    public render(): JSX.Element {
        return (
            <div>
                <Button onClick={this.props.ShowWindow}>添加用户</Button>
                <Modal title="添加用户" visible={this.props.isShow} width="800px" onCancel={this.props.HideWindow} okText="确定" cancelText="取消" okButtonProps={{disabled: !this.props.user}} onOk={this.SaveUser}>
                    <Form>
                        <Form.Item style={{ display: "flex" }} label="用户名" required={true} colon={false}>
                            <p className="meta-create-user-username">
                                <Input onInput={this.OnUsernameChange} type="text" placeholder="用户名" />
                                <Button onClick={this.OnCheckUsername} type="primary" disabled={!this.props.username}>检查</Button>
                            </p>
                        </Form.Item>
                        {
                            this.props.user ? <div>
                                <Divider orientation="left">用户信息</Divider>
                                <Table<{ name: string, value: string }> dataSource={this.GetUserData()} size="small" pagination={false}>
                                    <Table.Column<{ name: string, value: string }> key="name" dataIndex="name" width={100} title="名称" />
                                    <Table.Column<{ name: string, value: string }> key="value" dataIndex="value" title="值" />
                                </Table>
                                <Form.Item style={{ display: "flex", marginTop: "30px" }} label="角色" required={true} colon={false}>
                                    <Select style={{width: 700}} onChange={this.OnRoleChange}>
                                        <Select.Option value={2}>管理员</Select.Option>
                                        <Select.Option value={11}>普通用户</Select.Option>
                                    </Select>
                                </Form.Item>
                            </div> : null
                        }
                    </Form>
                </Modal>
            </div>
        )
    }

    @autobind
    private GetUserData(): Array<{ name: string, value: string }> {
        const userData: Array<{ name: string, value: string }> = [];
        for (const key of Object.keys(this.props.user as object)) {
            userData.push({
                name: this.GetUserInfoDisplayKey(key),
                value: (this.props.user as object)[key]
            })
        }
        return userData;
    }

    private GetUserInfoDisplayKey(key: string) {
        return {
            "displayName": "显示名",
            "email": "邮箱",
            "employeeNumber": "工号",
            "employeeType": "职位",
            "username": "用户名",
        }[key];
    }

    @autobind
    private OnUsernameChange(e: React.ChangeEvent<HTMLInputElement>): void {
        this.props.ChangeUsername(e.currentTarget.value);
    }

    @autobind
    private OnCheckUsername(e: React.MouseEvent<HTMLButtonElement>): void {
        this.props.ChangeUser(this.props.username);
    }

    @autobind
    private SaveUser(): void {
        this.props.SaveUser(this.props.username, this.mRoleId);
        this.props.onOk();
    }

    @autobind
    private OnRoleChange(value: number): void {
        this.mRoleId = value;
    }
}