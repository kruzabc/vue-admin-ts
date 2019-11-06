/* 数据定义 */

/* http返回状态码 */
export enum HttpResponseCode {
    SUCCESS = '000000',
    NO_AUTH = '200005',
    NO_LOGIN = '200004'
}

/* JSON 数据返回结构 */
export interface HttpResponseBodyType {
    code: string;
    data: any;
    message: string;
}

/* */
