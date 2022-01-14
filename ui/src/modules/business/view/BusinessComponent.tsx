import Button from "antd/lib/button";
import Table from "antd/lib/table";
import autobind from "autobind-decorator";
import * as moment from "moment";
import * as React from "react";
import ContentComponent from "../../content";
import CreateBusiness from "../../createBusiness";
import EditBusiness from "../../editBusiness";
import { Crumbs } from "../../header";
import { IBusinessItem } from "../common/BusinessItem";
import { IBusinessProps } from "../props/BussinessProps";
import "../style/BusinessComponent.css";

@Crumbs<typeof BusinessComponent>([{ icon: "home", url: "/", title: "首页" }, {title: "业务线管理"}])
export class BusinessComponent extends ContentComponent<IBusinessProps> {
    protected title: string = "业务线管理";

    public componentDidMount(): void {
        this.props.GetAllBusinesses();
    }

    protected RenderBody(): JSX.Element {
        return (
            <Table<IBusinessItem> dataSource={this.props.items} pagination={false} scroll={{ y: document!.documentElement!.clientHeight - 410 }}>
                <Table.Column<IBusinessItem> key="key" width={60} title="#" dataIndex="index" />
                <Table.Column<IBusinessItem> key="name" title="名称" dataIndex="name" />
                <Table.Column<IBusinessItem> key="numberForTable" width={120} title="表个数" align="center" dataIndex="numberForTable" />
                <Table.Column<IBusinessItem> key="createdTime" width={260} title="创建时间" align="center" dataIndex="createdTime" render={this.RenderTimeColumn} />
                <Table.Column<IBusinessItem> key="actions" width={190} title="操作" align="center" dataIndex="id" render={this.RenderActionsColumn} />
            </Table>
        )
    }

    protected RenderHeader(): JSX.Element | undefined {
        return undefined
    }

    protected RenderTitle(title: string): JSX.Element {
        return (
            <div className="meta-business-title">
                <h1>{title}</h1>
                <CreateBusiness onOk={this.props.GetAllBusinesses} />
                <EditBusiness onOk={this.props.GetAllBusinesses} />
            </div>
        )
    }

    private RenderTimeColumn(time: number): JSX.Element {
        const displayTime = moment(time * 1000).format('YYYY/MM/DD hh:mm:ss')
        return (
            <div>
                {displayTime}
            </div>
        )
    }

    @autobind
    private RenderActionsColumn(id: number): JSX.Element {
        return (
            <Button type="primary" size="small" icon="edit" key={id} value={id} onClick={this.OnShowEditBusiness}>编辑</Button>
        )
    }

    @autobind
    private OnShowEditBusiness(e: React.MouseEvent<HTMLButtonElement>) {
        this.props.ShowEditBusiness(parseInt(e.currentTarget.value, 0))
    }
}