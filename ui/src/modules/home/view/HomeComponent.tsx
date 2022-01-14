import Card from "antd/lib/card";
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import Statistic from "antd/lib/statistic";
import * as React from "react";
import { Link } from "react-router-dom";
import ConentComponent from "../../content";
import { Crumbs } from "../../header";
import { IHomeProps } from "../props/HomeProps";
import "../style/HomeComponent.css";

@Crumbs<typeof HomeComponent>([{ icon: "home", url: "/", title: "首页" }])
export class HomeComponent extends ConentComponent<IHomeProps> {
    public static defaultProps: IHomeProps = {
        GetStatisticsInfo: () => ({}),
        businesses: [],
        totals: [],
    }

    protected title: string = "元数据管理平台";

    public componentDidMount(): void {
        this.props.GetStatisticsInfo()
    }

    protected RenderBody(): JSX.Element {
        return (
            <div className="meta-home-all-bussiness">
                <h1>全部业务线</h1>
                <div>
                    <Row gutter={16} style={{ marginTop: "20px"}}>
                        {
                            this.props.businesses.map(business => (
                                <Col span={8}>
                                    <Card style={{ marginBottom: "10px" }}>
                                        <div className="meta-home-title-card">
                                            <Statistic title={business.name} value={business.total} valueStyle={{ color: '#3f8600' }} suffix="个" />
                                            <Link to={`/tables/${business.id}`}>查看</Link>
                                        </div>
                                    </Card>
                                </Col>
                            ))
                        }
                    </Row>
                </div>
            </div >
        )
    }
    protected RenderHeader(): JSX.Element | undefined {
        return (
            <div>
                <Row gutter={16} style={{ marginTop: "20px" }}>
                    {
                        this.props.totals.map(total => (
                            <Col span={12}>
                                <Card>
                                    <div className="meta-home-title-card">
                                        <Statistic title={`${this.GetDisplayNameForTableTypeByTableType(total.type)}表个数`} value={total.total} valueStyle={{ color: '#3f8600' }} suffix="个" />
                                        <img src={this.GetTableLogoByTableType(total.type)} />
                                    </div>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            </div>
        )
    }

    private GetTableLogoByTableType(type: number | string): string {
        return {
            1: require("../../../assets/hive_logo_medium.jpg"),
            2: require("../../../assets/kylin_logo.png")
        }[type]
    }

    private GetDisplayNameForTableTypeByTableType(tableType: number | string): string {
        return {
            1: "Hive",
            2: "Kylin"
        }[tableType]
    }
}