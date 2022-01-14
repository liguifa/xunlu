import Checkbox from "antd/lib/checkbox";
import Empty from "antd/lib/empty";
import Icon from "antd/lib/icon";
import Input from "antd/lib/input";
import  Modal from "antd/lib/modal";
import * as React from "react";
import "../style/SearchComponent.css";

export class SearchComponent extends React.Component<{}> {
    public render(): JSX.Element {
        return (
            <div>
                <Icon type="search" />
                <Modal visible={true} title="搜索" width={1000} footer={false}>
                    <div className="meta-search-body">
                        <Input.Search placeholder="输入内容进行搜索" style={{width: 700}} enterButton="搜索" size="large" />
                        <div className="meta-search-body-select">
                            <Checkbox>搜索表名</Checkbox>
                            <Checkbox>搜索表描述</Checkbox>
                            <Checkbox>搜索字段名</Checkbox>
                            <Checkbox>搜索字段描述</Checkbox>
                            <Checkbox>搜索字段字典</Checkbox>
                        </div>
                        <div className="meta-search-body-result">
                            <Empty />
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
} 