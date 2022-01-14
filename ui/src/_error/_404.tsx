import * as React from "react";
import "./_4xx.css";

// tslint:disable-next-line
export default class _404Component extends React.Component {
    public render(): JSX.Element {
        return (
            <div className="_4xx">
                <h1>404</h1>
                <div className='onlinefs-message-one'>你访问的页面被外星人带走了！</div>
                <div className='onlinefs-message-two'>快回首页试试吧！</div>
                <a href='/'>去首页</a>
            </div>
        )
    }
}