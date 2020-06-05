import Vue from 'vue';
import Router from 'vue-router';

import mainRouterModule from './modules/mainModule'; // 用户
import demoModule from './modules/demoModule'; // 演示

Vue.use(Router);

const constantRouterMap = [
    ...mainRouterModule,
    ...demoModule,
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login.vue')
    },
    {
        path: '*',
        component: () => import('../views/404.vue')
    }
];

const router =  new Router({
    mode: 'history',
    base: '/',
    scrollBehavior: () => ({
        x: 0,
        y: 0
    }),
    routes: constantRouterMap
});

export default router;
