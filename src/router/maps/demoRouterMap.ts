export default {
    id: 10000,
    name: '功能展示',
    href: '/demo/index',
    data: [
        {
            id: 10010,
            name: '列表',
            href: '',
            children: [
                {
                    id: 10010,
                    name: '展示列表',
                    href: '/user/userPermissionList'
                }
            ]
        },
        {
            id: 10020,
            name: '表单',
            href: '',
            children: [
                {
                    id: 10021,
                    name: '表单提交',
                    href: '/user/userPermissionList'
                },
                {
                    id: 10022,
                    name: '表单验证',
                    href: '/user/userPermissionList'
                }
            ]
        }
    ]
};
