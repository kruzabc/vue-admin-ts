<!--带顶部栏，侧边栏的布局-->
<template>
    <div class="app-wrapper">
        <headbar></headbar>
        <sidebar class="sidebar-container"></sidebar>
        <app-main></app-main>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {Headbar, Sidebar, AppMain} from './components/index';

    @Component({
        components: {Headbar, Sidebar, AppMain}
    })
    export default class Layout extends Vue {
    }
</script>

<style lang="scss" scoped>
</style>

