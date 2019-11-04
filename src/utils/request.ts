import axios from 'axios';
import store from '@/store';

const service = axios.create({
    timeout: 15000, // 请求超时时间
    withCredentials: true, // 允许跨域携带cookie
    headers: { // 默认配置请求头，请求格式为application/json
        'Content-Type': 'application/json;charset=UTF-8',
        'Accept': 'application/json'
    }
});

// request拦截器
service.interceptors.request.use((config: any) => {
    const token = localStorage.getItem('access_token') || '';
    if (token) {
        config.headers.accessToken = token;
    }
    return config;
}, (error: any) => {
    Promise.reject(error);
});

// response拦截器
service.interceptors.response.use(
    (response: any) => {
        if (response.request.responseType === 'arraybuffer') {
            return response;
        }
        const resCode = response.data.code;
        if (resCode === '200004') {  // 无登录权限
            store.dispatch('DeletePermissionList'); // 清除权限数据
            localStorage.getItem('access_token'); // 清除token
            location.reload();
            return Promise.reject('permission error');
        } else if (resCode === '200005') { // 权限不足
            // @ts-ignore
            window.ELEMENT.Message.error('接口权限不足');
        }
        return response.data;
    },
    (error: any) => {
        // @ts-ignore
        if (window.Element) {
            if (error.message.indexOf('timeout') >= 0) {
                window.ELEMENT.Message.error('请求超时,接口:',error.config.url);
                //console.log('请求超时,接口:', error.config.url);
            } else if (error.message === 'Request failed with status code 404') {
                window.ELEMENT.Message.error('请求接口404, 接口:', error.config.url);
                //console.log('请求接口404, 接口:', error.config.url);
            } else {
                window.ELEMENT.Message.error('请求接口发生了错误，接口:', error.config.url);
                // console.log('请求接口发生了错误, 接口:', error.config.url);
            }
        }
        return Promise.reject(error);
    }
);

export type RequestSetting = {
    paramType?: 'json' | 'form';  // 请求参数类型
    responseType?: 'arraybuffer' | 'pdf' | '';  // 返回参数类型
    proxyType?: 'api' | 'newApi';  // 代理组的名字
    domain?: string; // domain (有domain 则 proxyType将不生效)
};

const defaultRequestSetting: RequestSetting = {
    paramType: 'json',
    proxyType: 'api',
    responseType: ''
};

function json2Url(data: any) {
    let strData = '';
    Object.keys(data).forEach((item) => {
        strData += item + '=' + data[item] + '&';
    });
    if (strData.length > 0) {
        strData = strData.slice(0, strData.length - 1);
    }
    return strData;
}

function urlTrim(path: string) {
    return path.replace(/(\/){2,}/g, '/');
}

function get(path: string, params = {}, setting?: RequestSetting): any {
    const newSetting = {...defaultRequestSetting, ...setting};
    return service.get(path, {
        baseURL: newSetting.domain ? newSetting.domain : `\/${newSetting.proxyType}\/`,
        params,
        responseType: newSetting.responseType === 'arraybuffer' ? 'arraybuffer' : undefined
    });
}

function post(path: string, params = {}, setting?: RequestSetting) {
    const newSetting = {...defaultRequestSetting, ...setting};
    const url = urlTrim(newSetting.domain ? `${newSetting.domain}/${path}` : `\/${newSetting.proxyType}\/${path}`);
    if (newSetting.paramType === 'form') {
        return service.post(url, json2Url(params), {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
    }
    return service.post(url, Object.keys(params).length === 0 ? undefined : params);
}

export default {get, post};
