import Divider from "antd/lib/divider";
import Modal from "antd/lib/modal";
import Table from "antd/lib/table";
import Tooltip from "antd/lib/tooltip";
import autobind from "autobind-decorator";
import * as React from "react";
import TableTypeTag from "../../common/TableTypeTagComponent";
import { IFieldItem } from "../common/FieldItem";
import { ILineageTableInfoProps } from "../props/LineageTableInfoProps";
import "../style/LineageComponent.css";

export default class LineageTableInfoComponent extends React.Component<ILineageTableInfoProps> {
    public render(): JSX.Element {
        return (
            <Modal title={`${this.props.tableName}表信息`} zIndex={1001} visible={this.props.isShow} width="1000px" okText="确定" cancelText="取消" footer={false} onCancel={this.props.onClose}>
                <Table<{ name: string, value: string | React.ReactNode}> rowKey="colum" dataSource={this.GetTableDetails()} size="small" pagination={false} showHeader={false} style={{ minWidth: 700 }}>
                    <Table.Column<{ name: string, value: string}> width={100} key="name" dataIndex="name" />
                    <Table.Column<{ name: string, value: string}> key="value" dataIndex="value" />
                </Table>
                <Divider orientation="left">字段信息</Divider>
                <Table<IFieldItem> rowKey="fields" dataSource={this.props.fields} pagination={{pageSize: 6}} scroll={{ y: document!.documentElement!.clientHeight - 400 }}>
                <Table.Column<IFieldItem> key="index" width={60} title="#" dataIndex="index" />
                <Table.Column<IFieldItem> key="name" width={240} title="字段名" dataIndex="name" render={this.RenderNameColumn} />
                <Table.Column<IFieldItem> key="datatype" width={150} title="数据类型" dataIndex="datatype" />
                <Table.Column<IFieldItem> key="description" title="描述" render={this.RenderDscriptionColumn} dataIndex="description" />
            </Table>
            </Modal>
        )
    }

    private GetTableDetails(): Array<{ name: string, value: string | React.ReactNode}> {
        return [{
            name: "表名",
            value: this.props.tableName
        }, {
            name: "类型",
            value: <TableTypeTag tableType={this.props.tableType as 1 | 2 | ""} />,
        }, {
            name: "描述",
            value: this.props.tableDescription
        }]
    }

    @autobind
    private RenderNameColumn(name: string): JSX.Element {
        return (
            <Tooltip placement="topLeft" title={name}>
                <div className="meta-lineage-tableinfo-name">{name}</div>
            </Tooltip>)
    }

    @autobind
    private RenderDscriptionColumn(description: string, row: IFieldItem): JSX.Element {
        return (
            <Tooltip placement="topLeft" title={description}>
                <div className="meta-lineage-tableinfo-description-div" >
                    {description}
                </div>
            </Tooltip>
        )
    }
}