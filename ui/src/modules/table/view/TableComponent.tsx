import Button from "antd/lib/button";
import Empty from "antd/lib/empty";
import Icon from "antd/lib/icon";
import Popover from "antd/lib/popover";
import Table from "antd/lib/table";
import autobind from "autobind-decorator";
import * as moment from "moment";
import * as React from "react";
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import EditConfirmWindow from "../../common/EditConfirmWindowComponent";
import TableTypeTag from "../../common/TableTypeTagComponent";
import ContentComponent from "../../content";
import EditTable from "../../editTable";
import Example from "../../example";
import Fields from "../../fields";
import { Crumbs } from "../../header";
import HotMonitor from "../../hotMonitor";
import Lineage from "../../lineage";
import NullvalueMonit from "../../nullvalueMonitor";
import Partition from "../../partition";
import RownumMonitor from "../../rownumMonitor";
import ViewTemplate from "../../viewTemplate";
import { ITableComponentProps, ViewType } from "../props/TableComponentProps";
import { TableService } from "../service/TableService";
import "../style/TableComponent.css";

@Crumbs<typeof TableComponent>([{ icon: "home", url: "/", title: "首页" }, { icon: "table", title: "{{businessName}}数据表", url: "/tables/{{businessId}}" }, { title: "{{title}}" }])
export class TableComponent extends ContentComponent<ITableComponentProps> {

    public componentDidMount(): void {
        this.props.GetTableInfo(this.tableId);
    }

    public get title(): string {
        return this.props.tableName;
    }

    public get businessName(): string {
        return this.props.businessName;
    }

    public get businessId(): number {
        return this.props.businessId;
    }

    private get tableId(): number {
        return parseInt(this.props.match.params.tableId!, 0);
    }

    private get currentView(): ViewType {
        return this.props.match.params.view!;
    }

    protected RenderHeader(): JSX.Element | undefined {
        if (!this.props.isCanAccess) {
            return undefined;
        }
        return (
            <div className="meta-table-header">
                <Button.Group>
                    <Button type="primary" disabled={this.currentView === ViewType.Example} href={`/#/table/${this.tableId}/example`}>
                        <Icon type="left" />
                        返回表首页
                    </Button>
                </Button.Group>
                <Button.Group>
                    <Button type="primary" onClick={this.ExportExample}>
                        <Icon type="export" />
                        导出示例数据
                        </Button>
                    <ViewTemplate tableId={this.tableId} />
                    {this.props.tableName ? <EditTable onOk={this.RefreshTableInfo} id={this.tableId} name={this.props.tableName} type={this.props.tableType as 1 | 2 | ""} isSecret={this.props.isSecret} businessName={this.props.businessName === "" ? "其它" : this.props.businessName} businessId={this.props.businessId ? this.props.businessId.toString() : "0"} description={this.props.description} isAdmin={this.props.isAdmin} /> : null}
                </Button.Group>
                <Button.Group>
                    <Button type="primary" disabled={this.currentView === ViewType.Paritition} href={`/#/table/${this.tableId}/paritition`}>
                        <Icon type="appstore" />
                        分区信息
                    </Button>
                    <Button type="primary" disabled={this.currentView === ViewType.Fields} href={`/#/table/${this.tableId}/fields`}>
                        <Icon type="table" />
                        字段信息
                    </Button>
                    <Button type="primary" disabled={this.currentView === ViewType.Lineage} href={`/#/table/${this.tableId}/lineage`}>
                        <Icon type="fork" />
                        血缘关系
                    </Button>
                </Button.Group>
                <Button.Group>
                    <Button type="primary" disabled={this.currentView === ViewType.Rownum} href={`/#/table/${this.tableId}/rownum`}>
                        <Icon type="bars" />
                        行数监控
                    </Button>
                    <Button type="primary" disabled={this.currentView === ViewType.Hot} href={`/#/table/${this.tableId}/hot`}>
                        <Icon type="fire" />
                        热度监控
                    </Button>
                    <Button type="primary" disabled={this.currentView === ViewType.Nullvalue} href={`/#/table/${this.tableId}/nullvalue`}>
                        <Icon type="book" />
                        空值率监控
                    </Button>
                </Button.Group>
            </div>
        );
    }

    protected RenderBody(): JSX.Element {
        return (
            <Router>
                <div className="meta-table-main">
                    {
                        this.props.isCanAccess ?
                            <Switch>
                                <Route path="/table/:tableId/example" component={Example} />
                                <Route path="/table/:tableId/paritition" component={Partition} />
                                <Route path="/table/:tableId/fields" component={Fields} />
                                <Route path="/table/:tableId/lineage" component={Lineage} />
                                <Route path="/table/:tableId/rownum" component={RownumMonitor} key="/rownum" />
                                <Route path="/table/:tableId/hot" component={HotMonitor} key="/hot" />
                                <Route path="/table/:tableId/nullvalue" component={NullvalueMonit} key="/nullvalue" />
                            </Switch>
                            : <Empty>你没有权限查看这个数据表，请先申请权限！</Empty>}
                </div>
            </Router>

        )
    }

    protected RenderTitle(title: string): JSX.Element {
        return (
            <div className="meta-table-title">
                <h1>{title}</h1>
                {this.props.isCanAccess ?
                    <Popover content={this.RenderTableDetails()} title={`表详细信息`} trigger="hover">
                        <p>
                            {/* <span className="meta-table-title">表名：{this.props.tableName}</span> */}
                            <span>业务线：{this.props.businessName ? this.props.businessName : "其它"}</span>
                            <span>类型：{this.GetDisplayNameForTableTypeByTableType(this.props.tableType)}</span>
                            <span>总行数：{this.props.rowTotal}</span>
                            <span>描述：{this.props.description ? this.props.description : "无"}</span>
                        </p>
                    </Popover> : null
                }
            </div>
        )
    }

    @autobind
    private RenderTableDetails() {
        return (
            <Table<{ name: string, value: string | number | React.ReactNode }> rowKey="colum" dataSource={this.GetTableDetails()} size="small" pagination={false} showHeader={false} style={{ minWidth: 800 }}>
                <Table.Column<{ name: string, value: string | number | React.ReactNode }> width={100} key="name" dataIndex="name" />
                <Table.Column<{ name: string, value: string | number | React.ReactNode }> key="value" dataIndex="value" />
            </Table>

        )
    }

    @autobind
    private GetTableDetails(): Array<{ name: string, value: string | number | React.ReactNode }> {
        const tableExtend = this.GetTableExends();
        return [
            { name: "表名", value: this.props.tableName },
            { name: "数据库名", value: this.props.dbName },
            { name: "业务线", value: this.props.businessName },
            { name: "类型", value: <TableTypeTag tableType={this.props.tableType as 1 | 2 | ""} /> },
            { name: "总行数", value: this.props.rowTotal },
            // tslint:disable-next-line
            { name: "描述", value: <div>{this.props.description || "无"}<EditConfirmWindow value={this.props.description} onOk={(value) => this.props.EditTableDescription(this.tableId, value)} /></div> },
            // tslint:disable-next-line
            { name: "数仓负责人", value: <div>{tableExtend.hiveName}<EditConfirmWindow value={tableExtend.hiveName} onOk={(value) => this.props.UpdateTableExtend(this.tableId, "hive_name", value)} /></div> },
            // tslint:disable-next-line
            { name: "RD负责人", value: <div>{tableExtend.rdName}<EditConfirmWindow value={tableExtend.rdName} onOk={(value) => this.props.UpdateTableExtend(this.tableId, "rd_name", value)} /></div> },
            // tslint:disable-next-line
            { name: "伏羲任务", value: <div>{tableExtend.fuxiTaskId}<EditConfirmWindow value={tableExtend.fuxiTaskId} onOk={(value) => this.props.UpdateTableExtend(this.tableId, "fuxi_task_id", value)} /></div> },
            // tslint:disable-next-line
            { name: "UDA任务", value: <div>{tableExtend.udaTaskName}<EditConfirmWindow value={tableExtend.udaTaskName} onOk={(value) => this.props.UpdateTableExtend(this.tableId, "uda_task_name", value)} /></div> },
            { name: "存储路径", value: this.props.location },
            { name: "存储格式", value: this.props.format },
            { name: "内/外部表", value: this.props.tblType === "0" ? "内部表" : "外部表" },
            { name: "建表时间", value: moment(this.props.createTime * 1000).format('YYYY/MM/DD HH:mm:ss') },
            { name: "更新时间", value: moment(this.props.updateTime * 1000).format('YYYY/MM/DD HH:mm:ss') }
        ]
    }

    private  GetTableExends(): {rdName: string, hiveName: string, fuxiTaskId: string, udaTaskName: string}  {
        return {
            fuxiTaskId: this.props.extends.filter(d => d.name  === "fuxi_task_id").length > 0 ? this.props.extends.filter(d => d.name  === "fuxi_task_id")[0].value  : "",
            hiveName: this.props.extends.filter(d => d.name  === "hive_name").length > 0 ? this.props.extends.filter(d => d.name  === "hive_name")[0].value  : "",
            rdName: this.props.extends.filter(d => d.name  === "rd_name").length > 0 ? this.props.extends.filter(d => d.name  === "rd_name")[0].value  : "",
            udaTaskName: this.props.extends.filter(d => d.name  === "uda_task_name").length > 0 ? this.props.extends.filter(d => d.name  === "uda_task_name")[0].value  : "",
        }
    }

    private GetDisplayNameForTableTypeByTableType(tableType: string): string {
        return {
            1: "Hive",
            2: "Kylin"
        }[tableType]
    }

    @autobind
    private ExportExample(): void {
        new TableService().ExportExample(this.tableId);
    }

    @autobind
    private RefreshTableInfo(): void {
        this.props.GetTableInfo(this.tableId)
    }
}