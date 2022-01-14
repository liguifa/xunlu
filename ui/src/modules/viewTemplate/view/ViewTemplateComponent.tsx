import Button from "antd/lib/button";
import Empty from "antd/lib/empty";
import Icon from "antd/lib/icon";
import Modal from "antd/lib/modal";
import autobind from "autobind-decorator";
import * as dot from "dot";
import { js_beautify } from "js-beautify";
import * as Prism from "prismjs";
import "prismjs/components/prism-sql";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/toolbar/prism-toolbar.css";
import "prismjs/plugins/toolbar/prism-toolbar.js";
import "prismjs/themes/prism.css";
import * as React from "react";
import CreateTemplate from "../../createTemplate";
import { IViewTemplateProps } from "../props/ViewTemplateProps";
import { ViewTemplateService } from "../service/ViewTemplateService";
import "../style/ViewTemplateComponent.css";

export class ViewTemplateComponent extends React.Component<IViewTemplateProps> {
    public static defaultProps: IViewTemplateProps = {
        ChangeCurrentTab: () => ({}),
        CloseViewTemplate: () => ({}),
        GetTemplates: () => ({}),
        OpenViewTemplate: () => ({}),
        ShowCreateTemplate: () => ({}),
        ShowEditTemplate: () => ({}),
        currentTab: 0,
        isAdmin: false,
        table: { name: "", fields: [] },
        tableId: 0,
        templates: [],
        visible: false,
    }

    public componentDidMount(): void {
        this.props.GetTemplates(this.props.tableId);
    }

    public render(): JSX.Element {
        return (
            <div className="meta-viewTemplate">
                <Button type="primary" onClick={this.props.OpenViewTemplate}>
                    <Icon type="profile" />
                    查询模板
                    </Button>
                <Modal title="查询模板" visible={this.props.visible} footer={null} width="70%" onCancel={this.props.CloseViewTemplate} maskClosable={false}>
                    {
                        this.props.templates.length > 0 ? <div style={{ width: "100%", height: "500px" }}>
                            <div className="meta-viewTemplate-header">
                                {this.RenderTabBars()}
                                {this.RenderExtraButtons()}
                            </div>
                            {this.RenderTabPanels()}
                        </div>
                            : <div style={{ width: "100%", height: "500px", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}><Empty description="还没有任何查询模板">
                                { this.props.isAdmin ? <Button type="primary" onClick={this.props.ShowCreateTemplate}>立即创建</Button> : null }
                                <CreateTemplate tableId={this.props.tableId} onOk={this.RefreshTemplates} /> 
                            </Empty></div>
                    }
                </Modal>
            </div>
        )
    }

    @autobind
    private RefreshTemplates(): void {
        this.props.GetTemplates(this.props.tableId);
    }

    private RenderCodeToHighlight(codeElement: HTMLDivElement): void {
        if (codeElement) {
            codeElement.className = "lang-sql line-numbers";
            codeElement.attributes["data-start"] = "-5";
            Prism.highlightElement(codeElement);
        }
    }

    private RenderTabBars(): JSX.Element {
        return (
            <ul className="meta-viewTemplate-tabbars">
                {
                    this.props.templates.map(template => (
                        <li onClick={this.onChangeCurrentTab} value={template.id} key={template.id} className={this.props.currentTab === template.id ? "meta-viewTemplate-tabbars-active" : ""}>{template.title}</li>
                    ))
                }
            </ul>

        )
    }

    private RenderTabPanels(): JSX.Element {
        return (
            <div className="meta-viewTemplate-panel">
                {
                    this.props.templates.map(template => (
                        <div key={template.id.toString()} style={{ display: this.props.currentTab === template.id ? "block" : "none" }}>
                            {
                                <pre className="line-numbers" data-label="作业帮数据团队">
                                    <div ref={this.RenderCodeToHighlight} style={{ height: "410px", background: "#fff", marginTop: "-10px" }} data-start="-5">
                                        {js_beautify(this.GetTemplateValue(template.text), { indent_size: 4, space_after_anon_function: true })}
                                    </div>
                                </pre>
                            }
                        </div>
                    ))
                }
            </div>
        )
    }

    @autobind
    private onChangeCurrentTab(event: React.MouseEvent<HTMLLIElement>): void {
        this.props.ChangeCurrentTab(parseInt(event.currentTarget.getAttribute("value")!, 0))
    }

    private RenderExtraButtons(): JSX.Element {
        return (
            <div className="meta-viewTemplate-extra">
                <Button.Group>
                    <Button onClick={this.props.ShowEditTemplate} >修改模板</Button>
                    <Button onClick={this.ExportSQLTemplate}>导出模板</Button>
                </Button.Group>
            </div>
        )
    }

    @autobind
    private ExportSQLTemplate(): void {
        new ViewTemplateService().ExportSQLTemplate(this.props.tableId)
    }

    @autobind
    private GetTemplateValue(text: string) {
        dot.templateSettings.varname = "table";
        const templateFn = dot.template(text);
        return templateFn(this.props.table);
    }
}