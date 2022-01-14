import * as G6 from "@antv/g6";
import Avatar from "antd/lib/avatar";
import Card from "antd/lib/card";
import Icon from "antd/lib/icon";
import Tooltip from "antd/lib/tooltip";
import * as React from "react";
import { renderToString } from 'react-dom/server';
import { ITableItem } from "../common/TableItem";
import "../style/LineageComponent.css";
import { LineageChartComponent } from "./LineageChartComponent";

export default class DetailedLineageComponent extends LineageChartComponent {
    protected nodeShape: string = "detailedNode";

    protected edgeShape: string = "polyline";

    protected RegisterChartNode(): void {
        G6.registerNode('detailedNode', {
            draw: (item: { getGraphicGroup: () => { addShape: (type: string, data: { attrs: object }) => object }, getModel: () => ITableItem }) => {
                const group = item.getGraphicGroup();
                const model = item.getModel();
                const node: HTMLElement = G6.Util.createDOM(this.GetLineageDetailedNodeTemplate(model));
                if (this.IsCanUnWatchLingeageNode(model.id)) {
                    node.querySelector(".meta-lineage-watch")!.addEventListener("click", (e: MouseEvent) => this.props.onUnWatchTable(model.id));
                }
                if (this.IsTopLineageNode(model.id)) {
                    node.querySelector(".meta-lineage-plus")!.addEventListener("click", (e: MouseEvent) => this.props.onAddTableLineages(parseInt(model.id, 0)));
                }
                node.querySelector(".meta-lineage-exclamation")!.addEventListener("click", (e: MouseEvent) => this.props.onShowTableInfo(model));
                return group.addShape('dom', {
                    attrs: {
                        height: 163,
                        html: node,
                        width: 300,
                        x: 0,
                        y: 0,
                    }
                });
            },
        });
    }

    private GetLineageDetailedNodeTemplate(node: ITableItem): string {
        return renderToString((
            <Card style={{ width: 300, opacity: 1, position: "static" }} actions={[this.RenderSpreadButton(node.id), this.RenderWatchButton(node.id), this.RenderInfoButton()]}>
                <Card.Meta avatar={<Avatar style={{ position: "static" }} src={this.GetTableLogoByTableType(node.type)} />} title={this.renderTableNameColumn(node)} description={node.description} />
            </Card>));
    }

    private GetTableLogoByTableType(type: number | string): string {
        return {
            1: require("../../../assets/hive_logo_medium.jpg"),
            2: require("../../../assets/kylin_logo.png")
        }[type]
    }

    private RenderSpreadButton(tableId: string): JSX.Element {
        return (
            <Icon style={{ color: !this.IsTopLineageNode(tableId) ? "#999" : "#333", cursor: "pointer" }} className="meta-lineage-plus" type="plus" key="plus" />
        )
    }

    private RenderWatchButton(tableId: string): JSX.Element {
        return (
            <Tooltip title="不看该表">
                {
                    // tslint:disable-next-line
                    <Icon style={{ color: !this.IsCanUnWatchLingeageNode(tableId) ? "#999" : "#333" }} className="meta-lineage-watch" type="eye-invisible" key="eye" />
                }
            </Tooltip>
        )
    }

    private IsCanUnWatchLingeageNode(tableId: string): boolean {
        return this.props.lineage!.edges.filter(lineage => lineage.target === tableId).length === 0
    }

    private RenderInfoButton(): JSX.Element {
        return (
            <Icon className="meta-lineage-exclamation" type="exclamation" style={{ color: "#333" }} />
        )
    }

    private renderTableNameColumn(node: ITableItem): JSX.Element {
        return (
            <div className="meta-lineage-tablename">
                <Tooltip placement="topLeft" title={node.name}>
                    <a href={`/#/table/${node.id}/example`}>{node.name}</a>
                </Tooltip>
            </div>
        )
    }
}