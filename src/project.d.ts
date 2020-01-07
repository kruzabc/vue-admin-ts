import Vue, { VNode } from 'vue';
import { TYPE_GET_METHOD, TYPE_POST_METHOD} from '@/utils/request';

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
        tableData: TYPE_TABLE_DATA;
    }
}

/* 通用的数据列表 */
interface TYPE_TABLE_DATA {
    data: any[]; // 列表数据
    count: number; // 总数
    pageSize: number; // 页面元素个数
    currentPage: number; // 当前页面下标
    nowTime?: string; // 当前时间
}

declare global {
    interface Window {
        ELEMENT: {
            Message: {
                error: Function;
            };
        }; // 具体定义参考vue.config.js
    }
    const BUILD_VERSION: string; // 预定义的常量（具体见vue.config.js）, 编译时间版本

    namespace JSX {
        // tslint:disable no-empty-interface
        interface Element extends VNode {}
        // tslint:disable no-empty-interface
        interface ElementClass extends Vue {}
        interface IntrinsicElements {
            [elem: string]: any;
        }
    }
}
