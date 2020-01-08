import Vue, { DirectiveOptions } from 'vue';

import request from '@/utils/request';

import {showLoading, closeLoading, showToast, showMessageBox, showMessagePanel} from '@/utils/ui';
import {directives, filters} from '@/utils/directive&filter';
import '@/assets/styles/index.scss';

import App from '@/App.vue';

import store from '@/store';
import router from '@/router';


/* 初始化函数 */

Vue.config.productionTip = false;

Vue.prototype.$get = request.get;
Vue.prototype.$post = request.post;

// import {showLoading, closeLoading, showToast, showMessageBox, showMessagePanel} from '@/utils/ui';

Vue.prototype.$showLoading = showLoading; // loading
Vue.prototype.$closeLoading = closeLoading; // 关闭loading
Vue.prototype.$showToast = showToast; // toast
Vue.prototype.$showMessageBox = showMessageBox; // msgbox
Vue.prototype.$showMessagePanel = showMessagePanel; // msgpanel

// 注册全局指令
// Register global directives
Object.keys(directives).forEach((key:string) => {
    Vue.directive(key, (directives as { [key: string ]: DirectiveOptions })[key]);
});


// 注册全局过滤器
Object.keys(filters).forEach((key: string) => {
    Vue.filter(key, (filters as { [key: string ]: Function })[key]);
});


console.log('当前版本:%s ', BUILD_VERSION);

new Vue({
    router,
    store,
    render: (h: any) => h(App)
}).$mount('#app');
