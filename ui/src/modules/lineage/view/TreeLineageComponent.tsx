import * as G6 from "@antv/g6";
import "../style/LineageComponent.css";
import { LineageChartComponent } from "./LineageChartComponent";

export default class TreeLineageComponent extends LineageChartComponent {

    protected nodeShape: string = "treeNode";

    protected edgeShape: string = "smooth";

    protected plugins: string[] = ["tool.tooltip"];

    private markEdges: string[] = [];

    protected RegisterChartNode(): void {
        G6.registerNode('treeNode', {
            anchor: [[0, 0.5], [1, 0.5]]
        });
    }

    protected RegisterChartEdge(): void {
        G6.registerEdge('smooth', {
            getPath: (item: { getPoints: () => Array<{ x: number, y: number }> }) => {
                const points = item.getPoints();
                const start = points[0];
                const end = points[points.length - 1];
                const hgap = Math.abs(end.x - start.x);
                if (end.x > start.x) {
                    return [['M', start.x, start.y], ['C', start.x + hgap / 4, start.y, end.x - hgap / 2, end.y, end.x, end.y]];
                }
                return [['M', start.x, start.y], ['C', start.x - hgap / 4, start.y, end.x + hgap / 2, end.y, end.x, end.y]];
            },
        });
    }

    protected GetLineageChart(attr: object): G6.Graph {
        return new G6.Tree(attr);
    }

    protected GetLineageChartAttr(): object {
        return {
            fitView: 'autoZoom',
            layout: new G6.Layouts.CompactBoxTree({
                getHGap: () => 100,
                getVGap: () => 10
            }),
        }
    }

    protected GetLineageNodeAttr(): object {
        return {
            label: (model: { children: [], name: string }) => {
                if (model.children && model.children.length > 0) {
                    return {
                        text: model.name,
                        textAlign: 'right'
                    };
                }
                return {
                    text: model.name,
                    textAlign: 'left'
                };
            },
            labelOffsetX: (model: { children: [], name: string }) => {
                if (model.children && model.children.length > 0) {
                    return -10;
                }
                return 10;
            },
            size: 8,
        }
    }

    protected GetLineageEdgeAttr(): object {
        return {
            style: {
                startArrow: true
            }
        }
    }

    protected GetLineageChartData(): object {
        this.markEdges = [];
        return {
            roots: [this.GetLineageNodeModel(this.props.currentId)]
        }
    }

    private GetLineageNodeModel(nodeId: string): object | null {
        const nodes = this.props.lineage!.nodes.filter(node => node.id === nodeId);
        return nodes.length > 0 ? { name: nodes[0].name, children: this.GetLineageNodeModelChildren(nodeId), description: nodes[0].description } : {children: []};
    }

    private GetLineageNodeModelChildren(nodeId: string): object {
        const edges = this.props.lineage!.edges.filter(edge => edge.target === nodeId && this.markEdges.filter(mark => mark === `${edge.source}_${edge.target}`).length === 0);
        this.markEdges = this.markEdges.concat(edges.map(edge => `${edge.source}_${edge.target}`));
        return edges.map(edge => this.GetLineageNodeModel(edge.source))
            .filter(node => node);
    }
}