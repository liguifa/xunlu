import Button from "antd/lib/button";
import Form from "antd/lib/form";
import Icon from "antd/lib/icon";
import Input from "antd/lib/input";
import Modal from "antd/lib/modal";
import Select from "antd/lib/select";
import Switch from "antd/lib/switch";
import Tooltip from "antd/lib/tooltip";
import autobind from "autobind-decorator";
import * as React from "react";
import CreateTemplate from "../../createTemplate";
import { IEditTableProps } from "../props/EditTableProps";
import "../style/EditTableComponent.css";

export class EditTableComponent extends React.Component<IEditTableProps> {
    public static defaultProps: IEditTableProps = {
        EditTable: () => ({}),
        GetAllTemplates: () => ({}),
        GetBusinessForAdmin: () => ({}),
        HideEditTableWindow: () => ({}),
        ShowCreateTemplate: () => ({}),
        ShowEditTableWindow: () => ({}),
        allBusinesses: [],
        businessId: "0",
        businessName: "其它",
        buttonText: "编辑表信息",
        description: "",
        id: 0,
        isAdmin: false,
        isSecret: false,
        name: "",
        onOk: () => ({}),
        templateIds: [],
        templates: [],
        type: 1,
        visible: false,
    }

    private isSecret: boolean = this.props.isSecret;
    private businessId: string = this.props.businessId;
    private templateIds: number[] = this.props.templateIds;
    private description: string = this.props.description;

    public componentDidMount(): void {
        this.isSecret = this.props.isSecret;
        this.businessId = this.props.businessId;
        this.templateIds = this.props.templateIds;
        this.description = this.props.description;
        this.props.GetAllTemplates();
        this.props.GetBusinessForAdmin();
    }

    public render(): JSX.Element {
        return (
            <div className="meta-viewTemplate">
                <Button type="primary" onClick={this.props.ShowEditTableWindow} disabled={!this.props.isAdmin}>
                    <Icon type="edit" />
                    {this.props.buttonText}
                </Button>
                <Modal title={this.props.buttonText} zIndex={1001} visible={this.props.visible} width="800px" onCancel={this.props.HideEditTableWindow} okText="确定" cancelText="取消" onOk={this.SaveEditTableForm}>
                    <Form labelCol={{xs: { span: 2 }, sm: { span: 2 }}}>
                        <Form.Item style={{ display: "flex" }} label="表名" required={true} colon={false} help="数据表的名称，不可修改">
                            <Input disabled={true} defaultValue={this.props.name} type="text" placeholder="账号" style={{ width: "680px" }} />
                        </Form.Item>
                        <Form.Item style={{ display: "flex" }} label="类型" required={true} colon={false} help="数据表的类型，不可修改">
                            <Input disabled={true} defaultValue={this.props.type === 1 ? "Hive" : "Kylin"} type="text" placeholder="密码" style={{ width: "680px" }} />
                        </Form.Item>
                        <Form.Item style={{ display: "flex" }} label="敏感" required={true} colon={false} help="敏感表只有部分用户可查看">
                            <Switch onChange={this.OnIsSecretChange} defaultChecked={this.props.isSecret} checkedChildren="是" unCheckedChildren="否" />
                        </Form.Item>
                        <Form.Item style={{ display: "flex" }} label="业务" colon={false} help="设置数据表位于那条业务线下">
                            <Select onChange={this.OnBusinessChange} showSearch={true} style={{ width: "680px" }} placeholder="设置数据表位于那条业务线下" defaultValue={this.props.businessName}>
                                {
                                    this.props.allBusinesses.map(business => (
                                        <Select.Option key={business.id.toString()} value={business.id}>{business.name}</Select.Option>
                                    ))
                                }
                                <Select.Option key="0" value={0}>其它</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item style={{ display: "flex" }} label="模板" colon={false} help="设置数据表的查询模板">
                            <div className="meta-editTable-template">
                                <Select onChange={this.OnTemplateIdsChange} defaultValue={this.props.templateIds} mode="multiple" showSearch={true} style={{ width: "620px" }} placeholder="设置数据表的查询模板">
                                    {
                                        this.props.templates.map(template => (<Select.Option value={template.id}>{template.name}</Select.Option>))
                                    }
                                </Select>
                                {this.RenderTemplateInputSuffix()}
                            </div>
                        </Form.Item>
                        <Form.Item style={{ display: "flex" }} label="描述" colon={false} help="设置数据表的描述信息">
                            <Input.TextArea onInput={this.OnDescriptionChange} defaultValue={this.props.description} rows={4} placeholder="设置数据表的描述信息" style={{ width: "680px" }} />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }

    @autobind
    private OnIsSecretChange(isSecret: boolean): void {
        this.isSecret = isSecret;
    }

    @autobind
    private OnBusinessChange(businessId: string): void {
        this.businessId = businessId
    }

    @autobind
    private OnTemplateIdsChange(values: number[]): void {
        this.templateIds = values;
    }

    @autobind
    private OnDescriptionChange(e: React.FormEvent<HTMLTextAreaElement>): void {
        this.description = e.currentTarget.value!;

    }

    private RenderTemplateInputSuffix(): JSX.Element {
        return (
            <div className="meta-editTable-buttons">
                <Tooltip placement="bottom" title="添加模板">
                    <Icon type="plus" onClick={this.props.ShowCreateTemplate} />
                    <CreateTemplate tableId={this.props.id} onOk={this.props.GetAllTemplates} />
                </Tooltip>
                <Tooltip placement="bottom" title="刷新模板">
                    <Icon type="redo" onClick={this.props.GetAllTemplates} />
                </Tooltip>
            </div>
        )
    }

    @autobind
    private SaveEditTableForm() {
        this.props.EditTable(this.props.id, this.isSecret, this.businessId, this.templateIds, this.description);
        this.props.onOk();
    }

    
}