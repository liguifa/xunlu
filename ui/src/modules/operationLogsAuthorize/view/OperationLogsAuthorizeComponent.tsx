import Button from "antd/lib/button";
import Input from "antd/lib/input";
import Table, { PaginationConfig, SorterResult } from "antd/lib/table";
import autobind from "autobind-decorator";
import * as React from "react";
import { IUserItem } from "../common/UserItem";
import { IOperationLogsAuthorizeProps } from "../props/OperationLogsAuthorizeProps";
import "../style/OperationLogsauthorizeComponent.css";

export class OperationLogsAuthorizeComponent extends React.Component<IOperationLogsAuthorizeProps> {
    public static defaultProps: IOperationLogsAuthorizeProps = {
        ChangeActives: () => ({}),
        GetOperationLogsAuthorize: () => ({}),
        GetUsers: () => ({}),
        SumitAuthorize: () => ({}),
        activeIds: [],
        authorizeUserIds: [],
        businessId: 0,
        pageIndex: 1,
        total: 0,
        users: [],
    }

    private searchKey: string = "";

    public componentDidMount(): void {
        this.props.GetUsers(1, "");
        this.props.GetOperationLogsAuthorize(this.props.businessId);
    }

    public render(): JSX.Element {
        return (
            <div className="meta-business-operations-authorize">
                {
                    // tslint:disable-next-line
                    <Input.Search style={{ width: 300, marginBottom: 10 }} onSearch={value => { this.searchKey = value; this.props.GetUsers(this.props.pageIndex, value)}} />
                }
                {
                    // tslint:disable-next-line 
                    <Table<IUserItem> rowKey="oparationauthorize" rowSelection={{ onChange: this.OnRowSelection, selectedRowKeys: this.GetSelectKeys() }} dataSource={this.props.users} pagination={{ current: this.props.pageIndex, pageSize: 20, total: this.props.total }} onChange={this.ChangeTableState} scroll={{ y: 420 }} footer={() => `共${this.props.authorizeUserIds.length}人有查看权限,当前选中${this.props.activeIds.length}人`}>
                        <Table.Column<IUserItem> key="username" title="用户名" dataIndex="username" />
                    </Table>
                }
                <div className="meta-business-operation-authorize-btns">
                    {/* <Button disabled={this.props.activeIds.length === 0} style={{ marginRight: 10 }}>取消</Button> */}
                    <Button disabled={this.props.activeIds.length === 0} type="primary" onClick={this.SubmitAuthorize}>确定</Button>
                </div>
            </div>
        )
    }

    @autobind
    private ChangeTableState(pagination: PaginationConfig, filters: Record<keyof IUserItem, string[]>, sorter: SorterResult<IUserItem>): void {
        this.props.GetUsers(pagination.current!, this.searchKey);
    }

    @autobind
    private SubmitAuthorize(): void {
        this.props.SumitAuthorize(this.props.businessId, this.props.activeIds);
    }

    @autobind
    private OnRowSelection(selectedRowKeys: string[], selectedRows: IUserItem[]): void {
        let activeIds = this.props.activeIds.filter(activeId => selectedRows.filter(row => row.id === activeId).length === 0);
        activeIds = activeIds.concat(selectedRows.map(row => row.id));
        this.props.ChangeActives(activeIds);
    }

    @autobind
    private GetSelectKeys(): number[] {
        return this.props.users.map((user, index) => ({ ...user, index })).filter(user => this.props.activeIds.filter(id => id === user.id).length > 0).map(user => user.index);
    }
}