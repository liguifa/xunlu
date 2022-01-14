import  DataSet from "@antv/data-set";
import { Axis, Chart, Geom, Legend, Tooltip } from "bizcharts";
import * as moment from "moment";
import * as React from "react";
import { IPartitionItem } from "../common/PartitionItem";

export class PartitionChartComponent extends React.Component<{ data: IPartitionItem[] }> {
    public render(): JSX.Element {
        return (
            <Chart height={400} data={this.GetChartData()} scale={{ month: { range: [0, 1] } }} forceFit={true}>
                <Legend />
                <Axis name="month" />
                <Axis name="time" label={{ formatter: this.FormatTimestampToDate }} />
                <Tooltip crosshairs={{ type: "y" }} />
                <Geom type="line" position="month*time" size={2} color={"city"} shape={"smooth"} />
                <Geom type="point" position="month*time" size={4} shape={"circle"} color={"city"} style={{ lineWidth: 1, stroke: "#fff" }} />
            </Chart>
        )
    }

    private FormatTimestampToDate(timestamp: string): string {
        const time = parseInt(timestamp, 0);
        const hour = new Date(time).getHours() - 8;
        const minute = new Date(time).getMinutes();
        return `${hour}点${minute}`;
    }

    private GetChartData() {
        const minReadyTimesForDay: Array<{month: string, time: number}> = [];
        this.props.data.forEach(item => {
            const day: string = moment(item.readyTime * 1000).format('YYYY/MM/DD');
            if(minReadyTimesForDay.filter(t => t.month === day).length === 0) {
                minReadyTimesForDay.push({month: moment(item.readyTime * 1000).format('YYYY/MM/DD'), time: item.readyTime * 1000 - new Date(new Date(item.readyTime * 1000).getFullYear(), new Date(item.readyTime * 1000).getMonth(), new Date(item.readyTime * 1000).getDate()).getTime()})
            }
        })
        const ds = new DataSet();
        const dv = ds.createView().source(minReadyTimesForDay);
        dv.transform({
            fields: ["time"],
            key: "city",
            type: "fold",
            value: "time" // value字段
        });
        return dv;
    }
}