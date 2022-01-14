import message from "antd/lib/message";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import * as NProgress from "nprogress";
import {  LoadingStatus } from "../modules/main";

class HttpClass {
    // tslint:disable-next-line
    private base: string = "/api"; // "http://rap2api.taobao.org/app/mock/124964"

    private pingNumber: number = 0;  // 请求中的request个数

    public async post<T, TResult>(url: string, data: T): Promise<IResult<TResult>> {
        const formData = new FormData();
        for(const key of Object.keys(data)) {
            let value = data[key]
            if (Array.isArray(value) || typeof value === "object") {
                value = JSON.stringify(value)
            }
            formData.append(key, value);
        }
        return (await axios.post(`${this.base}${url}`, formData)).data;
    }

    public async get<T, TResult>(url: string, data?: T): Promise<IResult<TResult>> {
        let fullUrl = url;
        if (data) {
            fullUrl += "?"
            for (const key of Object.keys(data)) {
                fullUrl += `${key}=${data[key]}&`;
            }
        }
        return (await axios.get(`${this.base}${fullUrl}`)).data;
    }

    public async getWithNoInterceptors<T, TResult>(url: string, data?: T): Promise<IResult<TResult>> {
        let fullUrl = url;
        if (data) {
            fullUrl += "?"
            for (const key of Object.keys(data)) {
                fullUrl += `${key}=${data[key]}&`;
            }
        }
        return await (await fetch(`${this.base}${fullUrl}`, {credentials: "same-origin"})).json();
    }

    public reload(url: string): void {
        const fullurl = url.startsWith("http") ? url : `${this.base}${url}`;
        window.location.href = fullurl;
    }

    public interceptors(changeLoadingStatus: (status: LoadingStatus) => void): void {
        axios.interceptors.request.use(this.requestInterceptor(changeLoadingStatus), this.errorInterceptor(changeLoadingStatus));
        axios.interceptors.response.use(this.responseInterceptor(changeLoadingStatus), this.errorInterceptor(changeLoadingStatus));
    }

    private requestInterceptor(changeLoadingStatus: (status: LoadingStatus) => void): (config: AxiosRequestConfig) => AxiosRequestConfig {
        return (config: AxiosRequestConfig) => {
            changeLoadingStatus(LoadingStatus.LOADING);
            if(this.pingNumber <= 0) {
                NProgress.start()
            }
            this.pingNumber = this.pingNumber < 0 ? 1 : this.pingNumber + 1;
            return { ...config, withCredentials: true };
        };
    }

    private errorInterceptor(changeLoadingStatus: (status: LoadingStatus) => void) {
        return (error: {response: {status: number}}) => {
            message.error(`请求错误，${error}.`);
            changeLoadingStatus(LoadingStatus.ERROR);
            this.pingNumber -= 1;
            if(this.pingNumber <= 0) {
                NProgress.done();
                NProgress.remove();
            }
            return Promise.reject(error);
        }
    }

    private responseInterceptor(changeLoadingStatus: (status: LoadingStatus) => void): (response: AxiosResponse) => AxiosResponse {
        return (response: AxiosResponse) => {
            if (this.pingNumber === 1) {
                changeLoadingStatus(LoadingStatus.SUCCESS);
            }
            this.pingNumber -= 1;
            if(this.pingNumber <= 0) {
                NProgress.done();
                NProgress.remove();
            }
            return { ...response };
        };
    }
}

interface IResult<TData> {
    isSuccess: boolean,
    data: TData
}

export const Http = new HttpClass()