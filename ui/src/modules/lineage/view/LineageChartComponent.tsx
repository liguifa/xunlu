import * as G6 from "@antv/g6";
import "@antv/g6/build/plugin.behaviour.analysis.js";
import "@antv/g6/build/plugin.edge.polyline.js";
import "@antv/g6/build/plugin.layout.dagre.js";
import "@antv/g6/build/plugin.tool.tooltip.js";
import * as React from "react";
import { ITableItem } from "../common/TableItem";
import { ILineageChartProps } from "../props/LineageComponentProps";

export abstract class LineageChartComponent extends React.Component<ILineageChartProps> {
    public static defaultProps: ILineageChartProps = {
        currentId: "",
        lineage: undefined,
        onAddTableLineages: () => ({}),
        onShowTableInfo: () => ({}),
        onUnWatchTable: () => ({})
    }

    protected abstract nodeShape: string;

    protected abstract edgeShape: string;

    protected plugins: string[] = ["layout.dagre", "tool.tooltip"];

    protected modes: string[] = ['panCanvas', 'wheelZoom'];

    private chartNode: HTMLDivElement;

    public componentDidMount(): void {
        this.RegisterChartNode();
        this.RegisterChartEdge();
        if (this.props.lineage && this.props.lineage.edges.length > 0) {
            this.RenderLineageChart();
        }
    }

    public componentDidUpdate(): void {
        if (this.props.lineage && this.props.lineage.edges.length > 0) {
            this.RenderLineageChart();
        }
    }

    public render(): JSX.Element {
        return (
            <div id="meta-lineage-chart" ref={node => this.chartNode = node!} />
        );
    }

    protected abstract RegisterChartNode(): void;

    protected RegisterChartEdge(): void {
        // Empty
    }

    protected IsTopLineageNode(tableId: string): boolean {
        return this.props.lineage!.edges.filter(lineage => lineage.target === tableId).length === 0
    }

    protected GetLineageNodeAttr(): object {
        return {};
    }

    protected GetLineageEdgeAttr(): object {
        return {};
    }

    protected GetLineageChartData(): object {
        return {
            edges: this.props.lineage!.edges.map(e => ({ ...e })),
            nodes: this.props.lineage!.nodes.map(n => ({ ...n })),
        };
    }

    protected GetLineageChart(attr: object): G6.Graph {
        return new G6.Graph(attr);
    }

    protected GetLineageChartAttr(): object {
        return {};
    }

    private GetLineageNode() {
        return {
            shape: this.nodeShape,
            tooltip(model: ITableItem) {
                return [
                    ["表名", model.name],
                    ["描述", model.description]
                ]
            },
            ...this.GetLineageNodeAttr()
        }
    }

    private GetLineageGraphAttr(): object {
        return {
            container: 'meta-lineage-chart',
            defaultIntersectBox: 'rect',
            fitView: 'cc',
            height: screen.height,
            modes: {
                default: this.modes
            },
            plugins: this.plugins.map(p => new G6.Plugins[p]()),
            renderer: "svg",
            width: screen.width,
            ...this.GetLineageChartAttr()
        }
    }

    private GetLineageEdge() {
        return {
            shape: this.edgeShape,
            style: {
                endArrow: true,
            },
            ...this.GetLineageEdgeAttr()
        }
    }

    private RenderLineageChart(): void {
        this.chartNode.innerHTML = "";
        const graph = this.GetLineageChart(this.GetLineageGraphAttr());
        graph.node(this.GetLineageNode());
        graph.edge(this.GetLineageEdge());
        graph.read(this.GetLineageChartData());
    }
}