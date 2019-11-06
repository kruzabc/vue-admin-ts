<template>
    <div class="app-main-area" id="appMainArea">
        <div class="content">
            <section class="main-format-section">
                <router-view v-if="!noPermission"></router-view>
                <div class="text-center" v-if="noPermission">
                    <span class="text">您没有该页面的访问权限</span><br>
                    <a class="page-table-btn btn" href="/home/homeIndex">返回首页</a>
                </div>
            </section>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Provide, Vue} from 'vue-property-decorator';
    @Component({
        components: {
        }
    })
    export default class AppMain extends Vue {
        @Provide()

        created(){
        }

        mounted(){
        }

        beforeDestroy(){
        }
    }
</script>

<style lang="scss" scoped>
    .text-center{
        background-color: #fff;
        height: 100%;
        text-align: left;
        padding-left: 20px;
        padding-bottom: 20px;
        margin-right: 10px;
        .text{
            display: inline-block;
            font-size: 20px;
            padding-top: 20px;
        }
        .page-table-btn{
            margin-top: 10px;
        }
    }
    .crop{
        font-size: 14px;
        color: #535b6c;
        padding-left: 25px;
        line-height: 60px;
    }
</style>
