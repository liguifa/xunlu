import Button from "antd/lib/button";
import Col from "antd/lib/col";
import Input from "antd/lib/input";
import Popconfirm from "antd/lib/popconfirm";
import Radio, { RadioChangeEvent } from "antd/lib/radio";
import Row from "antd/lib/row";
import Table, { PaginationConfig, SorterResult } from "antd/lib/table";
import Tooltip from "antd/lib/tooltip";
import autobind from "autobind-decorator";
import * as moment from "moment";
import * as React from "react";
import { Link } from 'react-router-dom';
import  ChooseTables, { ITableItem as ChooseTablesTableItem } from "../../chooseTables";
import TableTypeTag from "../../common/TableTypeTagComponent";
import ContentComponent from "../../content";
import { Crumbs } from "../../header";
import { ITableItem, TableType } from "../common/TableItem";
import { ISecretProps } from "../props/SecretProps";

@Crumbs<typeof SecretComponent>([{ icon: "home", url: "/", title: "首页" }, {title: "敏感表管理"}])
export class SecretComponent extends ContentComponent<ISecretProps> {
    public static defaultProps: ISecretProps = {
        GetSecretTables: () => ({}),
        LockTables: () => ({}),
        SetTableNameWidth: () => ({}),
        UnLockTable: () => ({}),
        filterType: TableType.None,
        pageIndex: 1,
        pageSize: 20,
        searchKey: "",
        sortKey: "",
        sortOrder: "ascend",
        tableNameWidth: 0,
        tables: [],
        total: 0,
    }

    protected title: string = "敏感表管理";

    public componentDidMount(): void {
        window.addEventListener("resize", this.ResizeForTableNameColumn);
        this.ResizeForTableNameColumn();
        this.props.GetSecretTables("", TableType.None, 1, 20, "id", "ascend");
    }

    protected RenderHeader(): JSX.Element | undefined {
        return undefined;
    }

    protected RenderBody(): JSX.Element {
        return (
            <div className="meta-tables">
                <div className="meta-tables-tools">
                    <Radio.Group value={this.props.filterType} buttonStyle="solid" style={{ marginRight: "10px" }} onChange={this.ChangeFilterType}>
                        <Radio.Button key={TableType.None} value={TableType.None}>全部</Radio.Button>
                        <Radio.Button key={TableType.Hive} value={TableType.Hive}>Hive</Radio.Button>
                        <Radio.Button key={TableType.Kylin} value={TableType.Kylin}>Kylin</Radio.Button>
                    </Radio.Group>
                    <Input.Search placeholder="搜索表名" style={{ width: 300 }} onSearch={this.SearchTables} />
                </div>
                <Table<ITableItem> rowKey="all" dataSource={this.props.tables} pagination={{ pageSize: this.props.pageSize, total: this.props.total, current: this.props.pageIndex }} size="default" scroll={{ y: document!.documentElement!.clientHeight - 420 }} onChange={this.ChangeTableState}>
                    <Table.Column<ITableItem> key="key" width={60} title="#" dataIndex="index" />
                    <Table.Column<ITableItem> key="name" sorter={true} sortOrder={this.GetColumnSortOrderByColumName("name")} title="表名" dataIndex="name" render={this.RenderTableNameColumn} />
                    <Table.Column<ITableItem> key="type" sorter={true} sortOrder={this.GetColumnSortOrderByColumName("type")} filteredValue={[this.props.filterType]} filters={this.GetTableTypeFilter()} filterMultiple={false} width={120} title="类型" align="center" dataIndex="type" render={this.RenderTypeColumn} />
                    {screen.width > 1440 ? <Table.Column<ITableItem> key="create_time" sorter={true} sortOrder={this.GetColumnSortOrderByColumName("create_time")} width={190} title="创建时间" align="center" dataIndex="createTime" render={this.RenderTimeColumn} /> : null}
                    <Table.Column<ITableItem> key="comment" sorter={true} sortOrder={this.GetColumnSortOrderByColumName("comment")} width={screen.width <= 1366 ? 270 : screen.width <= 1440 ? 325 : 370} title="描述" dataIndex="description" render={this.RenderDscriptionColumn} />
                    <Table.Column<ITableItem> key="action" width={100} dataIndex="id" title="操作" render={this.RenderActionColumn} />
                </Table>
            </div>
        )
    }

    protected RenderTitle(title: string): JSX.Element {
        return (
            <div className="meta-business-title">
                <h1>{title}</h1>
                <ChooseTables isIncludeSceret={false} onOk={this.AddSecretTables} buttonSize="default" buttonTitle="添加敏感表" />
            </div>
        )
    }

    @autobind
    private AddSecretTables(actvies: ChooseTablesTableItem[]): void {
        this.props.LockTables(actvies.map(active => active.id));
        this.props.GetSecretTables(this.props.searchKey, this.props.filterType, this.props.pageIndex, this.props.pageSize, this.props.sortKey, this.props.sortOrder);
    }

    @autobind
    private ChangeFilterType(e: RadioChangeEvent): void {
        this.props.GetSecretTables!(this.props.searchKey, e.target.value as TableType, 1, this.props.pageSize, this.props.sortKey, this.props.sortOrder);
    }

    @autobind
    private ChangeTableState(pagination: PaginationConfig, filters: Record<keyof ITableItem, string[]>, sorter: SorterResult<ITableItem>): void {
        this.props.GetSecretTables!(this.props.searchKey, filters.type[0] as TableType, pagination.current!, pagination.pageSize!, sorter.columnKey || "", sorter.order || "");
    }

    @autobind
    private SearchTables(value: string): void {
        this.props.GetSecretTables!(value, this.props.filterType, 1, this.props.pageSize!, this.props.sortKey, this.props.sortOrder);
    }

    @autobind
    private GetColumnSortOrderByColumName(name: string): "descend" | "ascend" | undefined {
        if (this.props.sortKey === name) {
            return this.props.sortOrder;
        }
        return undefined;
    }

    private GetTableTypeFilter() {
        return [{
            text: "全部",
            value: TableType.None as string
        }, {
            text: "Hive",
            value: TableType.Hive as string
        }, {
            text: "kylin",
            value: TableType.Kylin as string
        }]
    }

    @autobind
    private RenderTableNameColumn(name: string, row: ITableItem): JSX.Element {
        return (
            <div className="meta-tables-name" style={{ width: this.props.tableNameWidth }}>
                <Tooltip placement="topLeft" title={name}>
                    <Link to={`/table/${row.id}/example`}>{name}</Link>
                </Tooltip>
            </div>
        )
    }

    @autobind
    private RenderDscriptionColumn(description: string, row: ITableItem): JSX.Element {
        return (
            <Tooltip placement="bottomLeft" title={description}>
                <div className="meta-tables-description-div">
                    <p className="meta-tables-description">{description}</p>
                </div>
            </Tooltip>
        )
    }

    private RenderTypeColumn(type: TableType): JSX.Element {
        return (
            <TableTypeTag tableType={type} />
        )
    }

    private RenderTimeColumn(time: number): JSX.Element {
        const displayTime = moment(time * 1000).format('YYYY/MM/DD HH:mm:ss')
        return (
            <div>
                {displayTime}
            </div>
        )
    }

    @autobind
    private RenderActionColumn(id: number): JSX.Element {
        return (
            <Row align="middle" justify="center">
                <Col span={24}>
                    { // tslint:disable-next-line 
                        <Popconfirm title="你确定要移除这个表吗？" onConfirm={() => this.RemoveTable(id)} okText="确定" cancelText="取消">
                            <Button icon="delete" type="danger" size="small">移除</Button>
                        </Popconfirm>
                    }
                </Col>
            </Row>
        )
    }

    private RemoveTable(id: number): void {
        this.props.UnLockTable(id);
        this.props.GetSecretTables(this.props.searchKey, this.props.filterType, this.props.pageIndex, this.props.pageSize, this.props.sortKey, this.props.sortOrder)
    }

    @autobind
    private ResizeForTableNameColumn(): void {
        const width = document.body.clientWidth;
        let columnWidth = width - 108 - 60 - 120 - 100 - 32; // 页面宽度 - 侧边栏 - 内容边距 - 其它列宽度 - 列padding
        if (screen.width > 1440) {
            columnWidth -= 255;
        } else if (screen.width > 1366) {
            columnWidth -= 235;
        } else if (screen.width > 1280) {
            columnWidth -= 220;
        } else if (screen.width === 1280) {
            columnWidth -= 210;
        }
        if (screen.width > 1440) {
            columnWidth -= 190;
        }
        if (screen.width > 1440) {
            columnWidth -= 370;
        } else if (screen.width > 1366) {
            columnWidth -= 325;
        } else {
            columnWidth -= 270;
        }
        if (columnWidth < 0) {
            columnWidth = 0;
        }
        this.props.SetTableNameWidth(columnWidth);
    }
}