import Button from "antd/lib/button";
import Input from "antd/lib/input";
import Popconfirm from "antd/lib/popconfirm";
import Table, {  PaginationConfig, SorterResult } from "antd/lib/table";
import autobind from "autobind-decorator";
import * as React from "react";
import ContentComponent from "../../content";
import CreateTemplate from "../../createTemplate";
import { Crumbs } from "../../header";
import { ITemplate } from "../common/TemplateItem";
import { ITemplateProps } from "../props/TemplateProps";
import "../style/TemplateComponent.css";

@Crumbs<typeof TemplateComponent>([{ icon: "home", url: "/", title: "首页" }, { title: "查询模板管理"}])
export class TemplateComponent extends ContentComponent<ITemplateProps> {
    protected title: string = "查询模板管理";

    private searchKey: string = "";

    public componentDidMount(): void {
        this.props.GetTemplates(1, "");
    }

    protected RenderBody(): JSX.Element {
        return (
            <div>
                <div className="meta-template-search">
                    <Input.Search placeholder="搜索模板名" style={{ width: 300 }} onSearch={this.SearchTemplates} />
                </div>
                <Table<ITemplate> dataSource={this.props.items} pagination={{ current: this.props.pageIndex, pageSize: 20, total: this.props.total }} scroll={{ y: document!.documentElement!.clientHeight - 410 }} onChange={this.ChangeTableState}>
                    <Table.Column<ITemplate> key="key" width={60} title="#" dataIndex="index" />
                    <Table.Column<ITemplate> key="name" title="名称" dataIndex="name" />
                    <Table.Column<ITemplate> key="actions" width={190} title="操作" align="center" dataIndex="id" render={this.RenderActionsColumn} />
                </Table>
            </div>
        )
    }

    protected RenderHeader(): JSX.Element | undefined {
        return undefined
    }

    protected RenderTitle(title: string): JSX.Element {
        return (
            <div className="meta-template-title">
                <h1>{title}</h1>
                <Button onClick={this.props.ShowCreateTemplate}>添加查询模板</Button>
                <CreateTemplate onOk={this.RefreshTemplates} />
            </div>
        )
    }

    @autobind
    private SearchTemplates(value: string) {
        this.searchKey = value;
        this.RefreshTemplates();
    }

    @autobind
    private ChangeTableState(pagination: PaginationConfig, filters: Record<keyof ITemplate, string[]>, sorter: SorterResult<ITemplate>): void {
        this.props.GetTemplates!(pagination.current!, this.searchKey);
    }

    @autobind
    private RefreshTemplates(): void {
        this.props.GetTemplates(1, this.searchKey);
    }

    @autobind
    private RenderActionsColumn(id: number, template: ITemplate): JSX.Element {
        return (
            <div>
                {
                    // tslint:disable-next-line 
                    <Button type="primary" size="small" icon="edit" key={"edit-" + id} value={id} style={{ marginRight: 10 }} onClick={() => this.props.UpdateTemplate(template.id, template.name, template.value)}>编辑</Button>
                }
                {
                    // tslint:disable-next-line
                    <Popconfirm title="你确定要删除这个模板吗？" onConfirm={() => this.RemoveTemplate(id)} okText="确定" cancelText="取消">
                        <Button type="danger" size="small" icon="delete" key={"delete-" + id} value={id}>删除</Button>
                    </Popconfirm>
                }
            </div>
        )
    }

    private RemoveTemplate(templateId: number): void {
        this.props.RemoveTemplate(templateId);
        this.RefreshTemplates();
    }
}