import Vue from 'vue';
import {RequestSetting} from '@/utils/request';

/* get 接口 */
type TYPE_GET_METHOD = (
    path: string,
    params?: object,
    setting ?: RequestSetting
) => any;

/* post 接口 */
type TYPE_POST_METHOD = (
    path: string,
    params ?: object,
    paramType ?: RequestSetting
) => any;


/* 定义在原型链上面的方法 */
/*声明 post 和get方法 */
declare module 'vue/types/vue' {
    interface Vue {
        $post: TYPE_POST_METHOD; // post方法
        $get: TYPE_GET_METHOD; // get方法
        $message: {
            error: () => {};
            warning: () => {};
            success: () => {};
        };
    }
}

/* 通用的数据列表 */
interface TYPE_TABLE_DATA {
    data: any[]; // 列表数据
    count: number; // 总数
    pageSize: number; // 页面元素个数
    currentPage: number; // 当前页面下标
    nowTime: string | undefined; // 当前时间
}

declare module 'vue/types/vue' {
    interface Vue {
        tableData: TYPE_TABLE_DATA;

    }
}

declare global {
    interface Window {
        ELEMENT: {
            Message: {
                error: Function
            }
        }; // 具体定义参考vue.config.js
    }
    const FLAG_BUILD_VERSION: string; // 预定义的常量（具体见vue.config.js）, 编译时间版本
    const RUN_PROJECT_NAME: 'baodun' | 'organization'; // 预定义的常量（具体见vue.config.js）， 可选值: 'baodun'|'organization'
}
