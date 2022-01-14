import Button from "antd/lib/button";
import Empty from "antd/lib/empty";
import Radio, { RadioChangeEvent } from "antd/lib/radio";
import autobind from "autobind-decorator";
import fullscreen from "fullscreen";
import * as React from "react";
import { ILineage, ViewModel } from "../common/Lineage";
import { ITableItem } from "../common/TableItem";
import { ILineageComponentProps } from "../props/LineageComponentProps";
import "../style/LineageComponent.css";
import DetailedLineage from "./DetailedLineageComponent";
import LineageTableInfo from "./LineageTableInfoComponent";
import SimpleLineage from "./SimpleLineageComponent";
import TreeLineage from "./TreeLineageComponent";

export class LineageComponent extends React.Component<ILineageComponentProps> {
    public static defaultProps: ILineageComponentProps = {
        AddTableLineages: () => ({}),
        ChangeUnWatchTables: () => ({}),
        ChangeViewModel: () => ({}),
        GetTableLineages: () => ({}),
        HideTableInfo: () => ({}),
        ShowTableInfo: () => ({}),
        isShowTableInfo: false,
        lineages: [],
        model: ViewModel.Tree,
        nodeLevel: 3,
        tables: [],
        unWatchTableIds: [],
    }

    private lineageNode: HTMLElement;

    private get tableId(): number {
        return parseInt(this.props.match!.params.tableId!, 0);
    }

    private mFullscreent: {
        request: () => void,
        release: () => void
    };

    private get fullscreen() {
        if (!this.mFullscreent) {
            this.mFullscreent = fullscreen(this.lineageNode);
        }
        return this.mFullscreent;
    }

    public componentDidMount(): void {
        this.props.GetTableLineages(this.tableId);
    }

    public render(): JSX.Element {
        return (
            <div className="meta-lineage">
                {this.props.tableInfo ? <LineageTableInfo {...this.props.tableInfo} isShow={this.props.isShowTableInfo} onClose={this.props.HideTableInfo} /> : null}
                <div className="meta-lineage-title">
                    <Button icon="fullscreen" onClick={this.StartFullscreen} style={{marginRight: 10}}>全屏</Button>
                    <Radio.Group value={this.props.model} buttonStyle="solid" onChange={this.OnViewModelChange}>
                        <Radio.Button value={3}>树形模式</Radio.Button>
                        <Radio.Button value={1}>精简模式</Radio.Button>
                        <Radio.Button value={2}>详细模式</Radio.Button>
                    </Radio.Group>
                </div>
                <div className="meta-lineage-node" ref={(node) => this.lineageNode = node!}>
                    {this.props.lineages.length === 0 ? <Empty>没有任何血缘数据</Empty> : null}
                    {this.props.lineages.length > 0 && this.props.model === ViewModel.Simple ? <SimpleLineage lineage={this.GetLineageChartData()} onAddTableLineages={this.props.AddTableLineages} currentId={this.tableId.toString()} /> : null}
                    {this.props.lineages.length > 0 && this.props.model === ViewModel.Detailed ? <DetailedLineage lineage={this.GetLineageChartData()} onAddTableLineages={this.props.AddTableLineages} onShowTableInfo={this.ShowTableInfo} onUnWatchTable={this.UnWatchTable} currentId={this.tableId.toString()} /> : null}
                    {this.props.lineages.length > 0 && this.props.model === ViewModel.Tree ? <TreeLineage lineage={this.GetLineageChartData()} onAddTableLineages={this.props.AddTableLineages} currentId={this.tableId.toString()} /> : null}
                </div>
            </div>
        );
    }

    @autobind
    private StartFullscreen(): void {
        this.fullscreen.request();
    }

    @autobind
    private OnViewModelChange(e: RadioChangeEvent): void {
        this.props.ChangeViewModel(e.target.value! as number);
    }

    @autobind
    private UnWatchTable(tableId: string): void {
        const unWatchTableIds = this.props.unWatchTableIds.map(id => id);
        unWatchTableIds.push(tableId);
        this.props.ChangeUnWatchTables(unWatchTableIds);
    }

    @autobind
    private ShowTableInfo(table: ITableItem): void {
        this.props.ShowTableInfo(table.id, table.name, table.type, table.description);
    }

    private GetLineageChartData(): { nodes: ITableItem[], edges: ILineage[] } {
        return {
            edges: this.props.lineages.filter(lineage => this.props.unWatchTableIds.filter(uwt => uwt === lineage.source || uwt === lineage.target).length === 0),
            nodes: this.props.tables.filter(table => this.props.unWatchTableIds.filter(uwt => uwt === table.id).length === 0),
        };
    }
}