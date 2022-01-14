import * as React from "react";
import "./CommonComponent.css";

export default class TableTypeTagComponent extends React.Component<{tableType: "" | number}> {
    public render(): JSX.Element {
        return (
            <div className="meta-tag">
                <img className="meta-tag-dot" src={this.GetTableLogoByTableType(this.props.tableType)} />
                <span>{this.GetDisplayNameForTableTypeByTableType(this.props.tableType)}</span>
            </div>
        )
    }

    private GetTableLogoByTableType(type: number | string): string {
        return {
            1: require("../../assets/hive_logo_medium.jpg"),
            2: require("../../assets/kylin_logo.png"),
            3: require("../../assets/es_logo.svg"),
            4: require("../../assets/kafka_logo.png"),
            5: require("../../assets/hbase_logo.png"),
            6: require("../../assets/druid_logo.png"),
            7: require("../../assets/doris_logo.jpeg")
        }[type]
    }

    private GetDisplayNameForTableTypeByTableType(tableType: number | string): string {
        return {
            1: "Hive",
            2: "Kylin",
            3: "Elasticsearch",
            4: "Kafka",
            5: "HBase",
            6: "Druid",
            7: "Doris"
        }[tableType]
    }
}