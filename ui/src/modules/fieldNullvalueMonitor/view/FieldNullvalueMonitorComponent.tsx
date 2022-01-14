import DatePicker from "antd/lib/date-picker";
import Empty from "antd/lib/empty";
import Radio, { RadioChangeEvent } from "antd/lib/radio";
import Select from "antd/lib/select";
import autobind from "autobind-decorator";
import { Axis, Chart, Geom, Legend, Tooltip } from "bizcharts";
import * as moment from 'moment';
import * as React from "react";
import { ViewModel } from "../common/ViewModel";
import { IFieldNllvalueMonitorProps } from "../props/FieldNullvalueMonitorProps";
import "../style/FieldNullvalueMonitorComponent.css";

export class FieldNullvalueMonitorComponent extends React.Component<IFieldNllvalueMonitorProps> {
    public static defaultProps: IFieldNllvalueMonitorProps = {
        ChangeCurrentField: () => ({}),
        GetFieldNullvalues: () => ({}),
        GetFields: () => ({}),
        currentField: "",
        end: new Date().getTime(),
        fields: [],
        model: ViewModel.Day,
        nullvalues: [],
        start: new Date().getTime() - 7 * 86400000,
        tableId: 0,
    }

    public componentDidMount(): void {
        this.props.GetFields(this.props.tableId);
        this.props.GetFieldNullvalues(this.props.tableId, FieldNullvalueMonitorComponent.defaultProps.start, FieldNullvalueMonitorComponent.defaultProps.end, FieldNullvalueMonitorComponent.defaultProps.model);
    }

    public render(): JSX.Element {
        const currentNullvalues = this.GetCurrentFieldData();
        return (
            <div>
                <div className="meta-tablenullvalue-title">
                    <h3>表字段空值率变化趋势图</h3>
                    <DatePicker.RangePicker allowClear={false} defaultValue={[moment(this.props.start), moment(this.props.end)]} onChange={this.OnDateRangeChange} />
                    <Select showSearch={true} value={this.props.currentField} style={{ width: 200, marginRight: 10 }} onChange={this.props.ChangeCurrentField}>
                        {
                            this.props.fields.map(field => (<Select.Option value={field.name}>{field.name}</Select.Option>))
                        }
                    </Select>
                    <Radio.Group value={this.props.model} buttonStyle="solid" onChange={this.OnViewModelChange}>
                        <Radio.Button value={1}>日视图</Radio.Button>
                        <Radio.Button value={2}>月视图</Radio.Button>
                    </Radio.Group>
                </div>
                {
                    currentNullvalues.length > 0 ?
                        <Chart height={document.body.clientHeight - 350} forceFit={true} data={currentNullvalues}>
                            <Legend custom={true} allowAllCanceled={true} items={this.Legend} />
                            <Axis name="total" label={{ formatter: this.FormatterNumberToDisplay }} />
                            <Tooltip />
                            <Geom type="line" tooltip={['time*total', (time, total) => ({ name: "空值率", title: "", value: `${parseFloat(total).toFixed(2)}%` })]} position="time*total" color="#fdae6b" size={3} shape="smooth" />
                            <Geom type="point" tooltip={['time*total', (time, total) => ({ name: "空值率", title: "", value: `${parseFloat(total).toFixed(2)}%` })]} position="time*total" color="#fdae6b" size={3} shape="circle" />
                        </Chart>
                        : <Empty>{`字段${this.props.currentField}没有空值率数据`}</Empty>
                }
            </div>
        )
    }

    @autobind
    private OnViewModelChange(e: RadioChangeEvent): void {
        this.props.GetFieldNullvalues(this.props.tableId, this.props.start, this.props.end, e.target.value! as number);
    }

    @autobind
    private OnDateRangeChange(dates: [moment.Moment, moment.Moment], dateStrings: [string, string]): void {
        this.props.GetFieldNullvalues(this.props.tableId, dates[0].toDate().getTime(), dates[1].toDate().getTime(), this.props.model);
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
            value: `${this.props.currentField}空值率`,
        }
        ]
    }

    private GetCurrentFieldData() {
        return this.props.nullvalues.filter(n => n.name.toLowerCase() === this.props.currentField.toLowerCase());
    }
}