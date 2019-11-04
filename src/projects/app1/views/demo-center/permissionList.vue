<template>
    <div>
        <div class="nav-common-head">
            <div class="page-title">
                列表
            </div>
        </div>

        <div class="nav-common-search">
            <div class="search-line">
                <div class="search-union">
                    <label class="label-text">用户名称：</label>
                    <div class="w-30 input-text">
                        <el-input
                            type="text"
                            placeholder=""
                            v-model.trim="search.organizationName"
                            maxlength="50"
                            autocomplete="off"
                        />
                    </div>
                </div>
                <div class="search-union">
                    <label class="label-text">注册日期：</label>
                    <div class="input-time">
                        <el-date-picker
                            v-model="search.joinStartTime"
                            value-format="yyyy-MM-dd"
                            type="date"
                            style="width:150px"
                            :picker-options="joinStartTimeOpt"
                        ></el-date-picker>
                    </div>
                    <span class="connecting-line">-</span>
                    <div class="input-time">
                        <el-date-picker
                            v-model="search.joinEndTime"
                            value-format="yyyy-MM-dd"
                            type="date"
                            style="width:150px"
                            :picker-options="joinEndTimeOpt"
                        ></el-date-picker>
                    </div>
                </div>
                <div class="search-union">
                    <el-button type="primary" @click="searchData">
                        搜索
                    </el-button>
                    <el-button type="primary" @click="clickAdd" class="ml-2">
                        新增用户
                    </el-button>
                </div>
            </div>
        </div>

        <div class="common-table" style="width: 100%">
            <div class="table-count">
                共<span class="red">{{ tableData.count }}</span
            >条数据，更新日期：{{ tableData.nowTime }}
            </div>

            <el-table :data="tableData.data">
                <el-table-column
                    prop="select"
                    label="选择"
                    fixed
                    width="50"
                >
                    <template slot-scope="scope">
                        <el-checkbox></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="idx"
                    label="序号"
                    width="50"
                ></el-table-column>
                <el-table-column
                    prop="instituteShortName"
                    label="机构简称"
                    width="120"
                ></el-table-column>
                <el-table-column
                    prop="instituteFullName"
                    label="机构全称"
                    width="180"
                ></el-table-column>
                <el-table-column
                    prop="businessLicenseNumber"
                    label="营业执照编号"
                    width="180"
                ></el-table-column>
                <el-table-column
                    prop="area"
                    label="所在地区"
                    width="140"
                ></el-table-column>
                <el-table-column
                    prop="cooperateStartTime"
                    label="合作结束日期"
                    width="120"
                ></el-table-column>
                <el-table-column
                    prop="cooperateEndTime"
                    label="合作结束日期"
                    width="120"
                ></el-table-column>
                <el-table-column prop="status" label="状态" width="80">
                    <template slot-scope="scope">
                        {{ scope.row.status ? "合作中" : "终止合作" }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="operator"
                    label="操作"
                    width="150"
                >
                    <template slot-scope="scope">
                        <a
                            class="page-table-btn ml-1"
                            @click="checkEdit(scope.row.id)"
                        >查看/编辑</a
                        >
                    </template>
                </el-table-column>
            </el-table>
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
            }];
            this.tableData.count = 3;
        }
    }
</script>
