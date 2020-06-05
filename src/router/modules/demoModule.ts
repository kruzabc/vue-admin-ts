import Layout from '@/views/layout/Layout.vue';
import { redirectMake } from '../tools';

const groupId = 20000; // 大id

/* 借款管理路由 */
export default [
    {
        path: '/blog',
        component: Layout,
        children: [{
            meta: {
                groupId,
                id: 20011,
                title: '欢迎登陆'
            },
            path: 'index',
            component: () => import('@/views/demo-center/blog/index.vue')
        }]
    }
];
