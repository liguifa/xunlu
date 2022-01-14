import DatePicker from "antd/lib/date-picker";
import Empty from "antd/lib/empty";
import Radio, { RadioChangeEvent } from "antd/lib/radio";
import autobind from "autobind-decorator";
import { Axis, Chart, Geom, Legend, Tooltip } from "bizcharts";
import * as moment from 'moment';
import * as React from "react";
import { ViewModel } from "../common/ViewModel";
import { IRownumMonitorProps } from "../props/RownumMonitorProps";
import "../style/RownumMonitorComponent.css";

export class RownumMonitorComponent extends React.Component<IRownumMonitorProps> {
    public static defaultProps: IRownumMonitorProps = {
        GetTableRownums: () => ({}),
        end: new Date().getTime(),
        model: ViewModel.Day,
        rownums: [],
        start: new Date().getTime() - 7 * 86400000,
    }

    private get tableId(): number {
        return parseInt(this.props.match!.params.tableId!, 0);
    }

    public componentDidMount(): void {
        this.props.GetTableRownums(this.tableId, RownumMonitorComponent.defaultProps.start, RownumMonitorComponent.defaultProps.end, RownumMonitorComponent.defaultProps.model);
    }

    public render(): JSX.Element {
        return (
            <div>
                <div className="meta-rownum-title">
                    <h3>表数据行数变化趋势图</h3>
                    <DatePicker.RangePicker allowClear={false} defaultValue={[moment(this.props.start), moment(this.props.end)]} onChange={this.OnDateRangeChange} />
                    <Radio.Group value={this.props.model} buttonStyle="solid" onChange={this.OnViewModelChange}>
                        <Radio.Button value={1}>日视图</Radio.Button>
                        <Radio.Button value={2}>月视图</Radio.Button>
                    </Radio.Group>
                </div>
                {
                    this.props.rownums.length > 0 ?
                        <Chart height={document.body.clientHeight - 320} forceFit={true} data={this.props.rownums}>
                            <Legend custom={true} allowAllCanceled={true} items={this.Legend} />
                            <Axis name="total" label={{ formatter: this.FormatterNumberToDisplay }} />
                            <Axis name="increment" label={{ formatter: this.FormatterNumberToDisplay, offset: 0 }} />
                            <Tooltip />
                            <Geom type="interval" tooltip={['time*total', (time, total) => ({ name: "总行数", title: time, value: total.toLocaleString() })]} position="time*total" color="#3182bd" />
                            <Geom type="line" tooltip={['time*increment', (time, increment) => ({ name: "增量", title: time, value: increment.toLocaleString() })]} position="time*increment" color="#fdae6b" size={3} shape="smooth" />
                            <Geom type="point" tooltip={['time*increment', (time, increment) => ({ name: "增量", title: time, value: increment.toLocaleString() })]} position="time*increment" color="#fdae6b" size={3} shape="circle" />
                        </Chart>
                        : <Empty>没有任何表行数数据</Empty>
                }
            </div>
        )
    }

    @autobind
    private OnViewModelChange(e: RadioChangeEvent): void {
        this.props.GetTableRownums(this.tableId, this.props.start, this.props.end, e.target.value! as number);
    }

    @autobind
    private OnDateRangeChange(dates: [moment.Moment, moment.Moment], dateStrings: [string, string]): void {
        this.props.GetTableRownums(this.tableId, dates[0].toDate().getTime(), dates[1].toDate().getTime(), this.props.model);
    }

    private FormatterNumberToDisplay(value: string): string {
        const num = parseInt(value, 0);
        const displayMap = {
            1000000000000: "兆",
            100000000000: "千亿",
            10000000000: "百亿",
            1000000000: "十亿",
            100000000: "亿",
            10000000: "千万",
            1000000: "百万",
            100000: "十万",
            10000: "万",
            1000: "千",
            100: "百"
        }
        for (const key of Object.keys(displayMap).sort((x, y) => parseInt(y, 0) - parseInt(x, 0))) {
            if (num >= parseInt(key, 0)) {
                return `${(num / parseInt(key, 0)).toFixed(1)} ${displayMap[key]}`;
            } else if (num < 0 && (0 - num) >= parseInt(key, 0)) {
                return `-${(num / parseInt(key, 0)).toFixed(1)} ${displayMap[key]}`;
            }
        }
        return value;
    }

    private get Legend() {
        return [{
            marker: {
                lineWidth: 3,
                radius: 5,
                stroke: "#ffae6b",
                symbol: "hyphen",
            },
            value: "增量",
        }, {
            marker: {
                fill: "#3182bd",
                radius: 5,
                symbol: "square",
            },
            value: "总量",
        }
        ]
    }
}