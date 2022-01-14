import Divider from "antd/lib/divider";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Modal from "antd/lib/modal";
import Table from "antd/lib/table";
import Tooltip from "antd/lib/tooltip";
import autobind from "autobind-decorator";
import * as React from "react";
import ChooseTables from "../../chooseTables";
import { ITableItem } from "../common/TableItem";
import { IEditBusinessProps } from "../props/EditBusinessProps";
import "../style/EditBusinessComponent.css";

export class EditBusinessComponent extends React.Component<IEditBusinessProps, { isShow: boolean }> {
    public static defaultProps: IEditBusinessProps = {
        ChangeActives: () => ({}),
        HideWindow: () => ({}),
        SaveBusiness: () => ({}),
        ShowWindow: () => ({}),
        actives: [],
        businessId: 0,
        businessName: "",
        isShow: false,
        onOk: () => ({}),
    }

    private mBusinessName: string 

    public render(): JSX.Element {
        return (
            <Modal title="编辑业务线" visible={this.props.isShow} width="800px" onCancel={this.props.HideWindow} okText="确定" cancelText="取消" onOk={this.OnEditBusiness}>
                <Form>
                    <Form.Item style={{ display: "flex" }} label="名称" required={true} colon={false}>
                        <Input onInput={this.OnBusinessNameChange} defaultValue={this.props.businessName} type="text" placeholder="业务线名称" style={{ width: 700 }} />
                    </Form.Item>
                    <Divider orientation="left">数据表</Divider>
                    { this.props.isShow ? <ChooseTables onOk={this.props.ChangeActives} defaultActives={this.props.actives} className="meta-create-business-choose" /> : null }
                    <Table<ITableItem> dataSource={this.props.actives} size="small">
                        <Table.Column<ITableItem> key="key" width={60} title="#" dataIndex="index" />
                        <Table.Column<ITableItem> key="name" title="名称" width={120} dataIndex="name" render={this.RenderNameColumn} />
                        <Table.Column<ITableItem> key="description" title="描述" dataIndex="description" render={this.RenderDscriptionColumn} />
                    </Table>
                </Form>
            </Modal>
        )
    }

    private RenderNameColumn(name: string): JSX.Element {
        return (
            <div className="meta-create-business-name">
                <Tooltip placement="topLeft" title={name}>
                    {name}
                </Tooltip>
            </div>
        )
    }

    private RenderDscriptionColumn(description: string): JSX.Element {
        return (
            <Tooltip placement="topLeft" title={description}>
                <p className="meta-create-business-description">{description}</p>
            </Tooltip>
        )
    }

    @autobind
    private OnBusinessNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
        this.mBusinessName = e.currentTarget.value;
    }

    @autobind
    private OnEditBusiness(): void {
        this.props.SaveBusiness(this.props.businessId, this.mBusinessName ? this.mBusinessName : this.props.businessName, this.props.actives);
        this.props.onOk();
    }
}