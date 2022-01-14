import Button from "antd/lib/button";
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
import { ICreateBusinessProps } from "../props/CreateBusinessProps";
import "../style/CreateBusinessComponent.css";

export class CreateBusinessComponent extends React.Component<ICreateBusinessProps> {
    public static defaultProps: ICreateBusinessProps = {
        ChangeActives: () => ({}),
        HideWindow: () => ({}),
        SaveBusiness: () => ({}),
        ShowWindow: () => ({}),
        actives: [],
        isShow: false,
        onOk: () => ({}),
    }

    private mBusinessName: string;

    public render(): JSX.Element {
        return (
            <div key={this.props.key}>
                {this.RenderButton()}
                <Modal title="添加业务线" visible={this.props.isShow} width="800px" onCancel={this.props.HideWindow} okText="确定" cancelText="取消" onOk={this.OnCreateBusiness}>
                    <Form>
                        <Form.Item style={{ display: "flex" }} label="名称" required={true} colon={false}>
                            <Input onInput={this.OnBusinessNameChange} type="text" placeholder="业务线名称" style={{ width: 700 }} />
                        </Form.Item>
                        <Divider orientation="left">数据表</Divider>
                        { this.props.isShow ? <ChooseTables onOk={this.props.ChangeActives} className="meta-create-business-choose" /> : null }
                        <Table<ITableItem> dataSource={this.props.actives} size="small">
                            <Table.Column<ITableItem> key="key" width={60} title="#" dataIndex="index" />
                            <Table.Column<ITableItem> key="name" title="名称" width={120} dataIndex="name" render={this.RenderNameColumn} />
                            <Table.Column<ITableItem> key="description" title="描述" dataIndex="description" render={this.RenderDscriptionColumn} />
                        </Table>
                    </Form>
                </Modal>
            </div>
        )
    }

    protected RenderButton(): JSX.Element {
        return (
            <Button onClick={this.props.ShowWindow}>添加业务线</Button>
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
    private OnCreateBusiness(): void {
        this.props.SaveBusiness(this.mBusinessName, this.props.actives);
        this.props.onOk();
    }
}