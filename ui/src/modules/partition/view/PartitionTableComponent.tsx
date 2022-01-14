import Table, { PaginationConfig } from "antd/lib/table";
import Tag from "antd/lib/tag";
import autobind from "autobind-decorator";
import * as moment from "moment";
import * as React from "react";
import { IPartitionItem } from "../common/PartitionItem";

export class PartitionTableComponent extends React.Component<{ data: IPartitionItem[], pageIndex: number, total: number, onPageIndexChange: (pageIndex: number) => void }> {
    public render(): JSX.Element {
        return (
            <Table<IPartitionItem> dataSource={this.props.data} pagination={{pageSize: 20, current: this.props.pageIndex, total: this.props.total}} onChange={this.OnStateChage} scroll={{ y: document!.documentElement!.clientHeight - 450 }}>
                <Table.Column<IPartitionItem> key="index" width={60} title="#" dataIndex="index" />
                <Table.Column<IPartitionItem> key="new" width={110} dataIndex="readyTime" title="" render={this.RenderNewColumn} />
                <Table.Column<IPartitionItem> key="part" width={400} title="分区信息" dataIndex="part" />
                <Table.Column<IPartitionItem> key="time" title="就绪时间" dataIndex="readyTime" render={this.RenderTimeColumn} />
            </Table>
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

    @autobind
    private OnStateChage(pagination: PaginationConfig) {
        if(pagination.current !== this.props.pageIndex) {
            this.props.onPageIndexChange(pagination.current!)
        }
    }

    @autobind
    private RenderNewColumn(time: number): JSX.Element {
        const isNew: boolean = this.props.pageIndex === 1 && this.props.data.filter(p => p.readyTime > time).length === 0;
        return (
            <div>
                {isNew ? <Tag color="#f50">最新分区</Tag> : ""}
            </div>
        )
    }
}