import Button from "antd/lib/button";
import Checkbox, { CheckboxChangeEvent } from "antd/lib/checkbox";
import DatePicker from "antd/lib/date-picker";
import Input from "antd/lib/input";
import Modal from "antd/lib/modal";
import Table, { PaginationConfig, SorterResult } from "antd/lib/table";
import Tag from "antd/lib/tag";
import Tooltip from "antd/lib/tooltip";
import autobind from "autobind-decorator";
import * as moment from "moment";
import * as React from "react";
import { IOperationItem, OperationType } from "../common/OperationItem";
import { IBusinessOperationLogsProps } from "../props/BusinessOperationLogsProps";

export class BusinessOperationLogsComponent extends React.Component<IBusinessOperationLogsProps> {
    public static defaultProps: IBusinessOperationLogsProps = {
        GetBusinessOperationLogs: () => ({}),
        HideBusinessOperationLogsWindow: () => ({}),
        ShowBusinessOperationLogsWindow: () => ({}),
        businessId: 0,
        end: new Date().getTime(),
        isIncludeView: false,
        isShow: false,
        logs: [],
        pageIndex: 1,
        start: new Date().getTime() - 7 * 86400000,
        total: 0,
    }

    private searchKey: string = "";

    public componentDidMount(): void {
        this.props.GetBusinessOperationLogs(this.props.businessId, 1, "", false, BusinessOperationLogsComponent.defaultProps.start, BusinessOperationLogsComponent.defaultProps.end);
    }

    public render(): JSX.Element {
        return (
            <span>
                <Button icon="clock-circle" onClick={this.props.ShowBusinessOperationLogsWindow}>操作记录</Button>
                <Modal visible={this.props.isShow} title="操作记录" width={1000} footer={false} onCancel={this.props.HideBusinessOperationLogsWindow}>
                    <div className="meta-operation-title">
                        <Checkbox value={this.props.isIncludeView} onChange={this.ChangeIsIncludeView}>包括查看记录</Checkbox>
                        <DatePicker.RangePicker allowClear={false} defaultValue={[moment(this.props.start), moment(this.props.end)]} onChange={this.OnDateRangeChange} />
                        <Input.Search onSearch={this.OnSearchKeyChange} placeholder="搜索操作描述" style={{ width: 300 }} />
                    </div>
                    <Table<IOperationItem> rowKey="all" dataSource={this.props.logs} pagination={{ pageSize: 20, total: this.props.total, current: this.props.pageIndex }} size="default" scroll={{ y: 500 }} onChange={this.ChangeTableState}  >
                        <Table.Column<IOperationItem> key="key" width={60} title="#" dataIndex="index" />
                        <Table.Column<IOperationItem> key="username" width={120} title="用户" dataIndex="username" />
                        <Table.Column<IOperationItem> key="time" align="center" width={180} title="时间" render={this.RenderTimeColumn} dataIndex="time" />
                        <Table.Column<IOperationItem> key="type" align="center" width={80} title="类型" render={this.RenderTypeColumn} dataIndex="type" />
                        <Table.Column<IOperationItem> key="op" title="描述" dataIndex="op" render={this.RenderDscriptionColumn} />
                    </Table>
                </Modal>
            </span>
        )
    }

    @autobind
    private ChangeIsIncludeView(e: CheckboxChangeEvent): void {
        this.props.GetBusinessOperationLogs!(this.props.businessId, 1, this.searchKey, e.target.checked, this.props.start, this.props.end);
    }

    @autobind
    private ChangeTableState(pagination: PaginationConfig, filters: Record<keyof IOperationItem, string[]>, sorter: SorterResult<IOperationItem>): void {
        this.props.GetBusinessOperationLogs!(this.props.businessId, pagination.current!, this.searchKey, this.props.isIncludeView, this.props.start, this.props.end);
    }

    @autobind
    private OnSearchKeyChange(value: string): void {
        this.searchKey = value;
        this.props.GetBusinessOperationLogs!(this.props.businessId, 1, this.searchKey, this.props.isIncludeView, this.props.start, this.props.end);
    }

    @autobind
    private OnDateRangeChange(dates: [moment.Moment, moment.Moment], dateStrings: [string, string]): void {
        this.props.GetBusinessOperationLogs!(this.props.businessId, 1, this.searchKey, this.props.isIncludeView, dates[0].toDate().getTime(), dates[1].toDate().getTime());
    }

    @autobind
    private RenderDscriptionColumn(description: string, row: IOperationItem): JSX.Element {
        return (
            <Tooltip placement="bottomLeft" title={description}>
                <div style={{ maxWidth: 450, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                    {description}
                </div>
            </Tooltip>
        )
    }

    private RenderTimeColumn(time: number): JSX.Element {
        const displayTime = moment(time * 1000).format('YYYY/MM/DD HH:mm:ss')
        return (
            <div>
                {displayTime}
            </div>
        )
    }

    private RenderTypeColumn(type: number): JSX.Element {
        switch (type) {
            case OperationType.Insert: return <Tag color="#FF9933">写入</Tag>
            case OperationType.Remove: return <Tag color="#FF0000">删除</Tag>
            case OperationType.Update: return <Tag color="#006633">修改</Tag>
            case OperationType.View: return <Tag color="#3399FF">查看</Tag>
            default: return <Tag color="3399FF">查看</Tag>
        }
    }
}