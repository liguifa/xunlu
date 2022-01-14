import Tabs from "antd/lib/tabs";
import autobind from "autobind-decorator";
import * as React from "react";
import { IPartitionProps } from "../props/PartitionProp";
import { PartitionChartComponent } from "./PartitionChartComponent";
import { PartitionTableComponent } from "./PartitionTableComponent";

export class PartitionComponent extends React.Component<IPartitionProps> {

    public componentDidMount(): void {
        this.props.GetPartition(this.tableId, 1);
    }

    public render(): JSX.Element {
        return (
            <div>
                <Tabs>
                    <Tabs.TabPane tab="分区列表" key="1">
                        <PartitionTableComponent total={this.props.total} pageIndex={this.props.pageIndex} data={this.props.partitionItems} onPageIndexChange={this.GetPartition} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="就绪时间趋势图" key="2">
                        <PartitionChartComponent data={this.props.partitionItems} />
                    </Tabs.TabPane>
                </Tabs>
            </div>
        )
    }

    @autobind
    private GetPartition(pageIndex: number) {
        this.props.GetPartition(this.tableId, pageIndex)
    }

    private get tableId(): number {
        return parseInt(this.props.match.params.tableId!, 0);
    }
}