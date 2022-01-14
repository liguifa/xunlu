import Divider from "antd/lib/divider";
import Dropdown from "antd/lib/dropdown";
import Empty from "antd/lib/empty";
import Icon from "antd/lib/icon";
import Menu from "antd/lib/menu";
import notification from "antd/lib/notification";
import Popconfirm from "antd/lib/popconfirm";
import Select from "antd/lib/select";
import Spin from "antd/lib/spin";
import autobind from "autobind-decorator";
import * as lodsh from "lodash";
import * as React from "react";
import BusinessAuthorize from "../../businessAuthorize";
import { IEditBusinessAdminProps } from "../props/EditBusinessAdminProps";
import "../style/EditBusinessAdminComponent.css";

export class EditBusinessAdminComponent extends React.Component<IEditBusinessAdminProps> {
    public static defaultProps: IEditBusinessAdminProps = {
        GetBusinessAdmin: () => ({}),
        SaveBusinessAdmin: () => ({}),
        SearchUsers: () => ({}),
        admins: [],
        businessId: 0,
        businessName: "",
        searching: false,
        total: 0,
        users: [],
    }

    private searchKey: string;

    private throotleSeatch = lodsh.throttle((value: string) => {  this.searchKey = value; this.props.SearchUsers(value); }, 500);

    private selectValues: Array<{key: string, label: string}>;

    public render(): JSX.Element {
        return (
            <Popconfirm title={this.RenderWindow()} onConfirm={this.OnSaveValue} icon={null} okText="确定" cancelText="取消">
                <Dropdown.Button style={{marginLeft: 10}} overlay={<Menu><Menu.Item key="1"><BusinessAuthorize businessId={this.props.businessId} /></Menu.Item></Menu>}>
                <Icon type="user" />设置业务线管理员
                </Dropdown.Button>
            </Popconfirm>
        )
    }

    public componentDidMount(): void {
        this.props.GetBusinessAdmin(this.props.businessId);
    }

    private RenderWindow(): JSX.Element {
        return (
            <div style={{ minWidth: 420 }}>
                <Select mode="multiple" defaultValue={this.props.admins.map(value =>  ({key: value.id.toString(), label: value.username}))} placeholder="输入内容进行搜索" allowClear={true} filterOption={false} labelInValue={true} style={{ minWidth: 420 }} onSearch={this.OnSearch()} notFoundContent={this.GetNotFoundContent()} dropdownRender={this.RenderSelectPanel} onChange={this.OnSelectChange}>
                    {
                        this.props.admins.map(admin => (
                            <Select.Option key={`default-${admin.id}`} className="meta-edit-business-admin-select-default-option" value={admin.id.toString()}>{admin.username}</Select.Option>
                        ))
                    }
                    {
                        this.props.users.map(user => (
                            <Select.Option key={user.id.toString()} value={user.id}>{user.username}</Select.Option>
                        ))
                    }
                </Select>
            </div>
        )
    }

    @autobind
    private RenderSelectPanel(menu: JSX.Element): JSX.Element {
        return (
            <div>
                {menu}
                { 
                    this.props.total > 100 ? <div>
                        <Divider style={{ margin: '4px 0' }} />
                        <div className="meta-edit-business-admin-select-footer">
                            <span>共{this.props.total}条结果, 下拉列表仅显示前100条</span>
                        </div>
                    </div> : null
                }
            </div>
        )
    }

    @autobind
    private OnSelectChange(values: Array<{key: string, label: string}>): void {
        this.selectValues = values;
    }

    @autobind
    private OnSaveValue(): void {
        if(this.selectValues) {
            this.props.SaveBusinessAdmin(this.props.businessId, this.selectValues.map(value => ({id: parseInt(value.key, 10), username: value.label})));
            notification.success({
                description: `业务线${this.props.businessName}管理员修改成功，当前管理员为：${this.selectValues.map(value => value.label)}`,
                message: "业务线管理员修改成功"
            });
        }
    }

    @autobind
    private OnSearch(): (value: string) => void {
        return (value: string) => this.throotleSeatch(value);
    }

    private GetNotFoundContent(): JSX.Element {
        if(this.props.searching) {
            return <Spin size="small" />
        }
        if(!this.searchKey) {
            return <Empty description="输入内容进行搜索" />
        }
        return <Empty description="没有搜索到任何用户" />
    }
}
