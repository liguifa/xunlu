import Button from "antd/lib/button";
import Checkbox, { CheckboxChangeEvent } from "antd/lib/checkbox";
import Divider from "antd/lib/divider";
import Modal from "antd/lib/modal";
import { PaginationConfig } from "antd/lib/pagination";
import Table from "antd/lib/table";
import Tooltip from "antd/lib/tooltip";
import autobind from "autobind-decorator";
import * as React from "react";
import { ITableItem } from "../common/TableItem";
import { IChooseTablesProps } from "../props/ChooseTablesProps";
import "../style/ChooseTablesComponent.css";

export class ChooseTablesComponent extends React.Component<IChooseTablesProps> {
    public static defaultProps: IChooseTablesProps = {
        ChangeActives: () => ({}),
        GetTables: () => ({}),
        HideChooseWindow: () => ({}),
        ShowChooseWindow: () => ({}),
        actives: [],
        buttonSize: "small",
        buttonTitle: "选择数据表",
        className: "",
        defaultActives: [],
        isIncludeSceret: true,
        isShow: false,
        items: [],
        onOk: () => ({}),
        pageIndex: 1,
        total: 0,
    }

    public componentDidMount(): void {
        this.props.GetTables(1, this.props.isIncludeSceret);
        this.props.ChangeActives(this.props.defaultActives);
    }

    public render(): JSX.Element {
        return (
            <div className={this.props.className}>
                <Button size={this.props.buttonSize} onClick={this.props.ShowChooseWindow}>{this.props.buttonTitle}</Button>
                <Modal title="选择数据表" visible={this.props.isShow} width="800px" onCancel={this.props.HideChooseWindow} okText="确定" cancelText="取消" onOk={this.OnConfirmActvies}>
                    <Divider orientation="left">数据表</Divider>
                    <Table<ITableItem> dataSource={this.props.items} pagination={{ total: this.props.total, pageSize: 5, current: this.props.pageIndex }} size="small" onChange={this.OnChangeTablesState}>
                        <Table.Column<ITableItem> key="key" width={60} title="#" dataIndex="id" render={this.RednerCheckboxColumn} />
                        <Table.Column<ITableItem> key="name" title="名称" width={240} dataIndex="name" render={this.RenderNameColumn} />
                        <Table.Column<ITableItem> key="business" width={250} title="业务线" dataIndex="business" />
                        <Table.Column<ITableItem> key="description" title="描述" dataIndex="description" render={this.RenderDscriptionColumn} />
                    </Table>
                    <Divider orientation="left">已选项</Divider>
                    <Table<ITableItem> dataSource={this.props.actives} size="small" pagination={{ pageSize: 5 }}>
                        <Table.Column<ITableItem> key="key" width={60} title="#" dataIndex="index" />
                        <Table.Column<ITableItem> key="name" title="名称" width={120} dataIndex="name" render={this.RenderNameColumn} />
                        <Table.Column<ITableItem> key="description" title="描述" dataIndex="description" render={this.RenderDscriptionColumn} />
                        <Table.Column<ITableItem> key="id" title="移除" dataIndex="id" render={this.RenderRemoveColumn} />
                    </Table>
                </Modal>
            </div>
        )
    }

    private RenderNameColumn(name: string): JSX.Element {
        return (
            <div className="meta-choose-tables-name">
                <Tooltip placement="topLeft" title={name}>
                    {name}
                </Tooltip>
            </div>
        )
    }

    private RenderDscriptionColumn(description: string): JSX.Element {
        return (
            <Tooltip placement="topLeft" title={description}>
                <p className="meta-choose-tables-description">{description}</p>
            </Tooltip>
        )
    }

    @autobind
    private RednerCheckboxColumn(id: number): JSX.Element {
        const isChecked = this.props.actives.filter(active => active.id === id).length > 0;
        return (<Checkbox value={id} key={id} checked={isChecked} onChange={this.OnCheckboxChange} />)
    }

    @autobind
    private OnCheckboxChange(e: CheckboxChangeEvent): void {
        let newActivces = this.props.actives.map(active => active);
        if (e.target.checked && this.props.actives.filter(active => active.id === e.target.value!).length === 0) {
            const current = this.props.items.filter(item => item.id === e.target.value!)[0];
            newActivces.push(current);
        }
        else if (!e.target.checked) {
            newActivces = newActivces.filter(active => active.id !== e.target.value!);
        }
        this.props.ChangeActives(newActivces);
    }

    @autobind
    private OnChangeTablesState(pagination: PaginationConfig): void {
        this.props.GetTables(pagination.current!, this.props.isIncludeSceret);
    }

    @autobind
    private RenderRemoveColumn(id: number): JSX.Element {
        return (
            <Button onClick={this.RemoveActiveItem} value={id} size="small" type="danger" icon="delete" />
        )
    }

    @autobind
    private RemoveActiveItem(e: React.MouseEvent<HTMLButtonElement>): void {
        const id = parseInt(e.currentTarget.value, 0);
        const newActives = this.props.actives.filter(active => active.id !== id);
        this.props.ChangeActives(newActives);
    }

    @autobind
    private OnConfirmActvies(): void {
        this.props.onOk(this.props.actives);
        this.props.HideChooseWindow();
    }
}