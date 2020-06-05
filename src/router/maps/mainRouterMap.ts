export default {
    id: '01',
    name: '主页',
    defaultLink: '/',
    children: [
        {
            id: '0101',
            name: '博客管理',
            href: '/blog/index',
            children: [
                {
                    id: '010101',
                    name: '博客管理',
                    href: '/blog/index'
                }
            ]
        }
    ]
};
