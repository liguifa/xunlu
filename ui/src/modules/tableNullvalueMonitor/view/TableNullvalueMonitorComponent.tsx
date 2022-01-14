import DatePicker from "antd/lib/date-picker";
import Empty from "antd/lib/empty";
import Radio, { RadioChangeEvent } from "antd/lib/radio";
import autobind from "autobind-decorator";
import { Axis, Chart, Geom, Legend, Tooltip } from "bizcharts";
import * as moment from 'moment';
import * as React from "react";
import { ViewModel } from "../common/ViewModel";
import { ITableNllvalueMonitorProps } from "../props/TableNullvalueMonitorProps";
import "../style/TableNullvalueMonitorComponent.css";

export class TableNullvalueMonitorComponent extends React.Component<ITableNllvalueMonitorProps> {
    public static defaultProps: ITableNllvalueMonitorProps = {
        GetTableNullvalues: () => ({}),
        end: new Date().getTime(),
        model: ViewModel.Day,
        nullvalues: [],
        start: new Date().getTime() - 7 * 86400000,
        tableId: 0
    }

    public componentDidMount(): void {
        this.props.GetTableNullvalues(this.props.tableId, TableNullvalueMonitorComponent.defaultProps.start, TableNullvalueMonitorComponent.defaultProps.end, TableNullvalueMonitorComponent.defaultProps.model);
    }

    public render(): JSX.Element {
        return (
            <div>
                <div className="meta-tablenullvalue-title">
                    <h3>表空值率变化趋势图</h3>
                    <DatePicker.RangePicker allowClear={false} defaultValue={[moment(this.props.start), moment(this.props.end)]} onChange={this.OnDateRangeChange} />
                    <Radio.Group value={this.props.model} buttonStyle="solid" onChange={this.OnViewModelChange}>
                        <Radio.Button value={1}>日视图</Radio.Button>
                        <Radio.Button value={2}>月视图</Radio.Button>
                    </Radio.Group>
                </div>
                {
                    this.props.nullvalues.length > 0 ?
                        <Chart height={document.body.clientHeight - 350} forceFit={true} data={this.props.nullvalues}>
                            <Legend custom={true} allowAllCanceled={true} items={this.Legend} />
                            <Axis name="total" label={{ formatter: this.FormatterNumberToDisplay }} />
                            <Tooltip />
                            <Geom type="line" tooltip={['time*total', (time, total) => ({ name: "空值率", title: "", value: `${parseFloat(total).toFixed(2)}%` })]} position="time*total" color="#fdae6b" size={3} shape="smooth" />
                            <Geom type="point" tooltip={['time*total', (time, total) => ({ name: "空值率", title: "", value: `${parseFloat(total).toFixed(2)}%` })]} position="time*total" color="#fdae6b" size={3} shape="circle" />
                        </Chart>
                        : <Empty>没有任何空值率数据</Empty>
                }
            </div>
        )
    }

    @autobind
    private OnViewModelChange(e: RadioChangeEvent): void {
        this.props.GetTableNullvalues(this.props.tableId, this.props.start, this.props.end, e.target.value! as number);
    }

    @autobind
    private OnDateRangeChange(dates: [moment.Moment, moment.Moment], dateStrings: [string, string]): void {
        this.props.GetTableNullvalues(this.props.tableId, dates[0].toDate().getTime(), dates[1].toDate().getTime(), this.props.model);
    }

    private FormatterNumberToDisplay(value: string): string {
        return `${parseFloat(value).toFixed(2)}%`;
    }

    private get Legend() {
        return [{
            marker: {
                lineWidth: 3,
                radius: 5,
                stroke: "#ffae6b",
                symbol: "hyphen",
            },
            value: "空值率",
        }
        ]
    }
}