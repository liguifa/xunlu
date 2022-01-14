import Icon from "antd/lib/icon";
import Input from "antd/lib/input";
import Popconfirm from "antd/lib/popconfirm";
import Select from "antd/lib/select";
import autobind from "autobind-decorator";
import * as React from "react";

export default class EditConfirmWindowComponent extends React.Component<{value: string | Array<{id: string, name: string}>, placeholder?: string, onOk: (value: string) => void, mode: "select" | "input", icon: React.ReactNode}> {
    public static defaultProps = {
        icon: <Icon type="edit" style={{marginLeft: "10px", display: "inline-block"}} />,
        mode: "input",
    }

    private mValue: string;

    public componentDidMount(): void {
        this.mValue = this.props.mode === "input" ? this.props.value as string : (this.props.value as Array<{id: string, name: string}>)[0].id
    }

    public render(): JSX.Element {
        return (
            <Popconfirm title={this.RenderWindow()} onConfirm={this.OnSaveValue} icon={null} okText="确定" cancelText="取消">
                { this.props.icon }
            </Popconfirm>
        )
    }

    @autobind
    private RenderWindow(): JSX.Element {
        return (
            <div style={{width: 320}}>
                {
                    this.props.mode === "input" ?
                    <Input placeholder={this.props.placeholder} defaultValue={this.props.value as string} onInput={this.OnInputChange} />
                    : <Select style={{width: 320}} defaultValue={(this.props.value as Array<{id: string, name: string}>)[0].id} onChange={this.OnSelectChange}>
                        {
                            (this.props.value as Array<{id: string, name: string}>).map(v => (
                                <Select.Option value={v.id} key={v.id}>{v.name}</Select.Option>
                            ))
                        }
                    </Select>
                }
            </div>
        )
    }

    @autobind
    private OnInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
        this.mValue = e.currentTarget.value;
    }

    @autobind
    private OnSelectChange(value: string) {
        this.mValue = value;
    }

    @autobind
    private OnSaveValue(): void {
        this.props.onOk(this.mValue);
    }
}