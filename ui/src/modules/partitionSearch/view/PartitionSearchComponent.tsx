import Alert from "antd/lib/alert";
import Descriptions from "antd/lib/descriptions"
import Empty from "antd/lib/empty";
import Input from "antd/lib/input";
import autobind from "autobind-decorator";
import * as React from "react";
import ContentComponent from "../../content";
import { IPartitionSearchProps } from "../props/PartitionSearchProps";
import "../style/PartitionSearchComponent.css";

export class PartitionSearchComponent extends ContentComponent<IPartitionSearchProps> {
    protected title: string;

    protected RenderBody(): JSX.Element {
        return (
            <div className="meta-partition-search-div">
                <Alert style={{ marginBottom: 10, width: "100%" }} showIcon={true} message="简介" description={"查询kv['name']在dwd_zuoyebang_offline_action的product所在分区"} type="info" closable={true} />
                <Alert style={{ marginBottom: 20, width: "100%" }} message={this.RenderDescription()} type="warning" closable={true} />
                <Input.Search placeholder="输入kv['name']进行查询，多个字段以逗号分隔, 例: SEARCH_RESULT_ENTER" style={{ width: 700 }} enterButton="查询" size="large" onSearch={this.Search} />
                <div className="meta-partition-search-result">
                    {
                        this.IsSearchResultEmpty() ? <Descriptions title="查询结果" bordered={true}>
                            {
                                this.GetSearchResult().map(item => (
                                    < Descriptions.Item span={3} label={item.key}>{item.value}</Descriptions.Item>
                                ))
                            }
                        </Descriptions> : <Empty />
                    }
                    {
                        this.IsSearchResultEmpty() ? <Alert style={{ marginTop: 10 }} message={`SQL示例: Select * from dwd_zuoyebang_offline_action where dt='{@date}' and product in ("${this.GetSearchProducts().join('","')}") and kv['name'] in ("${Object.keys(this.props.searchResult).join('","')}")`} type="success" /> : null
                    }
                </div>
            </div >
        )
    }

    protected RenderHeader(): JSX.Element | boolean {
        return false;
    }

    @autobind
    private Search(value: string): void {
        this.props.Search(value.replace(/['"\s]/g, "").split(","));
    }

    @autobind
    private GetSearchResult(): Array<{ key: string, value: string }> {
        const result: Array<{ key: string, value: string }> = [{ key: "kv['name']", value: "product" }];
        for (const key of Object.keys(this.props.searchResult)) {
            result.push({
                key,
                value: this.props.searchResult[key]
            })
        }
        return result;
    }

    @autobind
    private IsSearchResultEmpty(): boolean {
        return !!this.props.searchResult;
    }

    @autobind
    private GetSearchProducts(): string[] {
        const result: string[] = [];
        for (const key of Object.keys(this.props.searchResult)) {
            if (result.filter(r => r === this.props.searchResult[key]).length === 0) {
                result.push(this.props.searchResult[key]);
            }
        }
        return result;
    }

    @autobind
    private RenderDescription(): JSX.Element {
        return (
            <div>
                <div>1. dwd_zuoyebang_offline_action 存储了作业帮App所有端上打点行为，并按产品线做了分区划分，通过指定产品线查询，查询性能会比查询全表快好几倍甚至几十倍。</div>
                <div>2. dwd_zuoyebang_offline_action 是从zuoyeapp_offline_action表上构建而来, 新增product字段,去掉indt,其余字段一致。<span style={{ color: "red" }}>zuoyeapp_offline_action表不再建议大家使用，后续会做下线处理。</span></div>
                <br />
                <div>使用方法：</div>
                <div>a. 使用查询工具获取打点(kv['name'])所在的产品线分区,在查询时添加product='xxx'的限定。可参照查询结果给出的SQL示例。</div>
                <div>b. 从打点平台新生成的打点,自动截取前缀作为product分区。例如：YK_C19_32_1 的product分区为YK。</div>
                <div>c. uda例行任务可添加任务依赖_select_dwd_zuoyebang_offline_action</div>
            </div>
        )
    }
}