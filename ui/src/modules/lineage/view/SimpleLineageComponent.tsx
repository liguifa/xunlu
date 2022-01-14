import * as G6 from "@antv/g6";
import Icon from "antd/lib/icon";
import * as React from "react";
import { renderToString } from 'react-dom/server';
import { ITableItem } from "../common/TableItem";
import "../style/LineageComponent.css";
import { LineageChartComponent } from "./LineageChartComponent";

export default class LineageComponent extends LineageChartComponent {

    protected nodeShape: string = "simpleNode";

    protected edgeShape: string = "polyline";

    protected RegisterChartNode(): void {
        G6.registerNode('simpleNode', {
            draw: (item: { getGraphicGroup: () => { addShape: (type: string, data: { attrs: object }) => object }, getModel: () => ITableItem }) => {
                const group = item.getGraphicGroup();
                const model = item.getModel();
                const node: HTMLElement = G6.Util.createDOM(this.GetLineageSimpleNodeTemplate(model));
                if (this.IsTopLineageNode(model.id)) {
                    node.querySelector(".meta-lineage-plus")!.addEventListener("click", (e: MouseEvent) => this.props.onAddTableLineages(parseInt(model.id, 0)));
                }
                return group.addShape('dom', {
                    attrs: {
                        height: 50,
                        html: node,
                        width: 200,
                        x: 0,
                        y: 0,
                    }
                });
            }
        })
    }

    private GetLineageSimpleNodeTemplate(node: ITableItem): string {
        return renderToString((
            <div className="meta-lineage-simple-node">
                <div className="meta-lineage-simple-node-plus">
                    {this.RenderSpreadButton(node.id)}
                </div>
                <div className="meta-lineage-simple-node-title">
                    <a title={node.name} href={`/#/table/${node.id}/example`}>{node.name}</a>
                </div>
            </div>
        ))
    }

    private RenderSpreadButton(tableId: string): JSX.Element {
        return (
            <Icon style={{ color: !this.IsTopLineageNode(tableId) ? "#999" : "#333", cursor: "pointer" }} className="meta-lineage-plus" type="plus" key="plus" />
        )
    }
}