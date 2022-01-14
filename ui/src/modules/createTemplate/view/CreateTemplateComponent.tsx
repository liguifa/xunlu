import Alert from "antd/lib/alert";
import Divider from "antd/lib/divider";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Modal from "antd/lib/modal";
import autobind from "autobind-decorator";
import * as codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/sql/sql.js";
import 'codemirror/theme/material.css';
import * as React from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
import { EditMode } from '../common/EditMode';
import { ICreateTemplateProps } from "../props/CreateTemplateProps";

export class CreateTemplateComponent extends React.Component<ICreateTemplateProps> {
    public static defaultProps: ICreateTemplateProps = {
        ChangeValidateStatus: () => ({}),
        HideCreateTemplateWindow: () => ({}),
        SubmitTemplate: () => ({}),
        UpdateTemplate: () => ({}),
        isShow: false,
        mode: EditMode.Create,
        name: "",
        onOk: () => ({}),
        tableId: 0,
        templateId: 0,
        validateStatus: [],
        value: "",
    }

    private templateValue: string = "";

    private templateName: string = "";

    public componentDidUpdate(): void {
        if (this.templateName === "") {
            this.templateName = this.props.name;
        }
        if (this.templateValue === "") {
            this.templateValue = this.props.value;
        }
    }


    public render(): JSX.Element {
        return (
            <Modal zIndex={1002} title="添加模板" visible={this.props.isShow} width="800px" onCancel={this.props.HideCreateTemplateWindow} cancelText="取消" okText="确定" onOk={this.SubmitTemplate}>
                {
                    this.props.isShow ?
                        <Form>
                            <Form.Item validateStatus={this.getValidateStatusByItemKey("name")} hasFeedback={true} help={this.getValidateStatusByItemKey("name") === "error" ? "模板名称不能为空且必须在1-127个字符之间" : ""} style={{ display: "flex" }} label="名称" required={true} colon={false}>
                                {
                                    // tslint:disable-next-line
                                    <Input onInput={this.onTemplateNameChange} defaultValue={this.props.name} type="text" placeholder="模板名" style={{ width: "700px" }} />
                                }
                            </Form.Item>
                            <Divider orientation="left">SQL</Divider>
                            <Alert closable={true} message={(<span>模板中可使用table.fields和table.name代替表信息，其中table.fields为String类型数组, <a href='http://olado.github.io/doT/' target="_blank">模板语法</a></span>)} type="success" style={{ marginBottom: 10 }} />
                            <Form.Item colon={false} validateStatus={this.getValidateStatusByItemKey("sql")} hasFeedback={false} help={this.getValidateStatusByItemKey("sql") === "error" ? "SQL内容不能为空" : ""}>
                                {
                                    // tslint:disable-next-line
                                    <CodeMirror value={this.props.value} onChange={this.onTemplateValueChange} options={{ mode: 'sql', theme: 'material', lineNumbers: true }} />
                                }
                            </Form.Item>
                        </Form> : null
                }
            </Modal>
        )
    }

    @autobind
    private getValidateStatusByItemKey(key: string) {
        if (this.props.validateStatus.filter(item => item.itemKey === key).length > 0) {
            return this.props.validateStatus.filter(item => item.itemKey === key)[0].status;
        }
        return "";
    }

    @autobind
    private SubmitTemplate(): void {
        if (this.ValidateForm()) {
            if (this.props.mode === EditMode.Create) {
                this.props.SubmitTemplate(this.props.tableId, this.templateName, this.templateValue);
            } else {
                this.props.UpdateTemplate(this.props.templateId, this.templateName, this.templateValue);
            }
            this.props.onOk();
        }
    }

    @autobind
    private ValidateForm(): boolean {
        let isSuccess: boolean = true;
        const validateStatus: Array<{ itemKey: string, status: "success" | "warning" | "error" | "validating" | "" }> = [];
        if (this.templateName === "" || this.templateName.length > 127) {
            isSuccess = false;
            validateStatus.push({ itemKey: "name", status: "error" });
        } else {
            validateStatus.push({ itemKey: "name", status: "success" });
        }

        if (this.templateValue === "") {
            isSuccess = false;
            validateStatus.push({ itemKey: "sql", status: "error" });
        } else {
            validateStatus.push({ itemKey: "sql", status: "success" });
        }

        this.props.ChangeValidateStatus(validateStatus);
        return isSuccess;
    }

    @autobind
    private onTemplateNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.templateName = e.currentTarget.value;
        const nameStatus: { itemKey: string, status: "success" | "warning" | "error" | "validating" | "" } = { itemKey: "name", status: this.templateName === "" || this.templateName.length > 127 ? "error" : "success" };
        const validateStatus = this.props.validateStatus.map(item => ({ ...item, status: nameStatus.itemKey === item.itemKey ? nameStatus.status : item.status }));
        this.props.ChangeValidateStatus(validateStatus);
    }

    @autobind
    private onTemplateValueChange(editer: codemirror.Editor, data: codemirror.EditorChange, value: string) {
        this.templateValue = value;
        const nameStatus: { itemKey: string, status: "success" | "warning" | "error" | "validating" | "" } = { itemKey: "sql", status: this.templateValue === "" ? "error" : "success" };
        const validateStatus = this.props.validateStatus.map(item => ({ ...item, status: nameStatus.itemKey === item.itemKey ? nameStatus.status : item.status }));
        this.props.ChangeValidateStatus(validateStatus);
    }
}