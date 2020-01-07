// 告诉TypeScript编译器.vue文件其实就是一个Vue;

declare module '*.vue' {
    import Vue from 'vue';
    export default Vue;
}
