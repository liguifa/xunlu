import Tabs from "antd/lib/tabs";
import * as React from "react";
import { match } from "react-router-dom";
import FieldNullvalueMonitor from "../../fieldNullvalueMonitor";
import NullavalueProportionMonitor from "../../nullvalueProportionMonitor";
import TableNullvalueMonitor from "../../tableNullvalueMonitor";

export class NullvalueMonitorComponent extends React.Component<{ match: match<{ tableId: string }> }> {
    private get tableId(): number {
        return parseInt(this.props.match!.params.tableId!, 0);
    }

    public render(): JSX.Element {
        return (
            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="表空值率" key="1"><TableNullvalueMonitor tableId={this.tableId} /></Tabs.TabPane>
                <Tabs.TabPane tab="字段空值率" key="2"><FieldNullvalueMonitor tableId={this.tableId} /></Tabs.TabPane>
                <Tabs.TabPane tab="空值率比列" key="3"><NullavalueProportionMonitor tableId={this.tableId} /></Tabs.TabPane>
            </Tabs>
        )
    }
}