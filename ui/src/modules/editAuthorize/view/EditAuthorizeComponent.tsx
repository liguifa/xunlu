import Divider from "antd/lib/divider";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Modal from "antd/lib/modal";
import Select from "antd/lib/select";
import Table from "antd/lib/table";
import Tooltip from "antd/lib/tooltip";
import autobind from "autobind-decorator";
import * as React from "react";
import { ITableItem } from "../common/ITableItem";
import { IEditAuthorizeProps } from "../props/EditAuthorizeProps";
import "../style/EditAuthorizeComponent.css";

export class EditAuthorizeComponent extends React.Component<IEditAuthorizeProps> {
    public static defaultProps: IEditAuthorizeProps = {
        ChangeActives: () => ({}),
        EditAuthorize: () => ({}),
        GetAllSecretTables: () => ({}),
        GetUserAuthorize: () => ({}),
        HideWindow: () => ({}),
        actives: [],
        isShow: false,
        onOk: () => ({}),
        roleId: 11,
        tables: [],
        total: 0,
        userId: 0,
        username: "",
    }

    private currentRoleId: number;

    public componentDidMount(): void {
        this.props.GetAllSecretTables();
    }

    public render() {
        return (
            <Modal title="修改权限" visible={this.props.isShow} width="800px" onCancel={this.props.HideWindow} okText="确定" cancelText="取消" onOk={this.OnEditAuthorize}>
                <Form>
                    <Form.Item style={{ display: "flex" }} label="账号" required={true} colon={false}>
                        <Input defaultValue={this.props.username} type="text" disabled={true} style={{ width: 680 }} />
                    </Form.Item>
                    <Form.Item style={{ display: "flex" }} label="角色" required={true} colon={false}>
                        <Select defaultValue={this.props.roleId} style={{ width: 680 }} onChange={this.ChangeRoleId}>
                            <Select.Option value={2}>管理员</Select.Option>
                            <Select.Option value={11}>普通用户</Select.Option>
                        </Select>
                    </Form.Item>
                    <Divider orientation="left">数据表</Divider>
                    <Table<ITableItem> rowSelection={{ selectedRowKeys: this.props.actives, onChange: this.props.ChangeActives }} dataSource={this.props.tables} pagination={false} size="small" scroll={{ y: 350 }}>
                        <Table.Column<ITableItem> key="name" title="名称" width={230} dataIndex="name" render={this.RenderNameColumn} />
                        <Table.Column<ITableItem> key="description" title="描述" dataIndex="description" render={this.RenderDscriptionColumn} />
                    </Table>
                </Form>
            </Modal>
        )
    }

    @autobind
    private ChangeRoleId(value: number): void {
        this.currentRoleId = value;
    }

    private RenderNameColumn(name: string): JSX.Element {
        return (
            <div className="meta-edit-authorize-name">
                <Tooltip placement="topLeft" title={name}>
                    {name}
                </Tooltip>
            </div>
        )
    }

    private RenderDscriptionColumn(description: string): JSX.Element {
        return (
            <Tooltip placement="topLeft" title={description}>
                <p className="meta-edit-authorize-description">{description}</p>
            </Tooltip>
        )
    }

    @autobind
    private OnEditAuthorize(): void {
        this.props.EditAuthorize(this.props.userId, this.currentRoleId ? this.currentRoleId : this.props.roleId, this.props.actives);
        this.props.onOk();
    }
}