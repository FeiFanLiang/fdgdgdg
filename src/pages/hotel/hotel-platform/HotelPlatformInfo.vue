<template lang="html">
  <div id="HotelPlatformInfo">
    <!-- filters start -->
    <div class="filters">
      <div class="filter">
        <!-- <el-select clearable placeholder="请选择">
          <el-option></el-option>
        </el-select> -->
        <el-input></el-input>
        <el-input></el-input>
      </div>
      <el-button type="primary" >搜索</el-button>
      <el-button type="primary" @click="addPlatforminfo">创建</el-button>
    </div>
    <!-- filters end -->
    <!-- table start -->
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="ID" label="ID" width="80"></el-table-column>
      <el-table-column prop="PlatHotelID" label="平台酒店ID" width="110"></el-table-column>
      <el-table-column prop="HotelID" label="酒店名称" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="Platform.PlatName" label="平台名称"></el-table-column>
      <el-table-column prop="PlatHotelName" label="平台酒店名称" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="PlatHotelName_En" label="平台酒店英文名" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="平台访问路径" :show-overflow-tooltip="true">
        <template scope="scope">
            <a target="_blank" :href="scope.row.PlatURL">{{scope.row.PlatURL}}</a>
        </template>
      </el-table-column>
      <el-table-column label="有效" width="70" align="center">
        <template scope="scope">
<i class="el-icon-circle-check" v-if="scope.row.IsValid"></i>
<i class="el-icon-circle-close" v-else></i>
</template>
      </el-table-column>
      <el-table-column prop="Remark" label="备注" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column  label="操作" width="120">
        <template scope="scope">
<el-button size="mini" @click="platforminfoEdit(scope.$index, scope.row)">
    编辑</el-button>
<el-button size="mini" type="danger" @click="platforminfoDelete(scope.$index, scope.row)">删除</el-button>
</template>
      </el-table-column>

    </el-table>
    <!-- table end -->

    <!-- create dialog start -->
    <el-dialog title="添加新平台映射信息" v-model="createDialog" size="small">
      <el-form :rules="rules" class="around" ref="createForm" :model="createForm">
        <div>
          <el-form-item label="酒店ID">
            <el-input v-model="createForm.hotelId" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="平台访问路径">
            <el-input v-model="createForm.platUrl"></el-input>
          </el-form-item>
          <el-form-item label="平台酒店名称">
            <el-input v-model="createForm.platHotelName"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input class="w193" type="textarea" v-model="createForm.remark"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="平台名称" prop="platformId">
            <el-select class="w193" v-model="createForm.platformId" placeholder="请选择">
              <el-option
                v-for="item in platInfoList"
                :label="item.PlatName"
                :value="item.ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="平台酒店ID" prop="platHotelId">
            <el-input v-model="createForm.platHotelId"></el-input>
          </el-form-item>
           <el-form-item label="平台酒店英文名">
            <el-input v-model="createForm.platHotelName_En"></el-input>
          </el-form-item>
          <el-form-item label="是否有效">
           <el-switch v-model="createForm.isValid" on-text="" off-text=""></el-switch>
         </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createDialog = false">取 消</el-button>
        <el-button type="primary" @click="platforminfoSave('createForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- create dialog end -->

    <!-- edit dialog start -->
    <el-dialog title="编辑平台映射信息" v-model="editDialog" size="small" :modal-append-to-body="false">
      <el-form :rules="rules" class="around" ref="editForm" :model="editForm">
        <div>
          <el-form-item label="ID">
            <el-input v-model="editForm.ID" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="酒店ID">
            <el-input v-model="editForm.HotelID" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="平台访问路径">
            <el-input v-model="editForm.PlatURL"></el-input>
          </el-form-item>
          <el-form-item label="平台酒店名称">
            <el-input v-model="editForm.PlatHotelName"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input class="w193" type="textarea" v-model="editForm.Remark"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="平台名称" prop="PlatformID">
            <el-select class="w193" v-model="editForm.PlatformID" placeholder="请选择">
              <el-option v-for="item in platInfoList"
                :label="item.PlatName"
                :value="item.ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="平台酒店ID" prop="PlatHotelID">
            <el-input v-model="editForm.PlatHotelID"></el-input>
          </el-form-item>
           <el-form-item label="平台酒店英文名">
            <el-input v-model="editForm.PlatHotelName_En"></el-input>
          </el-form-item>
          <el-form-item label="是否有效">
           <el-switch v-model="editForm.IsValid" on-text="" off-text=""></el-switch>
         </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click="platforminfoEditSave('editForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- edit dialog end -->
  </div>
</template>

<script>
import {
    HotelPlatformApi,
    HotelThreePlatInfoApi
} from 'api';

export default {
    data() {
        // var validatePlatformId = (rule, value, callback) => {
        //   console.log(rule)
        //   console.log(value)
        //     if (value === '') {
        //         callback(new Error('请选择平台'));
        //     } else {
        //         if (this.createForm.platHotelId !== '') {
        //             this.$refs.createForm.validateField('checkPlatHotelId');
        //         }
        //         callback();
        //     }
        // };
        return {
            list: [],
            platInfoList: [],
            filters: {},
            createDialog: false,
            editDialog: false,
            createForm: {
                platformId: '',
                hotelId: '',
                platHotelId: '',
                platUrl: '',
                platHotelName: '',
                platHotelName_En: '',
                remark: '',
                isValid: true
            },
            editForm: {},
            rules: {
                platformId: [{
                    required: true,
                    message: '请选择平台',
                    trigger: 'change'
                }],
                platHotelId: [{
                    required: true,
                    message: '请输入平台酒店ID',
                    trigger: 'blur'
                }],
                PlatformID: [{
                    required: true,
                    message: '请选择平台',
                    trigger: 'change'
                }],
                PlatHotelID: [{
                    required: true,
                    message: '请输入平台酒店ID',
                    trigger: 'blur'
                }]
            }
        }
    },
    mounted() {
        this.fetchData();
        this.getHotelThreePlatInfoList();
    },
    methods: {
        async platforminfoSave(formName) {
            const _self = this;
            _self.createForm.platformId = _self.createForm.platformId.toString();
            _self.$refs[formName].validate(async valid => {
                if (valid) {
                    try {
                        console.log(_self.createForm);
                        await HotelPlatformApi.addInfo(_self.createForm);
                        _self.fetchData();
                        _self.createDialog = false;
                        _self.$message({
                            message: '保存成功',
                            type: 'success'
                        });
                    } catch (e) {
                        console.error(e);
                    }
                } else {
                    return false;
                }
            });

        },
        async platforminfoEditSave(formName) {
            const _self = this;
            _self.editForm.PlatformID = _self.editForm.PlatformID.toString();
            _self.$refs[formName].validate(async valid => {
                if (valid) {
                    try {
                        await HotelPlatformApi.editInfo(_self.editForm);
                        _self.fetchData();
                        _self.editDialog = false;
                        _self.$message({
                            message: '编辑成功',
                            type: 'success'
                        });
                    } catch (e) {
                        console.error(e);
                    }
                } else {
                    return false;
                }
            });

        },
        addPlatforminfo() {
            const _self = this;
            _self.createDialog = true;
            _self.createForm = {
                platformId: '',
                hotelId: this.$route.params.ID,
                platHotelId: '',
                platUrl: '',
                platHotelName: '',
                platHotelName_En: '',
                remark: '',
                isValid: true
            }
        },
        async platforminfoEdit($index, row) {
            const _self = this;
            _self.editDialog = true;
            try {
                const res = await HotelPlatformApi.getDetail(row.ID);
                this.editForm = { ...res.data
                };
                console.log(res.data)
            } catch (e) {
                console.error(e);
            }
        },
        async platforminfoDelete($index, row) {
            const _self = this;
            try {
                await _self.$confirm('是否删除此条信息?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                });
                await HotelPlatformApi.delInfo(row.ID);
                _self.fetchData();
                _self.$message({
                    message: '删除成功',
                    type: 'success'
                });
            } catch (e) {
                console.error(e);
            }
        },
        async fetchData() {
            const res = await HotelPlatformApi.getHotelList(this.$route.params.ID);
            console.log(res.data)
            this.list = res.data;
        },
        async getHotelThreePlatInfoList() {
            const res = await HotelThreePlatInfoApi.getList();
            this.platInfoList = res.data;
        }
    }
}
</script>
<style lang="scss">
#HotelPlatformInfo {
    .filters {
        margin: 0 0 20px;
        border: 1px #efefef solid;
        padding: 10px;
        background: #f9f9f9;

        .filter {
            display: inline-block;
            width: auto;
            padding: 10px;
            border-radius: 5px;
            .el-select {
                display: inline-block;
            }
        }

        .el-input {
            width: 150px;
            display: inline-block;
        }
    }
    .pagination-wrapper {
        text-align: center;
        padding: 30px;
    }
    .around {
        display: flex;
        justify-content: space-around;
    }
    .el-form-item {
        margin-bottom: 22px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
    .w193 {
        width: 193px;
    }
}
</style>
