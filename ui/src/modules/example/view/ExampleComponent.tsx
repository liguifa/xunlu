import Icon from "antd/lib/icon";
import Popover from "antd/lib/popover";
import Progress from "antd/lib/progress";
import Table, { ColumnProps } from "antd/lib/table";
import Tag from "antd/lib/tag";
import Tooltip from "antd/lib/tooltip";
import autobind from "autobind-decorator";
import * as React from "react";
import EditConfirmWindow from "../../common/EditConfirmWindowComponent";
import { IExampleProps } from "../props/ExampleProps";
import { IFieldProp } from "../props/FieldProp";
import "../style/ExampleComponent.css";

export class ExampleComponent extends React.Component<IExampleProps> {
    public static defaultProps = {
        columns: [],
        rows: [],
    }

    private static defaultColumnWidth = 300;

    private get tableId(): number {
        return parseInt(this.props.match.params.tableId!, 0);
    }

    public componentDidMount(): void {
        this.props.GetTableExample(this.tableId)
    }

    public render(): JSX.Element {
        return (
            <Table rowKey="example" columns={this.GetTableColumns()} dataSource={this.GetDataRows()} pagination={{ pageSize: 20 }} scroll={{ y: document!.documentElement!.clientHeight - 400, x: this.props.columns.length * ExampleComponent.defaultColumnWidth + 50 }} />
        )
    }

    private GetTableColumns(): Array<ColumnProps<object>> {
        const columns: Array<ColumnProps<object>> = this.props.columns.map<ColumnProps<object>>(column => ({
            dataIndex: column.name!.toString(),
            key: column.name!.toString(),
            render: this.RenderTableRow,
            title: () => this.RenderTableColumn(column),
            width: ExampleComponent.defaultColumnWidth,

        }));
        // 添加一行可伸缩行，当列数小时候可以自动填充
        columns.push({
            key: "__",
            title: ""
        });
        columns.unshift({
            dataIndex: "_index",
            fixed: 'left',
            key: "_index",
            title: "#",
            width: 50,
        });
        return columns;
    }

    private GetDataRows() {
        return this.props.rows.map((row, index) => ({ ...row, _index: index + 1 }));
    }

    private RenderTableRow(text: string): JSX.Element {
        return (
            <Tooltip placement="leftBottom" title={text}>
                <div className="meta-example-row" style={{ width: ExampleComponent.defaultColumnWidth - 36 }}>
                    {text}
                </div>
            </Tooltip>
        )
    }

    private RenderTableColumn(field: IFieldProp): JSX.Element {
        return (
            <div className="meta-table-column">
                <span>{field.name}</span>
                <div style={{ verticalAlign: "middle" }}>
                    <Tag color="#108ee9">{field.type}</Tag>
                    <Popover content={this.RenderColumnDetails(field)} title={`字段详细信息`} trigger="hover">
                        <Icon type="info-circle" style={{ color: "#108ee9", fontSize: "18px", verticalAlign: "middle" }} />
                    </Popover>
                </div>
            </div>
        )
    }

    @autobind
    private RenderColumnDetails(field: IFieldProp) {
        const details: Array<{ name: string, value: string }> = [];
        for (const key of Object.keys(field).filter(k => k !== "id").sort(this.SortDetailRows)) {
            details.push({ name: this.GetDetailDisplay(key), value: this.GetDetailValue(key, field[key], field) })
        }

        return (
            <Table<{ name: string, value: string }> rowKey="colum" dataSource={details} size="small" pagination={false} showHeader={false} style={{ minWidth: 400 }}>
                <Table.Column<{ name: string, value: string }> width={60} key="name" dataIndex="name" />
                <Table.Column<{ name: string, value: string }> key="value" dataIndex="value" />
            </Table>

        )
    }

    private GetDetailDisplay(name: string) {
        const detailColunms: IFieldProp = {
            description: "描述",
            dict: "字典",
            name: "列名",
            nullValueRatio: "空值率",
            type: "类型",
        }
        return detailColunms[name];
    }

    private SortDetailRows(x: string, y: string): number {
        const detailColunms: IFieldProp = {
            description: 3,
            dict: 4,
            name: 1,
            nullValueRatio: 5,
            type: 2,
        }
        return detailColunms[x] - detailColunms[y];
    }

    @autobind
    private GetDetailValue(name: string, value: string, field: IFieldProp) {
        const detailColunms: IFieldProp = {
            description: () => <div style={{ maxWidth: "500px" }}>{value}
                {
                    // tslint:disable-next-line 
                    <EditConfirmWindow value={value} placeholder="字典格式: key1:value1,key2:value2" onOk={value => this.props.EditFieldDescription(field.id!, value)} />
                }
            </div>,
            dict: () => this.RenderDictColumn(value, field.id!),
            name: () => <div>{value}</div>,
            nullValueRatio: () => parseInt(value, 0) === -1 ? (<div>-</div>) : <Progress percent={parseFloat(parseFloat(value).toFixed(2))*100} status="normal" size="small" />,
            type: () => <Tag color="#108ee9">{value}</Tag>,
        }
        return detailColunms[name]();
    }

    @autobind
    private RenderDictColumn(dict: string, id: string): JSX.Element {
        return (
            <div className="meta-example-div">
                <div className="meta-fields-dict">
                    <Tooltip placement="topLeft" title={dict}>{dict ? dict : "无"}</Tooltip>
                </div>
                {
                    // tslint:disable-next-line 
                    <EditConfirmWindow value={dict} placeholder="字典格式: key1:value1,key2:value2" onOk={value => this.props.EditFieldDict(id, value)} />
                }
            </div>
        )
    }
}

