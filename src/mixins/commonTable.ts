/* 通用的列表数据mixin */
import {Component, Vue} from 'vue-property-decorator';
import MyPagination from '@/components/MyPagination.vue';
import dayjs from  'dayjs';
// import { getDefaultListTableData } from './commonData';

@Component({
    components: {
        MyPagination
    }
})
export default class extends Vue{
    data () {
        return {
            // Will be reactive
            tableData: {
                count: 0, // 数据总数
                pageSize: 10, // 默认10
                currentPage: 1, // 当前页面编号，默认第一页面
                nowTime: '', // 数据更新时间
                data: [] // 数据数组
            } // 默认的参数
        };
    }
    mounted() {
        this.tableData.nowTime = dayjs(new Date()).format('YYYY-MM-DD');
    }
}
