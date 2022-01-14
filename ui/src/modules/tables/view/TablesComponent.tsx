import Icon from "antd/lib/icon";
import Input from "antd/lib/input";
import { PaginationConfig } from "antd/lib/pagination";
import Radio, { RadioChangeEvent } from "antd/lib/radio";
import Rate from "antd/lib/rate";
import Table, { SorterResult } from "antd/lib/table";
import Tooltip from "antd/lib/tooltip";
import autobind from 'autobind-decorator'
import * as moment from "moment";
import * as React from "react";
import { Link } from 'react-router-dom';
import BusinessOperationLogs from "../../businessOperationLogs";
import EditConfirmWindow from "../../common/EditConfirmWindowComponent";
import TableTypeTag from "../../common/TableTypeTagComponent";
import ContentComonent from "../../content";
import EditBusinessAdmin from "../../editBusinessAdmin";
import { Crumbs } from "../../header";
import { ITableItem } from "../common/TableItem";
import { TableType } from "../common/TableType";
import { ITablesProps } from "../props/ITablesProps";
import "../style/TablesComponent.css";

@Crumbs<typeof TablesComponent>([{ icon: "home", url: "/", title: "首页" }, { icon: "table", title: "{{businessName}}数据表" }])
export class TablesComponent extends ContentComonent<ITablesProps> {
    public static defaultProps: ITablesProps = {
        EditTableBusiness: () => ({}),
        EditTableDescription: () => ({}),
        GetBusinessForAdmin: () => ({}),
        GetBusinessInfo: (businessId, searchKey, filterType, pageIndex, pageSize, sortKey, sortOreder) => ({}),
        LockTable: () => ({}),
        SetTableNameWidth: () => ({}),
        UnLockTable: () => ({}),
        businessId: 0,
        businessName: "",
        businesses: [],
        filterType: TableType.None,
        isAdmin: false,
        isCanViewOperationLogs: false,
        isShrink: false,
        pageIndex: 1,
        pageSize: 20,
        searchKey: "",
        sortKey: "type",
        sortOrder: "ascend",
        tableNameWidth: 0,
        tables: [],
        total: 0,
    }

    private isShrink: boolean = false;

    public get businessName() {
        return this.props.businessName === "" ? undefined : this.props.businessName;
    }

    protected get title(): string {
        return `${this.props.businessName}数据表`;
    }

    get businessId(): number {
        return parseInt(this.props.match!.params.businessId, 0);
    }

    public componentDidUpdate() {
        if (this.isShrink !== this.props.isShrink) {
            this.ResizeForTableNameColumn();
        }
        this.isShrink = this.props.isShrink;
    }

    public componentDidMount() {
        this.props.GetBusinessInfo!(this.businessId, TablesComponent.defaultProps.searchKey, TablesComponent.defaultProps.filterType, TablesComponent.defaultProps.pageIndex, TablesComponent.defaultProps.pageSize, TablesComponent.defaultProps.sortKey, TablesComponent.defaultProps.sortOrder);
        window.addEventListener("resize", this.ResizeForTableNameColumn);
        this.ResizeForTableNameColumn();
        this.props.GetBusinessForAdmin();
    }

    public componentWillReceiveProps(nextProps: ITablesProps): void {
        if (nextProps.match!.params.businessId !== this.props.match!.params.businessId) {
            this.props.GetBusinessInfo!(parseInt(nextProps.match!.params.businessId, 0), TablesComponent.defaultProps.searchKey, TablesComponent.defaultProps.filterType, TablesComponent.defaultProps.pageIndex, TablesComponent.defaultProps.pageSize, TablesComponent.defaultProps.sortKey, TablesComponent.defaultProps.sortOrder);
        }
    }

    protected RenderHeader(): JSX.Element | undefined {
        return undefined
    }

    @autobind
    protected RenderTitle(title: string): JSX.Element {
        return (
            <div className="meta-tables-title">
                <h1>{title}</h1>
                <div>
                    {this.businessId !== 0 && (this.props.isAdmin || this.props.isCanViewOperationLogs) && this.businessName ? <BusinessOperationLogs businessId={this.businessId} /> : null}
                    {this.businessId !== 0 && this.props.isAdmin && this.businessName ? <EditBusinessAdmin businessId={this.businessId} businessName={this.businessName} /> : null}
                </div>
            </div>
        )
    }

    protected RenderBody(): JSX.Element {
        return (
            <div className="meta-tables">
                <div className="meta-tables-tools">
                    <Radio.Group value={this.props.filterType} buttonStyle="solid" style={{ marginRight: "10px" }} onChange={this.ChangeFilterType}>
                        <Radio.Button key={TableType.None} value={TableType.None}>全部</Radio.Button>
                        <Radio.Button key={TableType.Hive} value={TableType.Hive}>Hive</Radio.Button>
                        <Radio.Button key={TableType.Kylin} value={TableType.Kylin}>Kylin</Radio.Button>
                        <Radio.Button key={TableType.Elasticsearch} value={TableType.Elasticsearch}>Elasticsearch</Radio.Button>
                        <Radio.Button key={TableType.Kafka} value={TableType.Kafka}>Kafka</Radio.Button>
                        <Radio.Button key={TableType.HBase} value={TableType.HBase}>HBase</Radio.Button>
                        <Radio.Button key={TableType.Druid} value={TableType.Druid}>Druid</Radio.Button>
                        <Radio.Button key={TableType.Doris} value={TableType.Doris}>Doris</Radio.Button>
                    </Radio.Group>
                    <Input.Search placeholder="搜索表名" style={{ width: 300 }} onSearch={this.SearchTables} />
                </div>
                <Table<ITableItem> rowKey="all" dataSource={this.props.tables} pagination={{ pageSize: this.props.pageSize, total: this.props.total, current: this.props.pageIndex }} size="default" scroll={{ y: document!.documentElement!.clientHeight - 420 }} onChange={this.ChangeTableState}>
                    <Table.Column<ITableItem> key="key" width={60} title="#" dataIndex="key" />
                    <Table.Column<ITableItem> key="name" sorter={true} sortOrder={this.GetColumnSortOrderByColumName("name")} title="表名" dataIndex="name" render={this.renderTableNameColumn} />
                    <Table.Column<ITableItem> key="type" sorter={true} sortOrder={this.GetColumnSortOrderByColumName("type")} filteredValue={[this.props.filterType]} filters={this.GetTableTypeFilter()} filterMultiple={false} width={120} title="类型" align="center" dataIndex="type" render={this.renderTypeColumn} />
                    <Table.Column<ITableItem> key="secret" sorter={true} sortOrder={this.GetColumnSortOrderByColumName("secret")} width={120} title="是否涉密" align="center" dataIndex="isSecret" render={this.renderIsSecretColumn} />
                    {screen.width > 1440 ? <Table.Column<ITableItem> key="create_time" sorter={true} sortOrder={this.GetColumnSortOrderByColumName("create_time")} width={190} title="创建时间" align="center" dataIndex="createdTime" render={this.renderTimeColumn} /> : null}
                    <Table.Column<ITableItem> key="comment" sorter={true} sortOrder={this.GetColumnSortOrderByColumName("comment")} width={screen.width <= 1366 ? 270 : screen.width <= 1440 ? 325 : 370} title="描述" dataIndex="description" render={this.renderDscriptionColumn} />
                    <Table.Column<ITableItem> key="querytimes" sorter={true} sortOrder={this.GetColumnSortOrderByColumName("querytimes")} width={200} title="热度" dataIndex="hot" render={this.renderHotColumn} />
                </Table>
            </div>
        )
    }

    @autobind
    private ChangeFilterType(e: RadioChangeEvent): void {
        this.props.GetBusinessInfo!(this.businessId, this.props.searchKey, e.target.value as TableType, 1, this.props.pageSize, this.props.sortKey, this.props.sortOrder);
    }

    @autobind
    private ChangeTableState(pagination: PaginationConfig, filters: Record<keyof ITableItem, string[]>, sorter: SorterResult<ITableItem>): void {
        this.props.GetBusinessInfo!(this.businessId, this.props.searchKey, filters.type[0] as TableType, pagination.current!, pagination.pageSize!, sorter.columnKey || "", sorter.order || "");
    }

    @autobind
    private SearchTables(value: string): void {
        this.props.GetBusinessInfo!(this.businessId, value, this.props.filterType, 1, this.props.pageSize!, this.props.sortKey, this.props.sortOrder);
    }

    @autobind
    private GetColumnSortOrderByColumName(name: string): "descend" | "ascend" | undefined {
        if (this.props.sortKey === name) {
            return this.props.sortOrder;
        }
        return undefined;
    }

    @autobind
    private EditTableBusiness(tableId: number, businessId: number): void {
        this.props.EditTableBusiness(tableId, businessId);
        this.props.GetBusinessInfo(this.businessId, this.props.searchKey, this.props.filterType, this.props.pageIndex, this.props.pageSize, this.props.sortKey, this.props.sortOrder);
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
        }, {
            text: "Elasticsearch",
            value: TableType.Elasticsearch as string
        }, {
            text: "Kafka",
            value: TableType.Kafka as string
        }, {
            text: "HBase",
            value: TableType.HBase as string
        }, {
            text: "Druid",
            value: TableType.Druid as string
        }, {
            text: "Doris",
            value: TableType.Doris as string
        }]
    }

    @autobind
    private renderIsSecretColumn(isSecret: boolean, row: ITableItem): JSX.Element {
        if (this.props.isAdmin) {
            return (
                // tslint:disable-next-line
                <div>{isSecret ? <Icon type="lock" onClick={() => this.props.UnLockTable(row.id)} /> : <Icon type="unlock" onClick={() => this.props.LockTable(row.id)} />}</div >
            )
        } else {
            return (
                <div>{isSecret ? <Icon type="lock" /> : <Icon type="unlock" />}</div >
            )
        }
    }

    @autobind
    private renderTableNameColumn(name: string, row: ITableItem): JSX.Element {
        return (
            <div className="meta-tables-name" style={{ width: this.props.tableNameWidth }}>
                {!row.isSecret || row.isCanView || this.props.isAdmin ?
                    <Tooltip placement="topLeft" title={name}>
                        <Link to={`/table/${row.id}/example`}>{name}</Link>
                    </Tooltip>
                    : <Tooltip placement="topLeft" title="你没有权限查看该表信息">
                        <span style={{ color: "#ccc" }}>{name}</span>
                    </Tooltip>
                }
                {this.businessId === 0 && this.props.businesses.length > 0 ?
                    // tslint:disable-next-line 
                    <EditConfirmWindow value={this.props.businesses.map(b => ({ ...b, id: b.id.toString() }))} mode="select" onOk={(value) => this.EditTableBusiness(row.id, parseInt(value, 10))} icon={<Tooltip placement="left" title="移动到我的业务线"><Icon className="meta-tables-move" component={this.renderMoveBusinessIcon} /></Tooltip>} />
                    : null}
            </div>
        )
    }

    @autobind
    private renderMoveBusinessIcon(): JSX.Element {
        return (
            <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
                <path d="M960 256h-153.6l-157.856-157.856c-8.544-8.544-17.056-12.8-29.856-12.8H64.032C38.432 85.344 21.376 102.4 21.376 128v768c0 25.6 17.056 42.656 42.656 42.656h896c25.6 0 42.656-17.056 42.656-42.656V298.656c0-25.6-17.056-42.656-42.656-42.656zM106.656 170.656H601.6L686.944 256H106.688V170.656z m810.688 682.688H106.688v-512h810.656v512z" />
                <path d="M460.8 738.144l59.744 59.744 200.544-200.544-200.544-200.544-59.744 59.744 98.144 98.144H320v85.344h238.944z" />
            </svg>
        )
    }

    private renderHotColumn(hot: number): JSX.Element {
        const decimal: number = parseInt(hot.toFixed(1).split(".").pop()!, 0) / 10;
        const integer: number = parseInt(hot.toFixed(1).split(".").shift()!, 0);
        hot = integer + (decimal > 0.5 ? 1 : decimal === 0 ? 0 : 0.5);
        return (
            <Rate allowHalf={true} disabled={true} value={hot} />
        )
    }

    @autobind
    private renderDscriptionColumn(description: string, row: ITableItem): JSX.Element {
        return (
            <Tooltip placement="bottomLeft" title={description}>
                <div className="meta-tables-description-div">
                    <p className="meta-tables-description">{description}</p>
                    {
                        // tslint:disable-next-line
                        <EditConfirmWindow value={description} onOk={(value) => this.props.EditTableDescription(row.id, value)} />
                    }
                </div>
            </Tooltip>
        )
    }

    private renderTypeColumn(type: TableType): JSX.Element {
        return (
            <TableTypeTag tableType={type} />
        )
    }

    private renderTimeColumn(time: number): JSX.Element {
        const displayTime = moment(time * 1000).format('YYYY/MM/DD HH:mm:ss')
        return (
            <div>
                {displayTime}
            </div>
        )
    }

    @autobind
    private ResizeForTableNameColumn(): void {
        const width = document.body.clientWidth;
        let columnWidth = width - 108 - 60 - 120 - 120 - 200 - 32; // 页面宽度 - 侧边栏 - 内容边距 - 其它列宽度 - 列padding
        if (screen.width > 1440) {
            columnWidth -= 255;
            if (this.props.isShrink) {
                columnWidth += 170;
            }
        } else if (screen.width > 1366) {
            columnWidth -= 235;
            if (this.props.isShrink) {
                columnWidth += 150;
            }
        } else if (screen.width > 1280) {
            columnWidth -= 220;
            if (this.props.isShrink) {
                columnWidth += 140;
            }
        } else if (screen.width === 1280) {
            columnWidth -= 210;
            if (this.props.isShrink) {
                columnWidth += 130;
            }
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