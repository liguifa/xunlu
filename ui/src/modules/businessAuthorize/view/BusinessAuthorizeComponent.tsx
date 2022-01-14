import Icon from "antd/lib/icon";
import Modal from "antd/lib/modal";
import Tabs from "antd/lib/tabs";
import * as React from "react";
import OperationLogsAuthorize from "../../operationLogsAuthorize";
import { IBusinessAuthorizeProps } from "../props/BusinessAuthorizeProps";

export class BusinessAuthorizeComponent extends React.Component<IBusinessAuthorizeProps> {
    public static defaultProps: IBusinessAuthorizeProps = {
        HideAuthorizeWindow: () => ({}),
        ShowAuthorizeWindow: () => ({}),
        businessId: 0,
        isShow: false,
    }

    public render(): JSX.Element {
        return (
            <div>
                <span onClick={this.props.ShowAuthorizeWindow}>
                    <Icon type="lock" style={{ marginRight: 5 }} />
                    <span>权限管理</span>
                </span>
                <Modal visible={this.props.isShow} title="权限管理" width={1000} footer={false} onCancel={this.props.HideAuthorizeWindow}>
                {
                    this.props.isShow ? 
                    <Tabs tabPosition="left" style={{ height: 620 }}>
                        <Tabs.TabPane tab="操作记录" key="1">
                            <OperationLogsAuthorize businessId={this.props.businessId} />
                        </Tabs.TabPane>
                    </Tabs> : null
                }
                </Modal>
            </div>
        )
    }
}