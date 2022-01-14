import DatePicker from "antd/lib/date-picker";
import Input from "antd/lib/input";
import Radio, { RadioChangeEvent } from "antd/lib/radio";
import Table, { PaginationConfig, SorterResult } from "antd/lib/table";
import Tag from "antd/lib/tag";
import autobind from "autobind-decorator";
import * as moment from 'moment';
import * as React from "react";
import ContentComponent from "../../content";
import { Crumbs } from "../../header";
import { IOperationItem, OperationType } from "../common/OperationItem";
import { IOperationLogsProps } from "../props/OperationLogsProps";
import "../style/OperationLogsComponent.css";

@Crumbs<typeof OperationLogsComponent>([{ icon: "home", url: "/", title: "首页" }, {title: "操作记录"}])
export class OperationLogsComponent extends ContentComponent<IOperationLogsProps> {
    public static defaultProps: IOperationLogsProps = {
        GetOperationLogs: () => ({}),
        end: new Date().getTime(),
        logs: [],
        pageIndex: 1,
        start: new Date().getTime() - 7 * 86400000,
        total: 0,
        type: 0,
    }

    protected title: string = "操作记录";

    private searchKey: string = "";

    public componentDidMount(): void {
        this.props.GetOperationLogs(OperationLogsComponent.defaultProps.pageIndex,"", OperationLogsComponent.defaultProps.type, OperationLogsComponent.defaultProps.start, OperationLogsComponent.defaultProps.end);
    }

    protected RenderBody(): JSX.Element {
        return (
            <div>
                <div className="meta-operation-title">
                    <Radio.Group value={this.props.type} buttonStyle="solid" onChange={this.OnFilterTypeChange}>
                        <Radio.Button value={0}>全部</Radio.Button>
                        <Radio.Button value={OperationType.Insert}>写入</Radio.Button>
                        <Radio.Button value={OperationType.Remove}>删除</Radio.Button>
                        <Radio.Button value={OperationType.Update}>修改</Radio.Button>
                        <Radio.Button value={OperationType.View}>查看</Radio.Button>
                    </Radio.Group>
                    <DatePicker.RangePicker allowClear={false} defaultValue={[moment(this.props.start), moment(this.props.end)]} onChange={this.OnDateRangeChange} />
                    <Input.Search onSearch={this.OnSearchKeyChange} placeholder="搜索操作描述" style={{ width: 300 }} />
                </div>
                <Table<IOperationItem> rowKey="all" dataSource={this.props.logs} pagination={{ pageSize: 20, total: this.props.total, current: this.props.pageIndex }} size="default" scroll={{ y: document!.documentElement!.clientHeight - 410}} onChange={this.ChangeTableState}  >
                    <Table.Column<IOperationItem> key="key" width={60} title="#" dataIndex="index" />
                    <Table.Column<IOperationItem> key="username" width={200} title="用户" dataIndex="username" />
                    <Table.Column<IOperationItem> key="time" align="center" width={250} title="时间" render={this.RenderTimeColumn} dataIndex="time" />
                    <Table.Column<IOperationItem> key="type" align="center" width={180} title="类型" render={this.RenderTypeColumn} dataIndex="type" />
                    <Table.Column<IOperationItem> key="op" title="描述" dataIndex="op" />
                </Table>
            </div>
        )
    }

    protected RenderHeader(): JSX.Element | boolean {
        return false;
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
        switch(type) {
            case OperationType.Insert: return <Tag color="#FF9933">写入</Tag>
            case OperationType.Remove: return <Tag color="#FF0000">删除</Tag>
            case OperationType.Update: return <Tag color="#006633">修改</Tag>
            case OperationType.View:   return <Tag color="#3399FF">查看</Tag>
            default: return <Tag color="3399FF">查看</Tag>
        }
    }

    @autobind
    private ChangeTableState(pagination: PaginationConfig, filters: Record<keyof IOperationItem, string[]>, sorter: SorterResult<IOperationItem>): void {
        this.props.GetOperationLogs!(pagination.current!, this.searchKey, this.props.type, this.props.start, this.props.end);
    }

    @autobind
    private OnSearchKeyChange(value: string): void {
        this.searchKey = value;
        this.props.GetOperationLogs!(1, this.searchKey, this.props.type, this.props.start, this.props.end);
    }

    @autobind
    private OnFilterTypeChange(e: RadioChangeEvent): void {
        this.props.GetOperationLogs!(1, this.searchKey, e.target.value! as number, this.props.start, this.props.end);
    }

    @autobind
    private OnDateRangeChange(dates: [moment.Moment, moment.Moment], dateStrings: [string, string]): void {
        this.props.GetOperationLogs!(1, this.searchKey, this.props.type, dates[0].toDate().getTime(), dates[1].toDate().getTime());
    }
}