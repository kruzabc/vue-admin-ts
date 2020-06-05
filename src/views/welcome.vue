<!-- 登录页面 -->
<template>
    <div>
        <div class="welcome-bg"></div>
        <p class="welcome-words">欢迎进入后台系统</p>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    @Component({})
    export default class extends Vue {
    }
</script>

<style lang="scss" scoped>
    .welcome-bg{
        width: 370px;
        height: 350px;
        margin: 200px auto 0;
        background: url(../assets/images/welcome_bg.png) center top no-repeat;
        background-size: 100% 100%;
        overflow: hidden;
    }
    .welcome-words{
        text-align: center;
        margin-top: 10px;
        font-size: 20px;
        color: #666;
        user-select: none;
    }
</style>
