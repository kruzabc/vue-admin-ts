<template>
    <div class="nav-common-breadcrumb" :class="{'hide' : isHide}">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item class="cap">
                当前位置
            </el-breadcrumb-item>
            <template v-for="(item,idx) in routeData">
                <el-breadcrumb-item v-if="item.path" :key="idx" :to="{ path: item.path }">
                    {{ item.title }}
                </el-breadcrumb-item>
                <el-breadcrumb-item v-if="!item.path" :key="idx">
                    {{ item.title }}
                </el-breadcrumb-item>
            </template>
        </el-breadcrumb>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import {Route} from 'vue-router';
    import {Getter} from 'vuex-class';
    import mapsRouterData from '@/router/maps';

    @Component
    export default class MyBreadcrumb extends Vue {
        routeData = [];
        isHide = false;

        @Getter('moduleId')
        moduleId?: string;

        mounted() {
            this.setRouteData();
        }

        // 路由发生了变化，重新渲染路由
        @Watch('$route')
        onRouterChange(route: Route) {
            this.setRouteData();
        }

        setRouteData() {
            // 欢迎页不显示
            if (this.$route.path === '/welcome/index') {
                this.isHide = true;
                return;
            }

            this.isHide = false;
            // 获取对应模块
            const matchModule = mapsRouterData.find((item: any) => {
                return String(item.id) === String(this.moduleId);
            });
            if (!matchModule) {
                console.error('找不到对应模块，模块id:', this.moduleId);
                return;
            }

            /* 一级 */
            const list: any = [];
            list.push({
                title: matchModule.name,
                path: matchModule.defaultLink
            });
            for (let i = 0; i < matchModule.children.length; ++i) {
                const secChild = matchModule.children[i];

                if (!secChild?.children?.[0]) {
                    continue;
                }
                for (let j = 0; j < secChild.children.length; ++j) {
                    const thrChild = secChild.children[j];
                    if (!thrChild) {
                        continue;
                    }
                    if (this.$route.path === thrChild.href) { // 直接相同
                        list.push({
                            title: thrChild.name,
                            path: thrChild.href
                        });
                    } else if (this.getParentPath(this.$route.path) === this.getParentPath(thrChild.href)) {
                        list.push({
                            title: thrChild.name,
                            path: thrChild.href
                        });
                        list.push({
                            title: this.$route.meta.title,
                            path: this.$route.path
                        });
                    }
                }
            }
            this.routeData = list;
            console.log(list);
        }

        getParentPath(url: string) {
            return url.replace(/\/*$/, '').substring(0, url.lastIndexOf('/'));
        }
    }
</script>

<style lang="scss" scoped>
</style>
