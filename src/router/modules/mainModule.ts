import Layout from '@/views/layout/Layout.vue';
import { redirectMake } from '../tools';

const groupId = 10000; // 大id

/* 借款管理路由 */
export default [
    redirectMake('/', '/welcome/index'),
    redirectMake('/welcome', '/welcome/index'),
    {
        path: '/welcome',
        component: Layout,
        children: [{
            meta: {
                groupId,
                id: 10011,
                title: '欢迎登陆'
            },
            path: 'index',
            component: () => import('../../views/welcome.vue')
        }]
    },
    {
        path: '/projectManage',
        component: Layout,
        children: [{
            meta: {
                groupId,
                id: 10011,
                title: '项目管理-权限列表'
            },
            path: 'list', // 机构放款管理
            component: () => import('../../views/demo-center/permissionList.vue')
        }]
    }
];
