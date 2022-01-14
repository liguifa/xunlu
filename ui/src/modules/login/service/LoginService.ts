import { message } from "antd";
import { createHashHistory } from 'history'
import { Http } from "../../../common";

export class LoginService {
    public async Login(username: string, password: string): Promise<boolean> {
        const result = await Http.post('/login', {
            password,
            username,
        });
        if(result.isSuccess) {
            createHashHistory().push("/");
        } else {
            message.error("用户名或密码错误");
        }
        return result.isSuccess;
    }
}