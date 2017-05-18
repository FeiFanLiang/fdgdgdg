<template lang="html">
  <div id="bargains-room-page">
       <el-form :inline="true" :model="searchForm" class="demo-form-inline">
            <el-form-item label="开始日期">
                <el-date-picker
                    v-model="searchForm.beginDate"
                    type="date"
                    placeholder="选择开始日期"
                    :picker-options="pickerOptions0">
                 </el-date-picker>
            </el-form-item>
            <el-form-item label="结束日期">
                <el-date-picker
                    v-model="searchForm.endDate"
                    type="date"
                    placeholder="选择结束日期"
                    :picker-options="pickerOptions0">
                 </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="fetchData">搜索</el-button>
            </el-form-item>
      </el-form>
      <el-table :data="list" ref="table" style="width: 100%" element-loading-text="拼命加载中"
        v-loading="loading"
        border
        row-key="ID"
        >
        <el-table-column sortable prop="ID" label="ID" width="180" show-overflow-tooltip></el-table-column>
        <el-table-column sortable prop="AccountName"  label="账户名称" show-overflow-tooltip></el-table-column>
        <el-table-column sortable prop="AccountNum"  label="银行帐户" show-overflow-tooltip></el-table-column>
        <el-table-column prop="Remark" label="备注" show-overflow-tooltip></el-table-column>
        <el-table-column  width="150"  label="操作" fixed="right">
          <template scope="scope">
            <el-button size="small" @click="clickEditBtn(scope.$index, scope.row)">编辑</el-button>
           </template>
        </el-table-column>
      </el-table>
      <el-dialog :title="form.id?'编辑支付账户':'添加支付账户'" v-model="showDialog" size="tiny" @close="resetForm('form')">
        <el-form :rules="rules" ref="form" :model="form"  >
          <el-form-item label="账户名称" prop="accountName">
            <el-input placeholder="请输入账户名称" v-model="form.accountName"></el-input>
          </el-form-item>
          <el-form-item label="银行帐户" prop="accountNum">
            <el-input placeholder="请输入银行账户" v-model="form.accountNum"></el-input>
          </el-form-item>
          <el-form-item label="Remark">
            <el-input v-model="form.remark"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showDialog = false">取 消</el-button>
          <el-button type="primary" @click="editSave()">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import {
    bargainsRoomApi
} from 'api';


export default {
    data() {
        return {
            list: [],
            loading: true,
            showDialog: false,
            searchForm:{
                beginDate:'',
                endDate:''
            },
             pickerOptions0: {
                // disabledDate(time) {
                //     return time.getTime() < Date.now() - 8.64e7;
                // }
             },
            form: {
                id: '',
                accountName: '',
                accountNum: '',
                remark: ''
            },
            rules: {
                accountName: [{
                    required: true,
                    message: '请输入账户名称'
                }],
                accountNum: [{
                    required: true,
                    message: '请输入银行账户'
                }]
            }
        };
    },

    methods: {
        handleCurrentChange(val) {
            this.currentPage = val;
        },
        async fetchData() {
            const _self = this;
            _self.loading = true;
            try {
                console.log(_self.searchForm)
                // _self.searchForm.beginDate = new Date(_self.searchForm.beginDate).Format('yyyy-MM-dd');
                // _self.searchForm.endDate = new Date(_self.searchForm.endDate).Format('yyyy-MM-dd');
                const res = await bargainsRoomApi.list(_self.searchForm);
                _self.list = res.data;
                _self.loading = false;
            } catch (e) {
                console.error(e);
                _self.loading = false;
            }
        },
        clickAddBtn() {
            const _self = this;
            _self.showDialog = true;
            _self.form = {};
        },
        async clickEditBtn($index, row) {
            const _self = this;
            try {
                const res = await bargainsRoomApi.detail(row.ID);
                _self.showDialog = true;
                _self.form.id = res.data.ID;
                _self.form.accountName = res.data.AccountName;
                _self.form.accountNum = res.data.AccountNum;
                _self.form.remark = res.data.Remark;
            } catch (e) {
                console.error(e);
            }
        },
        async editSave() {
            const _self = this;
            _self.$refs['form'].validate(async valid => {
                if (valid) {
                    try {
                        await bargainsRoomApi.edit(_self.form);
                        _self.fetchData();
                        _self.$refs['form'].resetFields();
                        _self.showDialog = false;
                        _self.$message({
                            message: '编辑成功',
                            type: 'success'
                        });
                    } catch (e) {
                        console.error(e);
                        _self.$message.error('编辑失败!!!');
                    }
                } else {
                    return false;
                }
            });
        }
    },
    mounted() {
        this.fetchData();
        
         Date.prototype.Format = function(fmt) {
            let o = {
                'M+': this.getMonth() + 1, //月份
                'd+': this.getDate(), //日
                'h+': this.getHours(), //小时
                'm+': this.getMinutes(), //分
                's+': this.getSeconds(), //秒
                'q+': Math.floor((this.getMonth() + 3) / 3), //季度
                S: this.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(
                RegExp.$1,
                (this.getFullYear() + '').substr(4 - RegExp.$1.length)
                );
            for (let k in o)
                if (new RegExp('(' + k + ')').test(fmt))
                fmt = fmt.replace(
                    RegExp.$1,
                    RegExp.$1.length == 1 ?
                    o[k] :
                    ('00' + o[k]).substr(('' + o[k]).length)
                );
            return fmt;
       };
        this.searchForm.beginDate = new Date(new Date().getFullYear() + '-' + (new Date().getMonth()+1)+ '-01').Format('yyyy-MM-dd');
        this.searchForm.endDate = new Date().Format('yyyy-MM-dd');
    }
};
</script>

<style lang="scss">
    #bargains-room-page {}
</style>
