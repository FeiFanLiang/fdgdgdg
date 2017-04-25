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
      <el-button type="primary" @click="addBtn('form')">创建</el-button>
    </div>
    <!-- filters end -->
    <!-- table start -->
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="80"></el-table-column>
      <el-table-column prop="platHotelId" label="平台酒店ID" width="110"></el-table-column>
      <el-table-column prop="hotelId" label="酒店名称" show-overflow-tooltip></el-table-column>
      <el-table-column prop="platName" label="平台名称"></el-table-column>
      <el-table-column prop="platHotelName" label="平台酒店名称" show-overflow-tooltip></el-table-column>
      <el-table-column prop="platHotelNameEn" label="平台酒店英文名" show-overflow-tooltip></el-table-column>
      <el-table-column label="平台访问路径" show-overflow-tooltip>
        <template scope="scope">
            <a target="_blank" :href="scope.row.platUrl">{{scope.row.platUrl}}</a>
        </template>
      </el-table-column>
      <el-table-column label="有效" width="70" align="center">
        <template scope="scope">
<i class="el-icon-circle-check" v-if="scope.row.isValid"></i>
<i class="el-icon-circle-close" v-else></i>
</template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
      <el-table-column  label="操作" width="120">
        <template scope="scope">
<el-button size="mini" @click="editBtn(scope.$index, scope.row)">
    编辑</el-button>
<el-button size="mini" type="danger" @click="delBtn(scope.$index, scope.row)">删除</el-button>
</template>
      </el-table-column>
    </el-table>
    <!-- table end -->

    <!-- dialog start -->
    <el-dialog :title="dialogTitle" v-model="showDialog" size="small" :modal-append-to-body="false">
      <el-form :rules="rules" class="around" ref="form" :model="form">
        <div>
          <el-form-item label="ID" v-if="dialogTag === 2">
            <el-input v-model="form.id" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="酒店ID">
            <el-input v-model="form.hotelId" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="平台访问路径">
            <el-input v-model="form.platUrl"></el-input>
          </el-form-item>
          <el-form-item label="平台酒店名称">
            <el-input v-model="form.platHotelName"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input class="w193" type="textarea" v-model="form.remark"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="平台名称" prop="platformId">
            <el-select class="w193" v-model="form.platformId" placeholder="请选择">
              <el-option v-for="item in platInfoList"
                :label="item.PlatName"
                :value="item.ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="平台酒店ID" prop="platHotelId">
            <el-input v-model.number="form.platHotelId"></el-input>
          </el-form-item>
           <el-form-item label="平台酒店英文名">
            <el-input v-model="form.platHotelNameEn"></el-input>
          </el-form-item>
          <el-form-item label="是否有效">
           <el-switch v-model="form.isValid" on-text="" off-text=""></el-switch>
         </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- dialog end -->
  </div>
</template>

<script>
import {
    hotelPlatformApi,
    hotelThreePlatInfoApi
} from 'api';

export default {

    data() {
        return {
            list: [],
            platInfoList: [],
            filters: {},
            showDialog: false,
            dialogTitle: '',
            dialogTag: '',
            form: {
                id: '',
                platformId: '',
                hotelId: '',
                platHotelId: '',
                platUrl: '',
                platHotelName: '',
                platHotelNameEn: '',
                remark: '',
                isValid: ''
            },
            rules: {
                platformId: [{
                    required: true,
                    message: '请选择平台',
                    type: 'number'
                }],
                platHotelId: [{
                        required: true,
                        message: '请输入平台酒店ID'
                    },
                    {
                        type: 'number',
                        message: '平台酒店ID必须为数字值'
                    }
                ]
            }
        }

    },
    mounted() {
        this.fetchData();
        this.getHotelThreePlatInfoList();
    },
    methods: {
        async addSave(a) {
            const _self = this;
            _self.$refs[a].validate(async valid => {
                if (valid) {
                    try {
                        _self.form.platHotelName_En = _self.form.platHotelNameEn;
                        await hotelPlatformApi.addInfo(_self.form);
                        _self.fetchData();
                        _self.showDialog = false;
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
        async editSave(a) {
            const _self = this;
            _self.$refs[a].validate(async valid => {
                if (valid) {
                    try {
                        _self.form.platHotelName_En = _self.form.platHotelNameEn;
                        await hotelPlatformApi.editInfo(_self.form);
                        _self.fetchData();
                        _self.showDialog = false;
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
        submitForm(a) {
            const _self = this;
            if (_self.dialogTag === 1) _self.addSave(a);
            if (_self.dialogTag === 2) _self.editSave(a);
        },
        addBtn(a) {
            const _self = this;
            _self.showDialog = true;
            _self.dialogTag = 1;
            _self.dialogTitle = "添加平台映射信息";
            _self.form = {
                // id: '',
                platformId: '',
                hotelId: this.$route.params.ID,
                platHotelId: '',
                platUrl: '',
                platHotelName: '',
                platHotelNameEn: '',
                remark: '',
                isValid: true
            }
            _self.$refs[a].resetFields();
        },
        async editBtn($index, row) {
            const _self = this;
            try {
                const res = await hotelPlatformApi.getDetail(row.id);
                _self.showDialog = true;
                _self.dialogTag = 2;
                _self.dialogTitle = "编辑平台映射信息";
                _self.form.id = res.data.ID;
                _self.form.platformId = res.data.PlatformID;
                _self.form.hotelId = res.data.HotelID;
                _self.form.platHotelId = Number(res.data.PlatHotelID);
                _self.form.platUrl = res.data.PlatURL;
                _self.form.platHotelName = res.data.PlatHotelName;
                _self.form.platHotelNameEn = res.data.PlatHotelName_En;
                _self.form.remark = res.data.Remark;
                _self.form.isValid = res.data.IsValid;
            } catch (e) {
                console.error(e);
            }
        },
        async delBtn($index, row) {
            const _self = this;
            try {
                await _self.$confirm('是否删除此条信息?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                });
                await hotelPlatformApi.delInfo(row.id);
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
            const _self = this;
            _self.list = [];
            const res = await hotelPlatformApi.getHotelList(this.$route.params.ID);
            for (let [index, elem] of res.data.entries()) {
                _self.list.push({});
                _self.list[index].platformId = elem.PlatformID;
                _self.list[index].hotelId = elem.HotelID;
                _self.list[index].platHotelId = elem.PlatHotelID;
                _self.list[index].platUrl = elem.PlatURL;
                _self.list[index].platHotelName = elem.PlatHotelName;
                _self.list[index].platHotelNameEn = elem.PlatHotelName_En;
                _self.list[index].remark = elem.Remark;
                _self.list[index].isValid = elem.IsValid;
                _self.list[index].id = elem.ID;
                // _self.list[index].hotel = elem.Hotel;
                // _self.list[index].platform = elem.Platform;
                _self.list[index].platName = elem.Platform.PlatName;
            }
        },
        async getHotelThreePlatInfoList() {
            const _self = this;
            const res = await hotelThreePlatInfoApi.getList();
            _self.platInfoList = res.data;
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
