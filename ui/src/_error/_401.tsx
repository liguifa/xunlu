import * as React from "react";
import "./_4xx.css";

// tslint:disable-next-line
export default class _401Component extends React.Component {
    public render(): JSX.Element {
        return (
            <div className="_4xx">
                <h1>401</h1>
                <div className='onlinefs-message-one'>你没有权限查看该数据表，请先申请权限后再访问！</div>
                <div className='onlinefs-message-two'>快回首页试试吧！</div>
                <a href='/'>去首页</a>
            </div>
        )
    }
}