import Button from "antd/lib/button";
import Col from "antd/lib/col";
import Input from "antd/lib/input";
import Row from "antd/lib/row";
import Table, { PaginationConfig, SorterResult } from "antd/lib/table";
import Tag from "antd/lib/tag";
import autobind from "autobind-decorator";
import * as React from "react";
import ContentComponent from "../../content";
import CreateUser from "../../createUser";
import EditAuthorize from "../../editAuthorize";
import { Crumbs } from "../../header";
import { IUserItem } from "../common/UserItem";
import { IUserProps } from "../props/UserProps";
import "../style/UserComponent.css";

@Crumbs<typeof UserComponent>([{ icon: "home", url: "/", title: "首页" }, { title: "用户管理"}])
export class UserComponent extends ContentComponent<IUserProps> {
    protected title: string = "用户管理";

    private searchKey: string = "";

    public componentDidMount(): void {
        this.props.GetUsers(1, "");
    }

    protected RenderBody(): JSX.Element {
        return (
            <div>
                <div className="meta-user-search">
                    <Input.Search placeholder="搜索用户名" style={{ width: 300 }} onSearch={this.SearchUsers} />
                </div>
                <Table<IUserItem> rowKey="all" dataSource={this.props.users} pagination={{ current: this.props.pageIndex, pageSize: 20, total: this.props.total }} onChange={this.ChangeTableState} size="default" scroll={{ y: document!.documentElement!.clientHeight - 410 }}>
                    <Table.Column<IUserItem> key="key" width={60} title="#" dataIndex="index" />
                    <Table.Column<IUserItem> key="username" title="用户名" dataIndex="username" />
                    <Table.Column<IUserItem> key="role" width={220} title="角色" align="center" dataIndex="role" />
                    <Table.Column<IUserItem> key="status" width={220} title="状态" align="center" dataIndex="status" render={this.RenderStatusColumn} />
                    <Table.Column<IUserItem> key="action" width={200} dataIndex="id" title="操作" render={this.RenderActionColumn} />
                </Table>
            </div>
        )
    }
    protected RenderHeader(): JSX.Element | undefined {
        return undefined;
    }

    protected RenderTitle(title: string): JSX.Element {
        return (
            <div className="meta-user-title">
                <h1>{title}</h1>
                <CreateUser onOk={this.RefreshUsers} />
                <EditAuthorize onOk={this.RefreshUsers} />
            </div>
        )
    }

    @autobind
    private ChangeTableState(pagination: PaginationConfig, filters: Record<keyof IUserItem, string[]>, sorter: SorterResult<IUserItem>): void {
        this.props.GetUsers!(pagination.current!, this.searchKey);
    }

    @autobind
    private RefreshUsers(): void {
        this.props.GetUsers(1, this.searchKey);
    }

    private RenderStatusColumn(status: number): JSX.Element {
        return (
            <div>
                {
                    status === 1 ? <Tag color="#2db7f5">正常</Tag> : <Tag color="#f50">禁用</Tag>
                }
            </div>
        )
    }

    @autobind
    private SearchUsers(value: string) {
        this.searchKey = value;
        this.RefreshUsers();
    }

    @autobind
    private RenderActionColumn(id: number, user: IUserItem): JSX.Element {
        return (
            <Row align="middle" justify="center">
                <Col span={16}>
                    <Button disabled={this.props.role >= user.roleId} icon="lock" type="primary" value={id} size="small" onClick={this.ShowEditAuthorize}>修改权限</Button>
                </Col>
                <Col span={8}>
                    {
                        // tslint:disable-next-line
                        user.status === 1 ? <Button icon="delete" disabled={this.props.role >= user.roleId} type="danger" size="small" onClick={() => this.props.DisableUser(id)}>禁用</Button> : <Button icon="bulb" disabled={this.props.role >= user.roleId} size="small" onClick={() => this.props.ActiveUser(id)}>激活</Button>
                    }
                </Col>
            </Row>
        )
    }

    @autobind
    private ShowEditAuthorize(e: React.MouseEvent<HTMLButtonElement>) {
        this.props.ShowEditAuthorize(parseInt(e.currentTarget.value, 0))
    }
}