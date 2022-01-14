import * as React from "react";
import "../style/ContentComponent.css";

export abstract class ContentComponent<TProps> extends React.Component<TProps, {}> {
    protected abstract get title(): string;

    public render(): JSX.Element {
        return (
            <div className="meta-content">
                {
                    this.RenderHeader() !== false ? <div className="meta-content-header">
                        {this.RenderTitle(this.title)}
                        {this.RenderHeader()}
                    </div> : null
                }
                <div className="meta-content-body">
                    <div>
                        {this.RenderBody()}
                    </div>
                </div>
                <div className="meta-content-footer">
                    <span>元数据管理平台</span>
                    <span>Copyright &copy; 2019 作业帮数据团队出品</span>
                </div>
            </div>
        )
    }

    protected RenderTitle(title: string): JSX.Element | undefined {
        return (
            <h1>{this.title}</h1>
        )
    }

    protected abstract RenderBody(): JSX.Element

    protected abstract RenderHeader(): JSX.Element | undefined | boolean
}