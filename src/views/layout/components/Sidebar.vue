<template>
    <nav class="app-sidebar">
        <div class="nav-scroll">
            <ul class="nav-menu-list">
                <li class="list-item" :class="{active: item.active}" v-for="(item,index) in navSideConfigList"
                    @click.stop="clickMenu(index)">
                    <a href="javascript:void(0);" class="cap">
                        <i class="menu-icon"></i>
                        <span class="cap-text">{{item.name}}</span>
                    </a>
<!--                    <ul class="nav-menu-list-fold" v-if="item.active">-->
<!--                        <li class="fold-item" v-for="(child,index2) in item.children">-->
<!--                            <a @click.stop="clickSubMenu(index,index2, child.href, $event)" :href="child.href"-->
<!--                               onclick="javascript:return false;"-->
<!--                               :class="{active: child.active}">{{child.name}}</a>-->
<!--                        </li>-->
<!--                    </ul>-->
                </li>
            </ul>
        </div>
    </nav>
</template>

<script lang="ts">
    import {Component, Provide, Watch, Vue} from 'vue-property-decorator';
    import mapsRouterData from '../../../router/maps';
    import {Getter} from 'vuex-class';
    import {Route} from 'vue-router';

    // 约定类型- 配置类型
    type NavConfigType = {
        name: string; // menu名
        id: number; // id
        active: boolean;
        href: string | undefined;
    };

    @Component
    export default class Sidebar extends Vue {
        @Provide()
        private navSideConfigList: Array<NavConfigType> = [];

        @Getter('permission')
        private permission: any;

        mounted() {
            this.setRouterData();
        }

        @Watch('$route')
        private onRouterChange(route: Route) {
            this.setRouterData();
        }

        private setRouterData() {
            const find = mapsRouterData.find((item) => Number(item.id) === Number(this.$route.meta.groupId));
            if (find) {
                const list: Array<NavConfigType> = [];
                for (const i in find.data) {
                    if (!find.data.hasOwnProperty(i)) {
                        continue;
                    }
                    const obj = find.data[i];

                    if(!(obj.children && obj.children.length > 0)){
                        return;
                    }
                    const child = obj.children[0];

                    // console.log(obj);
                    // todo 暂不开启权限
                    // 如果不在权限列表里面就跳过
                    // if(this.permission.indexOf(obj.id) < 0){
                    //     continue;
                    // }
                    // let children: Array<NavConfigType> = [];
                    // let flagCount = 0;
                    // if (obj.children && obj.children.length > 0) {
                    //     for (const j in obj.children) {
                    //         if (!obj.children.hasOwnProperty(j)) {
                    //             continue;
                    //         }
                    //         // todo 暂不开启权限
                    //         // 如果不在权限列表里面就跳过
                    //         // if(this.permission.indexOf(obj.children[j].id) < 0){
                    //         //     continue;
                    //         // }
                    //         let flag: boolean = obj.children[j].id === Number(this.$route.meta.id); // id匹配则点选中
                    //         if (flag) {
                    //             flagCount++;
                    //         }
                    //         // children.push({
                    //         //     name: obj.children[j].name,
                    //         //     id: obj.children[j].id,
                    //         //     href: obj.children[j].href,
                    //         //     active: flag,
                    //         //     children: []
                    //         // });
                    //     }
                    // }
                    list.push({
                        name: child.name,
                        id: child.id,
                        href: child.href || '',
                        active: false // 子项选中，父级项也选中
                    });
                }
                this.navSideConfigList = list;
            }
        }

        private clickMenu(idx: number) {
            for (let i = 0; i < this.navSideConfigList.length; ++i) {
                if (i === idx) {
                    this.navSideConfigList[i].active = !this.navSideConfigList[i].active;
                } else {
                    this.navSideConfigList[i].active = false;
                }
            }
        }

        private clickSubMenu(parentIndex: number, idx: number, href: string, event: any) {
            if (href !== '') {
                if (this.$route.path !== href.substr('/'.length)) {
                    this.$router.push(href.substr('/'.length));
                } else {
                    this.$router.go(0); // 刷新
                }
            }
            event.stopPropagation();
            return false;
        }
    }
</script>
