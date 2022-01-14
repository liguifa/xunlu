import Icon from "antd/lib/icon";
import Menu from "antd/lib/menu";
import autobind from "autobind-decorator";
import * as React from "react";
import { Link } from "react-router-dom";
import { INavProps } from "../props/NavProps";
import "../style/NavComponent.css";

export class ShrinkableComponent extends React.Component<INavProps> {
    public static defaultProps: INavProps = {
        ChangeMenu: () => ({}),
        ChangeSelectedKey: () => ({}),
        GetBusinesses: () => ({}),
        activeId: "inline_sub_1",
        businesses: [],
        inlineCollapsed: false,
        mode: "inline",
        role: 0,
        selectedKey: "",
        showLogo: true,
    }

    public componentDidMount(): void {
        this.props.GetBusinesses();
    }

    public render(): JSX.Element {
        return (
            <div className={`meta-nav ${this.props.mode === "horizontal" ? "meta-nav-horizontal" : this.props.inlineCollapsed ? "meta-nav-inlineCollapsed" : ""}`}>
                {
                    this.props.showLogo && !this.props.inlineCollapsed ? <div className="meta-nav-header">
                        <img className="meta-nav-header-logo" src={require("../../../assets/logo.png")} />
                        <h1><Link to="/">元数据管理平台</Link></h1>
                    </div> : null
                }
                {
                    this.props.inlineCollapsed ? <div className="meta-nav-header-inlineCollapsd">
                        <Link to="/"><img className="meta-nav-header-logo" src={require("../../../assets/logo.png")} /></Link>
                    </div> : null
                }
                {this.props.role > 10 ? this.RenderMenusForUser() : this.RenderMenusForAdmin()}
            </div>
        )
    }

    private GetMenuProps(): { theme: "dark" | "light", className: string, inlineCollapsed?: boolean, defaultSelectedKeys?: string[], onOpenChange?: (keys: string[]) => void, openKeys?: string[] } {
        if (this.props.inlineCollapsed) {
            return {
                className: "meta-nav-header-main-vertical meta-nav-header-main-inlineCollapsed",
                inlineCollapsed: true,
                theme: "dark",
            }
        } else {
            return {
                className: this.props.mode === "horizontal" ? "meta-nav-header-main-horizontal" : "meta-nav-header-main-vertical",
                defaultSelectedKeys: [this.props.inlineCollapsed ? "" : location.hash],
                onOpenChange: this.ChangeMenu,
                openKeys: [this.props.activeId],
                theme: this.props.mode === "inline" ? "dark" : "light",
            }
        }
    }

    private RenderMenusForAdmin(): JSX.Element {
        return (
            <Menu {...this.GetMenuProps()} mode={this.props.mode}>
                <Menu.SubMenu key={`${this.props.mode}_sub_1`} title={this.RenderTitle("table", "数据表信息")}>
                    {
                        this.props.businesses.map((business) => (
                            <Menu.Item key={`#/tables/${business.id}`}>
                                <Link to={`/tables/${business.id}`}>{business.name}</Link>
                            </Menu.Item>
                        ))
                    }
                    <Menu.Item key={`business_0`}>
                        <Link to={`/tables/0`}>其它</Link>
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu key={`${this.props.mode}_2`} title={this.RenderTitle("setting", "系统管理")}>
                    <Menu.Item key="#/business">
                        <Link to={`/business`}>业务线管理</Link>
                    </Menu.Item>
                    <Menu.Item key="system_2">
                        <Link to="/template">查询模板管理</Link>
                    </Menu.Item>
                    <Menu.Item key="system_3">
                        <Link to="/operation">操作记录管理</Link>
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu key={`${this.props.mode}_4`} title={this.RenderTitle("tool", "数据工具")}>
                    <Menu.Item key="#partition/search">
                        <Link to={`/partition/search`}>数据分区查询</Link>
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu key={`${this.props.mode}_3`} title={this.RenderTitle("lock", "权限管理")}>
                    <Menu.Item key="#/user">
                        <Link to={`/user`}>用户管理</Link>
                    </Menu.Item>
                    <Menu.Item key="user_2">
                        <Link to={'/secret'} >敏感表管理</Link>
                    </Menu.Item>
                </Menu.SubMenu>
            </Menu>
        )
    }

    private RenderMenusForUser(): JSX.Element {
        return (
            <Menu {...this.GetMenuProps()} mode={this.props.mode}>
                <Menu.SubMenu key={`${this.props.mode}_sub_1`} title={this.RenderTitle("table", "数据表信息")}>
                    {
                        this.props.businesses.map((business) => (
                            <Menu.Item key={`1.${business.id}`}>
                                <Link to={`/tables/${business.id}`}>{business.name}</Link>
                            </Menu.Item>
                        ))
                    }
                    <Menu.Item key={`business_0`}>
                        <Link to={`/tables/0`}>其它</Link>
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu key={`${this.props.mode}_4`} title={this.RenderTitle("tool", "数据工具")}>
                    <Menu.Item key="#partition/search">
                        <Link to={`/partition/search`}>数据分区查询</Link>
                    </Menu.Item>
                </Menu.SubMenu>
            </Menu>
        )
    }

    @autobind
    private ChangeMenu(openKeys: string[]): void {
        const openKey = openKeys.filter(key => key !== this.props.activeId).length > 0 ? openKeys.filter(key => key !== this.props.activeId)[0] : null;
        if (openKey) {
            this.props.ChangeMenu(openKey);
        }
    }

    private RenderTitle(icon: string, title: string): JSX.Element {
        return (
            <span>
                <Icon type={icon} />
                <span>{title}</span>
            </span>
        )
    }
}