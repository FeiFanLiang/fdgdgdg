<template lang="html">
<div id="Wxyh">
    <el-row :gutter="20">
        <el-col :span="5">
            <el-input placeholder="" v-model="filters.Nickname"></el-input>
        </el-col>
        <el-col :span="6">
            <el-form-item label="创建时间">
                <el-date-picker  v-model="filters.CreateTime" type="daterange"></el-date-picker>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="自定义状态" prop="OptState" style="margin-bottom:30px">
                <el-select v-model="filters.OptState" clearable>
                  <el-option v-for="item in OptState" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="获取信息" slot="WaiCaiPlatID">
              <el-select v-model="filters.WaiCaiPlatID"  @change="changeValue1">
                  <el-option v-for="(item,index) in PlatPolicyID " :key="index" :label="item.Account" :value="item.ID"></el-option>
              </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="5">
            <el-button type="primary" @click="carlineStationSearch(filters)">搜索</el-button>
            <el-button type="primary" @click="clickAddBtn()">添加</el-button>
        </el-col>
        
    </el-row>
    <el-table :data="dwzList" border style="width: 100%" v-loading="loading">
        <el-table-column prop="Nickname" label="昵称"></el-table-column>
        <el-table-column label="销售渠道">
        <template scope="scope">
          <span v-for="item in PlatPolicyID">
            <span v-if="scope.row.PlatPolicyID==item.ID">{{item.Account}}</span>
          </span>
        </template>
        </el-table-column>
        <el-table-column label="预计结算日期" width=110>
            <template scope="scope">
                <span v-if="scope.row.ExpectSettlement != null">{{scope.row.ExpectSettlement.substring(0,10)}}</span>
            </template>
        </el-table-column> 
        <el-table-column prop="State" label="状态">
        <template scope="scope">
            <span v-if="scope.row.State == 0">废除</span>
            <span v-if="scope.row.State == 1">正常</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="170">
            <template scope="scope">
                <el-button type="primary" size="small" @click="clickEditBtn(scope.$index,scope.row)">编辑</el-button>
                <DeleteButton api="" @successCallBack="fetchData" :id="scope.row.ID" style="display:inline-block"></DeleteButton>
            </template>
        </el-table-column>
    </el-table>
    <div class="pagination-wrapper" style="text-align:center;margin:10px;">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30]" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="count"></el-pagination>
    </div>
    <el-dialog :title="dialogTitle" v-model="showDialog" @close="resetForm('form')">
      <el-form ref="form" :model="form"  label-width="60px">
        <el-row :gutter="20">
          <el-col :span="10">
              <el-form-item label="备注" prop="Remark">
                  <el-input  type="textarea" v-model="form.Remark" autosize :minlength="200"></el-input>
              </el-form-item>
          </el-col>
         <el-col :span="10">
              <el-form-item label="状态" prop="State">
                  <el-radio-group v-model="form.State">
                      <el-radio :label="1">正常</el-radio>
                      <el-radio :label="0">废除</el-radio>
                  </el-radio-group>   
              </el-form-item> 
          </el-col> 
      <!--  <el-col :span="12">        
              <el-form-item label="渠道" prop="PlatformID">
                  <el-select  v-model="form.PlatformID" placeholder="请选择">
                    <el-option v-for="(item,index) in PlatPolicyIDs" :label="item.PlatName" :value="item.ID" :key="index">
                    </el-option>
                  </el-select>
              </el-form-item>
          </el-col> -->
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
          <el-button type="primary" @click="submitForm()" :loading="!isEditable">{{isEditable?'确 定':'提交中'}}</el-button>
      </span>
    </el-dialog>
</div>
</template> 
<script>
import {  } from 'api'
export default {
  data() {
    return {
      currentPage: 1,
      dwzList:[],
      pageSize: 10,
      count: 0,
      loading: false,
      isEditable: true,
      showDialog: false,
      dialogTitle: '',
      form: {
       
      },
      copyForm: {},
      filters: {
        Nickname: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    carlineStationSearch() {
      this.fetchData()
    },
    handleSizeChange(val) {
        this.pageSize = val
        this.fetchData(1, this.pageSize)
    },
    handleCurrentChange(val) {
        this.currentPage = val
        this.fetchData(this.currentPage)
    },
    async fetchData(currentPage,pageSize) {
      const _self = this
      _self.loading = true
      _self.currentPage = currentPage || _self.currentPage
      _self.pageSize = pageSize || _self.pageSize
      const options = {
            pageIndex: currentPage || _self.currentPage,
            pageSize: pageSize || _self.pageSize,
            query:{
               zz:_self.filters.zz,
              'time>':_self.filters.time[0] ? new Date(_self.filters.time[0]).Format('yyyy-MM-dd') : '',
              'time<':_self.filters.time[1] ? new Date(_self.filters.time[1]).Format('yyyy-MM-dd') : ''

            }       
      }
      try {
      //  const res = await wxyhApi.listByQuery(options)
      //   console.log(res)
        _self.dwzList = res.data.Data
        _self.count = res.data.Count        
        _self.loading = false
      } catch (e) {
        _self.loading = false
      }
    },
    async clickAddBtn() {
      const _self = this
      _self.dialogTitle = ''
      _self.showDialog = true
      _self.form = {}
      _self.State = 0      
    },
    async clickEditBtn($index, row) {
      const _self = this
      _self.dialogTitle = ''
      _self.showDialog = true      
      try {
      //  _self.form.CaiUser = row.CaiUser
      } catch (e) {
        console.error(e)
      }
    },
    submitForm() {
      const _self = this
      if (_self.dialogTitle == '') {
        _self.editSave()
      } else {
        _self.addSave()
      }
    }
    // async addSave() {
    //   const _self = this
    //   try {
    //     _self.isEditable = false
    //     await wxyhApi.add(_self.form)
    //     _self.fetchData()
    //     _self.showDialog = false
    //     _self.$message({
    //       message: '保存成功',
    //       type: 'success'
    //     })
    //   } catch (e) {
    //     console.error(e)
    //     _self.$message.error('添加失败!!!')
    //   } finally {
    //     _self.isEditable = true
    //   }
    // },
    // async editSave() {
    //   const _self = this
    //   const form = {}
    //   for (let [k, v] of Object.entries(_self.form)) {
    //     if (_self.form[k] != _self.copyForm[k]) {
    //       form[k] = v
    //     }
    //   }
    //   try {
    //     _self.isEditable = false
    //     await wxyhApi.edit(_self.form.ID, form)
    //     _self.showDialog = false
    //     _self.fetchData()
    //     _self.$message({
    //       message: '编辑成功',
    //       type: 'success'
    //     })
    //   } catch (e) {
    //     console.error(e)
    //     _self.$message.error('编辑失败!!!')
    //   } finally {
    //     _self.isEditable = true
    //   }
    // }
  }
}
</script>
<style lang="scss">
#Wxyh{
  .el-dialog--small{
    width:50%
  }
}
</style>
