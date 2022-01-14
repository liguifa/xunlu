import Icon from "antd/lib/icon";
import Progress from "antd/lib/progress";
import Table from "antd/lib/table";
import Tooltip from "antd/lib/tooltip";
import autobind from "autobind-decorator";
import * as React from "react";
import EditConfirmWindow from "../../common/EditConfirmWindowComponent";
import { IFieldItem } from "../common/FieldItem";
import { IFieldsProps } from "../props/FieldsProps";
import "../style/FieldsComponent.css";

export class FieldsComponent extends React.Component<IFieldsProps> {
    public componentDidMount(): void {
        this.props.GetFields(this.tableId);
        window.addEventListener("resize", this.ResizeForFieldNameColumn);
        this.ResizeForFieldNameColumn();
    }

    public render(): JSX.Element {
        return (
            <Table<IFieldItem> rowKey="fields" dataSource={this.props.items} scroll={{ y: document!.documentElement!.clientHeight - 400 }}>
                <Table.Column<IFieldItem> key="index" width={60} title="#" dataIndex="index" />
                <Table.Column<IFieldItem> key="name" title="字段名" dataIndex="name" render={this.RenderNameColumn} />
                <Table.Column<IFieldItem> key="datatype" width={150} title="数据类型" dataIndex="datatype" />
                {screen.width > 1440 ? <Table.Column<IFieldItem> key="secret" align="center" width={80} title="涉密" dataIndex="secret" render={this.renderIsSecretColumn} /> : null}
                <Table.Column<IFieldItem> key="description" width={this.descriptColumnWith} title="描述" render={this.RenderDscriptionColumn} dataIndex="description" />
                <Table.Column<IFieldItem> key="dict" width={this.dictColumnWith} title="数据字典" render={this.RenderDictColumn} dataIndex="dict" />
                <Table.Column<IFieldItem> key="type" width={90} title="字段类型" dataIndex="type" render={this.RenderTypeColumn} />
                <Table.Column<IFieldItem> key="nullValueRate" width={this.nullvalueColumnWith} title="空值率" render={this.RenderNullValueRate} dataIndex="nullValueRate" />
            </Table>
        )
    }

    @autobind
    private renderIsSecretColumn(secret: boolean, row: IFieldItem): JSX.Element {
        if (this.props.isAdmin) {
            return (
                // tslint:disable-next-line
                <div>{secret ? <Icon type="lock" onClick={() => this.props.ChangeLockStatus(row.id, false)} /> : <Icon type="unlock" onClick={() => this.props.ChangeLockStatus(row.id, true)} />}</div >
            )
        } else {
            return (
                <div>{secret ? <Icon type="lock" /> : <Icon type="unlock" />}</div >
            )
        }
    }

    private get nullvalueColumnWith(): number {
        if (screen.width <= 1366) {
            return 160;
        }
        return 200;
    }

    private get descriptColumnWith(): number {
        if (screen.width <= 1366) {
            return 190;
        }
        if (screen.width <= 1440) {
            return 240;
        }
        if (screen.width <= 1680) {
            return 340;
        }
        return 440;
    }

    private get dictColumnWith(): number {
        if (document.documentElement!.clientWidth <= 1366) {
            return 190;
        }
        if (document.documentElement!.clientWidth <= 1680) {
            return 240;
        }
        return 300;
    }

    private get tableId(): number {
        return parseInt(this.props.match.params.tableId!, 0);
    }

    @autobind
    private RenderNameColumn(name: string): JSX.Element {
        return (
            <Tooltip placement="topLeft" title={name}>
                <div className="meta-field-name" style={{ width: this.props.fieldWidth }}>{name}</div>
            </Tooltip>)
    }

    @autobind
    private RenderDscriptionColumn(description: string, row: IFieldItem): JSX.Element {
        return (
            <Tooltip placement="topLeft" title={description}>
                <div key={"desc" + row.id} className="meta-fields-description-div">
                    <p className="meta-fields-description">{description ? description : "无"}</p>
                    {
                        // tslint:disable-next-line 
                        <EditConfirmWindow value={description} onOk={value => this.props.EditFieldDescription(row.id, value)} />
                    }
                </div>
            </Tooltip>
        )
    }

    private RenderNullValueRate(nullValueRate: number): JSX.Element {
        if (nullValueRate === -1) {
            return (<div>-</div>)
        } else {
            return (
                <Progress status="normal" percent={parseInt((parseFloat((parseFloat(nullValueRate.toString())).toFixed(2)) * 100).toString(), 10)} />
            )
        }
    }

    @autobind
    private RenderDictColumn(dict: string, row: IFieldItem): JSX.Element {
        return (
            <div key={"dict" + row.id} className="meta-fields-dict-div">
                <Tooltip placement="topLeft" title={dict}><div className="meta-fields-dict">{dict ? dict : "无"}</div></Tooltip>
                {
                    // tslint:disable-next-line 
                    <EditConfirmWindow value={dict} placeholder="字典格式: key1:value1,key2:value2" onOk={value => this.props.EditFieldDict(row.id, value)} />
                }
            </div>
        )
    }

    private RenderTypeColumn(type: number): JSX.Element {
        const map = {
            0: "普通字段",
            1: "分区字段"
        }
        return (
            <div>{map[type]}</div>
        )
    }

    @autobind
    private ResizeForFieldNameColumn(): void {
        const width = document.body.clientWidth;
        let columnWidth = width - 138 - 60 - 150 - 90; // 页面宽度 - 侧边栏 - 内容边距 - 其它列宽度 - 列padding
        if (screen.width > 1440) {
            columnWidth -= 255;
            columnWidth -= 80;
        } else if (screen.width > 1366) {
            columnWidth -= 240
        } else if (screen.width > 1280) {
            columnWidth -= 220;
        } else if (screen.width === 1280) {
            columnWidth -= 210;
        }
        if (screen.width <= 1366) {
            columnWidth -= 160;
        } else {
            columnWidth -= 200;
        }
        if (screen.width <= 1366) {
            columnWidth -= 190;
        } else if (screen.width <= 1440) {
            columnWidth -= 240;
        } else if (screen.width <= 1680) {
            columnWidth -= 340;
        } else {
            columnWidth -= 440
        }

        if (screen.width <= 1366) {
            columnWidth -= 190;
        } else if (screen.width <= 1680) {
            columnWidth -= 240;
        } else {
            columnWidth -= 300;
        }
        if (columnWidth <= 0) {
            columnWidth = 0;
        }
        this.props.SetFieldNameWidth(columnWidth);
    }
}