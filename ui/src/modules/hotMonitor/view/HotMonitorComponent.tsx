import DatePicker from "antd/lib/date-picker";
import Empty from "antd/lib/empty";
import Radio, { RadioChangeEvent } from "antd/lib/radio";
import autobind from "autobind-decorator";
import { Axis, Chart, Geom, Legend, Tooltip } from "bizcharts";
import * as moment from 'moment';
import * as React from "react";
import { ViewModel } from "../common/ViewModel";
import { IHotMonitorProps } from "../props/HotMonitorProps";
import "../style/HotMonitorComponent.css";

export class HotMonitorComponent extends React.Component<IHotMonitorProps> {
    public static defaultProps: IHotMonitorProps = {
        GetTableQuerytimes: () => ({}),
        end: new Date().getTime(),
        hots: [],
        model: ViewModel.Day,
        start: new Date().getTime() - 7 * 86400000,
    }

    private get tableId(): number {
        return parseInt(this.props.match!.params.tableId!, 0);
    }

    public componentDidMount(): void {
        this.props.GetTableQuerytimes(this.tableId, HotMonitorComponent.defaultProps.start, HotMonitorComponent.defaultProps.end, HotMonitorComponent.defaultProps.model);
    }

    public render(): JSX.Element {
        return (
            <div>
                <div className="meta-hot-title">
                    <h3>表热度变化趋势图</h3>
                    <DatePicker.RangePicker allowClear={false} defaultValue={[moment(this.props.start), moment(this.props.end)]} onChange={this.OnDateRangeChange} />
                    <Radio.Group value={this.props.model} buttonStyle="solid" onChange={this.OnViewModelChange}>
                        <Radio.Button value={1}>日视图</Radio.Button>
                        <Radio.Button value={2}>月视图</Radio.Button>
                    </Radio.Group>
                </div>
                {
                    this.props.hots.length > 0 ?
                        <Chart height={document.body.clientHeight - 320} forceFit={true} data={this.props.hots}>
                            <Legend custom={true} allowAllCanceled={true} items={this.Legend} />
                            <Axis name="querytimes" label={{ formatter: this.FormatterNumberToDisplay }} />
                            <Tooltip />
                            <Geom type="line" tooltip={['time*querytimes', (time, querytimes) => ({ name: "查询次数", title: time, value: querytimes })]} position="time*querytimes" color="#fdae6b" size={3} shape="smooth" />
                            <Geom type="point" tooltip={['time*querytimes', (time, querytimes) => ({ name: "查询次数", title: time, value: querytimes })]} position="time*querytimes" color="#fdae6b" size={3} shape="circle" />
                        </Chart>
                        : <Empty>没有任何表热度数据</Empty>
                }
            </div>
        )
    }

    @autobind
    private OnViewModelChange(e: RadioChangeEvent): void {
        this.props.GetTableQuerytimes(this.tableId, this.props.start, this.props.end, e.target.value! as number);
    }

    @autobind
    private OnDateRangeChange(dates: [moment.Moment, moment.Moment], dateStrings: [string, string]): void {
        this.props.GetTableQuerytimes(this.tableId, dates[0].toDate().getTime(), dates[1].toDate().getTime(), this.props.model);
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
            10000: "万"
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
            value: "热度",
        }
        ]
    }
}