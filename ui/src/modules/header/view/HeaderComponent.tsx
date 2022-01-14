import Avatar from "antd/lib/avatar";
import Breadcrumb from "antd/lib/breadcrumb";
import Icon from "antd/lib/icon";
import autobind from "autobind-decorator";
import * as React from "react";
import Nav from "../../nav";
// import Search from "../../search";
import { IHeaderProps } from "../props/HeaderProps";
import { ICrumb } from "../store/Crumbs";
import "../style/HeaderComponent.css";

export class HeaderComponent extends React.Component<IHeaderProps> {
	public render(): JSX.Element {
		return (
			<div className="pa-header">
				<div>
					<div className="pa-header-icon">
						<Icon style={{ fontSize: '20px' }} type={this.props.isShrink ? "menu-fold" : "menu-unfold"} onClick={this.ChangeNavStatus} />
					</div>
					<div className="pa-header-title">
						<img src={require("../../../assets/logo.png")} />
						<h2>元数据管理平台</h2>
					</div>
					<div>
						<Breadcrumb>
							{this.props.Crumbs ? this.props.Crumbs.map((crumb: ICrumb) => {
								return (
									crumb.url ? <Breadcrumb.Item href={"/#" + crumb.url} key={crumb.key}>
										{crumb.icon ? <Icon type={crumb.icon} /> : null}
										<span>{crumb.title}</span>
									</Breadcrumb.Item> : <Breadcrumb.Item key={crumb.key}>
											{crumb.icon ? <Icon type={crumb.icon} /> : null}
											<span>{crumb.title}</span>
										</Breadcrumb.Item>
								)
							}) : null}
						</Breadcrumb>
					</div>
				</div>
				<div>
					<div className="meta-header-nav"><Nav mode="horizontal" showLogo={false} /></div>
					{/* <Search /> */}
					<span className="pa-header-user">
						<Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{this.props.UserInfo.username}</Avatar>
						<span>{this.props.UserInfo.displayName}</span>
					</span>
				</div>
			</div>
		)
	}

	@autobind
	private ChangeNavStatus(): void {
		this.props.ChangeNavShrinkStatus(!this.props.isShrink);
	}
}