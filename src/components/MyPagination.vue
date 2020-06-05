<template>
    <div class="my-pagination">
        <div v-if="pageCount > 0" class="total">
            共{{ total }}条记录，第 {{ currentPage }}/{{ pageCount }} 页
        </div>
        <ul v-if="pageCount > 0" class="pagination-list">
            <li :class="{'disabled': currentPage === 1}" @click="onPagerClick($event, 1)">
                首页
            </li>
            <li :class="{'disabled': currentPage === 1}" @click="onPagerClick($event, prePage)">
                上一页
            </li>
            <li
                v-for="pager in pagers"
                :key="pager"
                :class="[{ active: currentPage === pager }]"
                class="number"
                @click="onPagerClick($event, pager)"
            >
                {{ pager }}
            </li>
            <li :class="{'disabled': currentPage === pageCount}" @click="onPagerClick($event, nextPage)">
                下一页
            </li>
            <li :class="{'disabled': currentPage === pageCount}" @click="onPagerClick($event, pageCount)">
                尾页
            </li>
            <span>跳</span><input
            class="input-width"
            autocomplete="off"
            maxlength="3"
            @keyup="handleKeyup"
        ><span>页</span>
        </ul>
    </div>
</template>

<script lang="ts">
    import {Component, Provide, Prop, Watch, Vue} from 'vue-property-decorator';

    @Component
    export default class MyPagination extends Vue {
        // 一个页面多少条数据
        @Prop({type: Number, default: 10})
        pageSize: any;

        // 数据总条数
        @Prop({type: Number, default: 0})
        total: any;

        // 当前页
        @Prop({type: Number, default: 1})
        currentPage: any;

        @Provide()
        current = 0;

        showPrevMore = false;
        showNextMore = false;
        pageCount = 0; // 页数
        pagerCount = 5; // 最多显示几个按钮

        mounted() {
            this.initPage();
        }

        /* watch 函数 */
        @Watch('total', {deep: true})
        onTotalChange(val: string) {
            this.initPage();
        }

        get pagers() {
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

            return array;
        }

        get prePage() {
            let pre = 1;
            if (this.currentPage > 1) {
                pre = this.currentPage - 1;
            } else {
                pre = this.currentPage;
            }

            return pre;
        }

        get nextPage() {
            let next = 1;
            if (this.currentPage < this.pageCount) {
                next = this.currentPage + 1;
            } else {
                next = this.currentPage;
            }
            return next;
        }

        handleKeyup(event: any) {
            if (event.keyCode === 13) {
                // if (checkInt(event.target.value)) {
                if (event.target.value > this.pageCount) {
                    this.handleChange(this.pageCount);
                } else if (event.target.value <= 0) {
                    this.handleChange(1);
                } else {
                    this.handleChange(Number(event.target.value));
                }
            }
        }

        handleChange(value: number) {
            this.current = value;
            this.emitChange();
        }

        initPage() {
            this.pageCount = Math.ceil(this.total / this.pageSize);
        }

        onPagerClick(event: any, num: number) {
            const currentPage = this.currentPage;
            if (num === currentPage) {
                // TODO
            } else {
                this.current = num;
                this.emitChange();
            }
        }

        emitChange() {
            this.$nextTick(() => {
                this.$emit('update:currentPage', this.current);
                this.$emit('current-change', this.current);
            });
        }
    }
</script>
