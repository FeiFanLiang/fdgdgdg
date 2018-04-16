<template lang="html">
<div id="Wxyh">
    <el-row :gutter="20">
        <el-col :span="5">
            <el-input placeholder="请输入微信昵称" v-model="filters.Nickname"></el-input>
        </el-col>
        <el-col :span="5">
            <el-button type="primary" @click="carlineStationSearch(filters)">搜索</el-button>
            <el-button type="primary" @click="clickAddBtn()">添加</el-button>
        </el-col>
    </el-row>
    <el-table :data="dwzList" border style="width: 100%" v-loading="loading">
        <el-table-column prop="OrderNo" label="订单号"></el-table-column>
        <el-table-column prop="HotelName" label="酒店名称"></el-table-column>       
        <el-table-column prop="UserName" label="微信号"></el-table-column>
        <el-table-column prop="Name" label="姓名"></el-table-column>
        <el-table-column prop="Tel" label="电话"></el-table-column>
        <el-table-column prop="OptUser" label="处理人"></el-table-column>
        <el-table-column prop="Remark" label="备注" width="150"></el-table-column>
        <el-table-column prop="State" label="状态">
        <template scope="scope">
            <span v-if="scope.row.State == 1">加V成功</span>
            <span v-if="scope.row.State == 0">加V失败</span>
            <span v-if="scope.row.State == 2">不存在</span>
            
          </template>
        </el-table-column>
        
       
        <el-table-column label="操作" width="170">
            <template scope="scope">
                <el-button type="primary" size="small" @click="clickEditBtn(scope.$index,scope.row)">编辑</el-button>
                <DeleteButton api="wxyhApi" @successCallBack="fetchData" :id="scope.row.ID" style="display:inline-block"></DeleteButton>
            </template>
        </el-table-column>
    </el-table>
    <div class="pagination-wrapper" style="text-align:center;margin:10px;">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30]" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="count"></el-pagination>
    </div>
    <el-dialog :title="dialogTitle" v-model="showDialog" @close="resetForm('form')">
      <el-form ref="form" :model="form"  label-width="80px">
        <el-row :gutter="20">
          <el-col :span="12">
              <el-form-item label="订单号" prop="OrderNo">
                  <el-input v-model="form.OrderNo" @blur="find()" ></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="酒店名称:" prop="HotelName">
                  <span>{{HotelName}}</span>
              </el-form-item>
          </el-col>
          
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
              <el-form-item label="姓名" prop="Name">
                  <el-input v-model="form.Name" ></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="电话" prop="Tel">
                  <el-input v-model="form.Tel" ></el-input>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
              <el-form-item label="处理人" prop="OptUser">
                  <el-input v-model="form.OptUser" ></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="采购人" prop="CaiUser">
                  <el-input v-model="form.CaiUser" ></el-input>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20"> 
         <el-col :span="12">
              <el-form-item label="微信号" prop="UserName">
                  <el-input v-model="form.UserName" ></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="状态" prop="State">
                  <el-radio-group v-model="form.State">
                      <el-radio :label="1">加V成功</el-radio>
                      <el-radio :label="0">加V失败</el-radio>
                      <el-radio :label="2">不存在</el-radio>                      
                  </el-radio-group>   
              </el-form-item> 
          </el-col> 
        </el-row>
          <el-col :span="24">
              <el-form-item label="备注" prop="Remark">
                  <el-input  type="textarea" v-model="form.Remark" autosize :minlength="200"></el-input>
              </el-form-item>
          </el-col>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
          <el-button type="primary" @click="submitForm()" :loading="!isEditable">{{isEditable?'确 定':'提交中'}}</el-button>
      </span>
    </el-dialog>
</div>
</template>
<script>
import { wxyhApi,hotelsOrderApi } from 'api'
export default {
  data() {
    return {
      dwzList: [],
      currentPage: 1,
      pageSize: 10,
      count: 0,
      loading: false,
      isEditable: true,
      showDialog: false,
      dialogTitle: '',
      labelPosition: 'right',
      HotelName:"",
      form: {
        OrderNo: '',
        UserName: '',
        ID:'',
        HotelName:"",
        HotelID:"",
        Name: '',
        OptUser: '', 
        CaiUser: '',
        Remark: '',
        State:'',                          
        Tel: ''
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
    async find(){
      const _self = this
      const res = await hotelsOrderApi.getDetail(_self.form.OrderNo);
      const xinxi = res.data.Data
      _self.form.HotelID = xinxi.HotelID
      _self.form.HotelName = xinxi.HotelName
      _self.HotelName = xinxi.HotelName 
      console.log(res.data.Data)

    },
    async fetchData(currentPage,pageSize) {
      const _self = this
      _self.loading = true
      _self.currentPage = currentPage || _self.currentPage
      _self.pageSize = pageSize || _self.pageSize
      const options = {
            pageIndex: currentPage || _self.currentPage,
            pageSize: pageSize || _self.pageSize,
            order: 'ID',
            query:{
                   Nickname: _self.filters.Nickname   
            }
      }
      try {
        const res = await wxyhApi.listByQuery(options)
        console.log(res)
        _self.dwzList = res.data.Data
        _self.count = res.data.Count        
        _self.loading = false
      } catch (e) {
        _self.loading = false
      }
    },
    async clickAddBtn() {
      const _self = this
      _self.dialogTitle = '添加微信用户'
      _self.showDialog = true
      _self.form = {}
      _self.State = 0  
      _self.HotelName = ''    
    },
    async clickEditBtn($index, row) {
      const _self = this
      _self.dialogTitle = '编辑微信用户信息'
      _self.showDialog = true      
      try {
        _self.form.CaiUser = row.CaiUser
        _self.form.Name = row.Name
        _self.HotelName = row.HotelName
        _self.form.OrderNo = row.OrderNo
        _self.form.ID = row.ID
        _self.form.OptUser = row.OptUser
        _self.form.State = row.State        
        _self.form.Tel = row.Tel
        _self.form.UserName = row.UserName
        _self.form.Remark = row.Remark 
      } catch (e) {
        console.error(e)
      }
    },
    submitForm() {
      const _self = this
      if (_self.dialogTitle == '编辑微信用户信息') {
        _self.editSave()
      } else {
        _self.addSave()
      }
    },
    async addSave() {
      const _self = this
      try {
        _self.isEditable = false
        await wxyhApi.add(_self.form)
        _self.fetchData()
        _self.showDialog = false
        _self.$message({
          message: '保存成功',
          type: 'success'
        })
      } catch (e) {
        console.error(e)
        _self.$message.error('添加失败!!!')
      } finally {
        _self.isEditable = true
      }
    },
    async editSave() {
      const _self = this
      const form = {}
      for (let [k, v] of Object.entries(_self.form)) {
        if (_self.form[k] != _self.copyForm[k]) {
          form[k] = v
        }
      }
      try {
        _self.isEditable = false
        await wxyhApi.edit(_self.form.ID, form)
        _self.showDialog = false
        _self.fetchData()
        _self.$message({
          message: '编辑成功',
          type: 'success'
        })
      } catch (e) {
        console.error(e)
        _self.$message.error('编辑失败!!!')
      } finally {
        _self.isEditable = true
      }
    }
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
