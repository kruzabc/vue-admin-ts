import Layout from '../../views/layout/Layout.vue';
import { redirectMake } from '../tools';

const groupId = 10000; // 大id

/* 借款管理路由 */
export default [
    {
        path: '/demo',
        component: Layout,
        children: [{
            meta: {
                groupId,
                id: 10011,
                title: '用户权限-权限列表'
            },
            path: 'list', // 机构放款管理
            component: () => import('../../views/demo-center/permissionList.vue')
        }]
    }
];
