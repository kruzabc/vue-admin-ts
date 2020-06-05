<template>
    <div>
        <div class="page-cap-title">
            文章列表
        </div>
        <div class="nav-common-search">
            <div class="search-line">
                <div class="search-union">
                    <span class="words">文章标题:</span>
                    <div class="input-text">
                        <el-input
                            v-model.trim="search.title"
                            style="width: 160px"
                            type="text"
                            clearable
                            placeholder="请输入标题"
                            maxlength="50"
                            autocomplete="off"
                        />
                    </div>
                </div>
                <div class="search-union">
                    <span class="words">发布时间:</span>
                    <div class="input-text">
                        <el-date-picker
                            v-model="search.startTime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            format="yyyy-MM-dd HH:mm:ss"
                            type="datetime"
                            placeholder="开始时间"
                            :picker-options="searchStartTimeOpt"
                            style="width:185px"
                        />
                        <span class="connecting-line">-</span>
                        <el-date-picker
                            v-model="search.endTime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            format="yyyy-MM-dd HH:mm:ss"
                            type="datetime"
                            placeholder="结束时间"
                            :picker-options="searchEndTimeOpt"
                            style="width:185px"
                        />
                    </div>
                </div>
                <div class="search-union">
                    <span class="words">状态:</span>
                    <div class="input-text">
                        <el-select
                            v-model.trim="search.status"
                            style="width: 160px"
                            placeholder="全部"
                        >
                            <el-option value="" label="全部" />
                            <el-option value="1" label="显示" />
                            <el-option value="0" label="隐藏" />
                        </el-select>
                    </div>
                </div>
                <div class="search-union right">
                    <el-button type="primary" @click="searchData">
                        查询
                    </el-button>
                </div>
                <div class="search-union right">
                    <el-button v-permission="'03010101'" type="primary" @click="clickAddArticle">
                        <i class="el-icon-plus" />
                        添加文章
                    </el-button>
                </div>
            </div>
        </div>

        <div class="common-table" style="width: 100%;">
            <el-table :data="tableData.data" tooltip-effect="light">
                <el-table-column prop="idx" label="序号" width="60" />
                <el-table-column prop="title" width="300" label="文章标题">
                </el-table-column>
                <el-table-column prop="origin" label="文章来源" />
                <el-table-column prop="tag" label="文章标签" />
                <el-table-column prop="pv" label="PV" />
                <el-table-column prop="uv" label="UV" />
                <el-table-column prop="isTop" label="是否置顶">
                </el-table-column>
                <el-table-column prop="publishTime" label="发布时间" width="150" />
                <el-table-column prop="status" label="状态">
                </el-table-column>
                <el-table-column prop="operator" label="操作" width="180">
                </el-table-column>
            </el-table>
            <my-pagination
                :page-size="tableData.pageSize"
                :total="tableData.count"
                :current-page.sync="tableData.currentPage"
                @current-change="handleCurrentChange"
            />
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Provide, Vue} from 'vue-property-decorator';
    import commonTable from '@/mixins/commonTable';

    @Component({
        components: {},
        mixins: [commonTable]
    })
    export default class extends Vue {
        @Provide()
        private search: any = {
            // 搜索参数
            page: 1, //页数
            name: '', // 机构名
            joinStartTime: '', // 加入时间起始
            joinEndTime: '' // 加入时间结束
        };

        mounted() {
            this.search.page = 1;
            this.getDataList();
        }

        private searchData() {
            this.search.page = 1;
            this.getDataList();
        }

        private getDataList() {
            // this.$showMessageBox('确定添加');
            // this.$showToast('22');
            // this.$message.error('错误');
            // this.$get('https://www.easy-mock.com/mock/5b7fe0d2719c7b7241f4e398/admin-mock/user/permissionList').then((respData: any) => {
            //
            // });

            this.tableData.data = [{
                idx: 1,
                instituteShortName: '猿辅导',
                instituteFullName: '北京猿辅导教育',
                businessLicenseNumber: '84985***37674',
                area: '北京海淀',
                cooperateStartTime: '2019-10-10',
                cooperateEndTime: '2020-10-10',
                status: 0
            }, {
                idx: 2,
                instituteShortName: '掌门1对1',
                instituteFullName: '掌门1对1',
                businessLicenseNumber: '84985***37674',
                area: '上海虹口',
                cooperateStartTime: '2019-10-10',
                cooperateEndTime: '2020-10-10',
                status: 0
            }, {
                idx: 3,
                instituteShortName: 'vipKids',
                instituteFullName: 'vipKids',
                businessLicenseNumber: '84985***37674',
                area: '上海长宁',
                cooperateStartTime: '2019-10-10',
                cooperateEndTime: '2020-10-10',
                status: 0
            }, {
                idx: 4,
                instituteShortName: '吉的堡',
                instituteFullName: '上海吉的堡英语教育',
                businessLicenseNumber: '84985***37674',
                area: '上海浦东',
                cooperateStartTime: '2019-10-11',
                cooperateEndTime: '2020-10-11',
                status: 0
            }];
            this.tableData.count = 3;
        }
    }
</script>
