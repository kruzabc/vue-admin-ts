<template>
    <div class="paganition">
        <ul class="vui-pager middle-center" v-if="pageCount > 0">
            <li  @click="onPagerClick($event, 1)" :class="{'disabled': currentPage === 1}">首页</li>
            <li  @click="onPagerClick($event, prePage)" :class="{'disabled': currentPage === 1}">上一页</li>
            <li v-for="pager in pagers"
                :key="pager"
                :class="[{ active: currentPage === pager }]"
                @click="onPagerClick($event, pager)"
                class="number">{{ pager }}
            </li>
            <li  @click="onPagerClick($event, nextPage)" :class="{'disabled': currentPage === pageCount}">下一页</li>
            <li @click="onPagerClick($event, pageCount)" :class="{'disabled': currentPage === pageCount}">尾页</li>
            <span>跳</span><input class="input-width" autocomplete="off" maxlength="3"   @keyup="handleKeyup"><span>页</span></ul>
    </div>
</template>

<script lang="ts">
    import {Component, Provide, Prop,Watch, Vue} from 'vue-property-decorator';

    @Component
    export default class MyPagination extends Vue {

        // 一个页面多少条数据
        @Prop({type: Number, default: 5})
        private pageSize: any;

        // 数据总条数
        @Prop({type: Number, default: 0})
        private total: any;

        // 当前页
        @Prop({type: Number, default: 1})
        private currentPage: any;


        @Provide()
        private current = 0;
        private showPrevMore = false;
        private showNextMore = false;
        private pageCount = 0; // 页数
        private pagerCount = 5;  // 最多显示几个按钮

        /* watch 函数 */
        @Watch('total', { deep: true })
        private onTotalChange (val: string) {
            // console.log('username 发生了改变，最新值', val);
            this.initPage();
        }

        private get pagers() {
            const pagerCount = this.pagerCount;
            const halfPagerCount = (pagerCount - 1) / 2;
            const currentPage = Number(this.currentPage);
            const pageCount = Number(this.pageCount);

            let showPrevMore = false;
            let showNextMore = false;

            if (pageCount > pagerCount) {
                if (currentPage > pagerCount - halfPagerCount) {
                    showPrevMore = true;
                }

                if (currentPage < pageCount - halfPagerCount) {
                    showNextMore = true;
                }
            }

            const array = [];

            if (showPrevMore && !showNextMore) {
                // 页数是从第一页开始的，且总页数大于可显示的页数
                const startPage = pageCount - (pagerCount - 1);
                for (let i = startPage; i <= pageCount; i++) {
                    array.push(i);
                }
            } else if (!showPrevMore && showNextMore) {
                // 总页数大于可显示页数，且当前页在第一页
                for (let i = 1; i <= pagerCount; i++) {
                    array.push(i);
                }
            } else if (showPrevMore && showNextMore) {
                // 页数值在中间值
                const offset = Math.floor(pagerCount / 2);
                for (let i = currentPage - offset; i <= currentPage + offset; i++) {
                    array.push(i);
                }
            } else {
                // 页数是从第一页开始的，且总页数小于可显示的页数
                for (let i = 1; i <= pageCount; i++) {
                    array.push(i);
                }
            }

            this.showPrevMore = showPrevMore;
            this.showNextMore = showNextMore;
            // console.log(array);
            return array;
        }

        private get prePage() {
            let pre = 1;
            if (this.currentPage > 1) {
                pre = this.currentPage - 1;
            } else {
                pre = this.currentPage;
            }

            return pre;
        }

        private get nextPage() {
            let next = 1;
            if (this.currentPage < this.pageCount) {
                next = this.currentPage + 1;
            } else {
                next = this.currentPage;
            }
            return next;
        }

        private mounted(){
            this.initPage();
        }

        private handleKeyup(event: any) {
            if (event.keyCode === 13) {
                //if (checkInt(event.target.value)) {
                    if (event.target.value > this.pageCount) {
                        this.handleChange(this.pageCount);
                    } else if (event.target.value <= 0) {
                        this.handleChange(1);
                    } else {
                        this.handleChange(Number(event.target.value));
                    }
                //} else {
               //     return;
               // }
            }
        }
        private handleChange(value: number) {
            this.current = value;
            this.emitChange();
        }

        private initPage(){
            this.pageCount = Math.ceil(this.total / this.pageSize);
        }

        private onPagerClick(event: any, num: number){
            const currentPage = this.currentPage;
            if (num === currentPage) {
                return;
            } else {
                this.current = num;
                this.emitChange();
            }
        }

        private emitChange() {
            this.$nextTick(() => {
                this.$emit('update:currentPage', this.current);
                this.$emit('current-change', this.current);
            });
        }
    }
</script>


<style lang="scss" scoped>
    .vui-pager{
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
    }
    .vui-pager li {
        list-style: none;
        float: left;
        background: #fff;
        margin-right: 7px;
        display: inline-block;
        height: 20px;
        padding: 0 7px;
        border: 1px solid #d4d4d4;
        border-radius: 2px;
        text-align: center;
        color: #333;
        font-size: 14px;
        line-height: 20px;
        text-decoration: none;
        cursor: pointer;
        .disabled {
        opacity: 0.6;
        pointer-events: none;
        cursor: not-allowed;
        background: #fff;
        color: #333;
        border: 1px solid #d4d4d4;}
    }
    .vui-pager li.active,
    .vui-pager li:hover {
        background: #2c78f4;
        color: #fff;
        border: 1px solid #2c78f4;
    }
    .vui-pager li.active {
        cursor: default;
    }
    .vui-pager .input-width {
        text-align: center;
        height: 22px;
        width: 41px;
        outline: 0;
        -webkit-appearance: none;
        border-radius: 2px;
        border: 1px solid #d4d4d4;
        vertical-align: top;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
</style>
