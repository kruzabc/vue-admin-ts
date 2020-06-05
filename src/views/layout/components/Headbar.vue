<template>
    <header class="app-header clearfix">
        <div class="l-part">
            <a class="image-icon" href="/">
                <img src="@/assets/images/head_icon.png" width="130" alt="logo">
            </a>

            <span class="welcome-text">
                欢迎进入后台管理系统
            </span>
        </div>

        <ul class="right-menu">
            <li class="item">修改密码</li>
            <li class="item">安全退出</li>
        </ul>
    </header>
</template>

<script lang="ts">
    import {Component, Provide, Watch, Vue} from 'vue-property-decorator';
    import mapsRouterData from '../../../router/maps';
    import {Getter} from 'vuex-class';
    import {Route} from 'vue-router';

    // 约定类型- 配置类型
    interface MenuConfigType {
        name: string; // menu名
        isSelected: boolean; // 是否选中
        href: string; // 是否选中
        id: number; // id
    }

    @Component
    export default class Headbar extends Vue {
        @Provide()
        private dataArr: Array<MenuConfigType> = [];
        private userName = ''; // 用户名
        private ip = ''; // ip
        private isShowPopPanel = false; // 是否显示弹出层
        private showFoldDetail = false;// 是否显示折叠


        @Getter('permission')
        private permission: any;

        mounted() {
            this.dataArr = mapsRouterData.filter((item: any) => {
                return true;
                // return this.permission && this.permission.includes(item.id) !== false;
            }).map((item: any) => {
                return {
                    name: item.name,
                    id: Number(item.id),
                    href: item.href,
                    isSelected: false
                };
            });

            // this.getUrlPathFromServer();

            const groupId: string = this.$route.meta.groupId || '';
            let find: any = this.dataArr.find((item) => Number(item.id) === Number(groupId));
            if (find) {
                this.markMenu(find.id);
            }
            window.document.addEventListener('click', () => {
                if (this.isShowPopPanel) {
                    this.isShowPopPanel = false;
                    this.showFoldDetail = false;
                }
                if (this.showFoldDetail) {
                    this.isShowPopPanel = false;
                    this.showFoldDetail = false;
                }
            });

            // 获取到个人信息
            let userInfo = localStorage.getItem('userInfo');
            let userInfoData: any;
            if (userInfo) {
                try {
                    userInfoData = JSON.parse(userInfo);
                } catch (e) {
                }
                if (userInfoData) {
                    this.userName = userInfoData.name + userInfoData.roleName;
                    this.ip = userInfoData.ip;
                }
            }
        }

        beforeDestroy() {}

        // private getUrlPathFromServer() {
        //     const spaList: Array<string> = [
        //           '/jdgc/mainTuneUp' //尽调过程
        //     ];
        //     this.$get('/home/getHeaderUrlList').then((respData: any) => {
        //         if (respData.code === '000000') {
        //             this.dataArr.forEach((item: any) => {
        //                 let path = respData.data[item.id];
        //                 if(path){
        //                     if(spaList.indexOf(path) >= 0){
        //                         path = '/spa' + path;
        //                     }
        //                     item.href = path;
        //                 }
        //             });
        //         } else {
        //             // this.$showToast('权限不足');
        //         }
        //     }).catch(() => {
        //     });
        // }

        // private getUrlByCode(code: number){
        //     const spaList: Array<string> = [
        //           '/jdgc/mainTuneUp' //尽调过程
        //     ];
        //     this.$get('/home/getUrlByCode', {
        //         code
        //     }).then((respData: any) => {
        //         const find = this.dataArr.find((item : any) =>{
        //             return item.id === code;
        //         });
        //         if(find){
        //             let path = respData.data;
        //             if(path){
        //                 if(spaList.indexOf(path) >= 0){
        //                     path = '/spa' + path;
        //                 }
        //                 find.href = path;
        //             }
        //         }
        //     });
        // }

        // 路由发生了变化，重新渲染路由
        @Watch('$route')
        private onRouterChange(route: Route) {
            this.markMenu(route.meta.groupId);
        }

        /* 点击顶部一级菜单 */
        private clickMenu(id: number, event: any) {
            // 如果是链接,就访问链接去
            const obj: any = this.dataArr.find((item) => item.id === id);

            if (!obj || obj.isSelected) {
                return;
            }

            this.markMenu(id);
            this.$router.push(obj.href.substr('/spa'.length));

            return false;
        }

        /* 标记 */
        private markMenu(id: number) {
            const obj: any = this.dataArr.find((item) => Number(item.id) === id);
            if (!obj) {
                return;
            }

            if (obj.isSelected === true) {
                return;
            } else {
                this.dataArr.forEach((item, i) => {
                    item.isSelected = (Number(item.id) === id);
                });
            }
        }

        /* 点击个人信息 */
        private clickOnUser() {
            this.isShowPopPanel = !this.isShowPopPanel;
            if (this.isShowPopPanel) {
                this.$nextTick(() => {
                    this.showFoldDetail = false;
                });
            }
        }

        private clickFoldItem() {
            this.showFoldDetail = !this.showFoldDetail;
            if (this.showFoldDetail) {
                this.$nextTick(() => {
                    this.isShowPopPanel = false;
                });
            }
        }

        /* 登出 */
        private exitLogin() {
            // 清除权限记录
            this.$store.dispatch('DeletePermissionList');
            //window.location.href = '/supervisor/doOut';
        }
    }
</script>

<style lang="scss" scoped>
</style>

