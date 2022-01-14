import DatePicker from "antd/lib/date-picker";
import Empty from "antd/lib/empty";
import autobind from "autobind-decorator";
import { Chart, Coord, Geom, Label, Legend, Tooltip } from "bizcharts";
import * as moment from 'moment';
import * as React from "react";
import { ViewModel } from "../common/ViewModel";
import { IFieldNllvalueMonitorProps } from "../props/NullvalueProportionMonitorProps";
import "../style/FieldNullvalueMonitorComponent.css";

export class NullvalueProportionMonitorComponent extends React.Component<IFieldNllvalueMonitorProps> {
    public static defaultProps: IFieldNllvalueMonitorProps = {
        GetFieldNullvalues: () => ({}),
        end: new Date().getTime(),
        model: ViewModel.Day,
        nullvalues: [],
        start: new Date().getTime() - 7 * 86400000,
        tableId: 0,
    }

    public componentDidMount(): void {
        this.props.GetFieldNullvalues(this.props.tableId, NullvalueProportionMonitorComponent.defaultProps.start, NullvalueProportionMonitorComponent.defaultProps.end, NullvalueProportionMonitorComponent.defaultProps.model);
    }

    public render(): JSX.Element {
        return (
            <div>
                <div className="meta-tablenullvalue-title">
                    <h3>表字段空值率变化趋势图</h3>
                    <DatePicker.RangePicker allowClear={false} defaultValue={[moment(this.props.start), moment(this.props.end)]} onChange={this.OnDateRangeChange} />
                </div>
                {
                    this.props.nullvalues.length > 0 ?
                        <Chart height={document.body.clientHeight - 350} forceFit={true} data={this.GetNullvalueProportionData()}>
                            <Coord type="theta" radius={0.8} />
                            <Tooltip />
                            <Legend position="right" offsetY={-80} offsetX={-160} />
                            <Geom tooltip={['name*total', (name, total) => ({ name: "空值率", title: name, value: `${parseFloat(total).toFixed(2)}%` })]} type="intervalStack" color="name" position="proportion" style={{ lineWidth: 1, stroke: "#fff" }}>
                                <Label content="name" />
                            </Geom>
                        </Chart>
                        : <Empty>{`字段没有空值率数据`}</Empty>
                }
            </div>
        )
    }

    @autobind
    private OnDateRangeChange(dates: [moment.Moment, moment.Moment], dateStrings: [string, string]): void {
        this.props.GetFieldNullvalues(this.props.tableId, dates[0].toDate().getTime(), dates[1].toDate().getTime(), this.props.model);
    }

    private GetNullvalueProportionData() {
        let total = 0;
        this.props.nullvalues.forEach(n => {
            if (n) {
                total += n.total;
            }
        });
        return this.props.nullvalues.map(n => ({ ...n, proportion: n.total / total }))
    }
}