<template>
    <nav class="app-sidebar">
        <div class="nav-scroll">
            <ul class="nav-menu-list">
                <li
                    v-for="(item,index) in navSideConfigList"
                    :key="index"
                    class="list-item"
                    :class="{active: item.active, single: item.children.length === 0}"
                >
                    <a :to="item.href" class="cap" @click.stop="clickMenu(item)">
<!--                        <i class="menu-icon" :class="'icon-' + item.icon" />-->
                        <span class="cap-text">{{ item.name }}</span>
                    </a>
                    <ul v-show="item.active" class="nav-menu-list-fold" :class="{show: item.active}">
                        <li v-for="(child,index2) in item.children" :key="index2" class="fold-item">
                            <a
                                :href="child.href"
                                onclick="javascript:return false;"
                                :class="{active: child.active}"
                                @click.stop="clickSubMenu(item, child, $event)"
                            >{{ child.name }}</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script lang="ts">
    import {Component, Watch, Vue} from 'vue-property-decorator';
    import {Getter} from 'vuex-class';
    import {Route} from 'vue-router';
    import mapsRouterData from '@/router/maps';

    // 约定类型- 配置类型
    type NavConfigType = {
        name: string; // menu名
        id: string; // id
        active: boolean;
        href?: string;
        children?: Array<NavConfigType>;
    };

    @Component
    export default class Sidebar extends Vue {
        navSideConfigList: Array<any> = [];

        @Getter('permissionList')
        permissionList: any;

        @Getter('moduleId')
        moduleId?: string;

        mounted() {
            this.setRouterData();
        }

        @Watch('$route')
        onRouterChange(route: Route) {
            this.setRouterData();
        }

        setRouterData() {
            const list: Array<NavConfigType> = [];

            // 获取对应模块
            const secModuleMap = mapsRouterData.find((item: any) => {
                return String(item.id) === String(this.moduleId);
            });
            if (!secModuleMap) {
                console.error('找不到对应模块，模块id:', this.moduleId);
                return;
            }

            for (const it in secModuleMap.children) { // 遍历二级模块
                if (!secModuleMap.children.hasOwnProperty(it)) {
                    continue;
                }
                const secModule = secModuleMap.children[it]; // 二级模块列表

                // 权限控制
                // if (!this.permissionList.includes(String(secModule.id))) {
                //     continue;
                // }

                if (Array.isArray(secModule.children) && secModule.children.length > 0) {
                    let id = '';
                    let name = '';
                    let href = '';
                    let active = false;
                    const childrenData = [];
                    if (secModule.children.length > 1) { // 有多个三级项目
                        name = secModule.name; // 名
                        id = String(secModule.id); // id

                        let isActive = false; // 是否有子项有选中
                        for (let i = 0; i < secModule.children.length; ++i) { // 遍历三级
                            const child_i = secModule.children[i];
                            let child_active = false;
                            if (child_i && this.$route.path === child_i.href) {
                                active = true;
                                child_active = true;
                                isActive = true;
                            }
                            // 还要保证三级有权限
                            // if (!this.permissionList.includes(String(child_i.id))) {
                            //     continue;
                            // }
                            // 填充3级
                            childrenData.push({
                                id: String(child_i.id),
                                name: child_i.name,
                                href: child_i.href,
                                active: child_active // 子项选中，父级项也选中
                            });
                        }

                        // 如果没有active，则需要判断是不是关联的页面
                        if (!isActive) {
                            for (let i = 0; i < childrenData.length; ++i) {
                                // console.log(this.getParentPath(childrenData[i].href), this.getParentPath(this.$route.path));
                                if (this.getParentPath(childrenData[i].href) === this.getParentPath(this.$route.path)) {
                                    active = true;
                                    childrenData[i].active = true;
                                    break;
                                }
                            }
                        }
                    } else { // 只有一个
                        if (this.$route.path === secModule.children[0].href) { // 直接相通
                            active = true;
                        } else if (this.getParentPath(secModule.children[0].href) === this.getParentPath(this.$route.path)) {
                            active = true;
                        }

                        name = secModule.name; // 姓名
                        href = String(secModule.children[0].href); // 链接
                        id = String(secModule.id); // id
                    }

                    list.push({
                        name: secModule.name,
                        id: String(secModule.id),
                        href: secModule.href || '',
                        active, // 子项选中，父级项也选中
                        children: childrenData
                    });
                }
            }

            this.navSideConfigList = list;
             console.log(list);
        }

        getParentPath(url: string, level = 1) {
            return url.replace(/\/*$/, '').substring(0, url.lastIndexOf('/'));
        }

        clickMenu(data: NavConfigType) {
            if (data.children && data.children.length) {
                data.active = !data.active;
            } else if (data.href === this.$route.path) {
                window.location.reload();
            } else {
                this.$router.push({
                    path: data.href
                });
            }
        }

        clickSubMenu(item: NavConfigType, child: NavConfigType) {
            if (child.href === this.$route.path) {
                window.location.reload();
            } else {
                this.$router.push({
                    path: child.href
                });
            }
        }
    }
</script>
