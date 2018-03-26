<template lang="html">
<div id="hotel-platform-info-page">
  <el-row>
    <el-button type="primary" @click="clickAddBtn()">创建</el-button>    
  </el-row>
    <el-table :data="list" border style="width: 100%" element-loading-text="拼命加载中" v-loading="loading">
        <el-table-column prop="Platform.PlatName" label="平台名称"></el-table-column>
        <el-table-column prop="Hotel.HotelName" label="酒店名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="PlatHotelName" label="平台酒店名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="PlatHotelID" label="平台酒店ID" width="110"></el-table-column>
        <el-table-column prop="PlatHotelName_En" label="平台酒店英文名" show-overflow-tooltip></el-table-column>
        <el-table-column prop="Remark" label="备注" show-overflow-tooltip></el-table-column>
        <el-table-column label="平台访问路径" show-overflow-tooltip>
          <template scope="scope">
            <a target="_blank" :href="scope.row.PlatURL">{{scope.row.PlatURL}}</a>
          </template>
        </el-table-column>
        <el-table-column label="有效" width="70" align="center">
          <template scope="scope">
          <i class="el-icon-circle-cross" style="color:#FF4949" v-if="scope.row.IsValid"></i>
          <i class="el-icon-circle-check" style="color:#13CE66" v-else></i>
          </template>
        </el-table-column>
        <el-table-column  label="操作" width="225" fixed="right">
          <template scope="scope">
          <el-button size="mini" @click="clickEditBtn(scope.$index, scope.row)">
            编辑</el-button>
          <el-button size="mini" @click="spiderSetting( scope.row)">
            爬虫设置</el-button>
          <DeleteButton api="hotelPlatformApi" @successCallBack="fetchData" :id="scope.row.ID"></DeleteButton>
          </template>
        </el-table-column>
    </el-table>
    <div class="pagination-wrapper" v-show="!loading&&list.length">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog :title="dialogTitle" v-model="showDialog" size="small" :modal-append-to-body="false" @close="resetForm('form')">
      <el-form :rules="rules" class="around" ref="form" :model="form">
        <div>
          <el-form-item label="ID" v-if="dialogTag === 2">
            <el-input v-model="form.id" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="平台酒店ID" prop="platHotelId">
            <el-input v-model.number="form.platHotelId"></el-input>
          </el-form-item>
          <el-form-item label="平台酒店名称">
            <el-input v-model="form.platHotelName"></el-input>
          </el-form-item>
          <el-form-item label="平台访问路径">
            <el-input v-model="form.platUrl"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input class="w193" type="textarea" v-model="form.remark"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="平台酒店ID2" prop="platHotelId2">
            <el-input v-model.number="form.platHotelId2"></el-input>
          </el-form-item>
          <el-form-item label="酒店ID" v-if="dialogTag === 2">
            <el-input v-model="form.hotelId" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="平台名称" prop="platformId">
            <el-select class="w193" v-model="form.platformId" placeholder="请选择" @change="changeVal">
              <el-option v-for="(item,index) in platInfoList"
                :label="item.PlatName"
                :value="item.ID"
                :key="index">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="平台账号" prop="PlatformAccountID">
            <el-select class="w193" v-model="form.PlatformAccountID" placeholder="请选择">
              <el-option v-for="(item,index) in PlatformAccountID"
                :label="item.ChannelType"
                :value="item.ID"
                :key="index">
              </el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="平台酒店英文名">
            <el-input v-model="form.platHotelNameEn"></el-input>
          </el-form-item>
          <el-form-item label="是否有效">
           <el-switch v-model="form.isDisabled" :on-value="false" :off-value="true" on-text="" off-text=""></el-switch>
         </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog()">取 消</el-button>
        <el-button type="primary" @click="submitForm()" :loading="!isEditable">{{isEditable?'确 定':'提交中'}}</el-button>
      </span>
    </el-dialog>
    <el-dialog title="爬虫设置"  :visible.sync="showSpiderDialog" size="full" :modal-append-to-body="false" :before-close="beforeClose" >
       <SpiderSetting :spiderData="spiderData" :isShow="showSpiderSetting" />
        </el-dialog>
  </div>
</template>

<script>
import { hotelPlatformApi, hotelThreePlatInfoApi, policyApi } from 'api'

import { HotelTopMenu } from 'components'
import SpiderSetting from '../spider-setting/index.vue'

export default {
  components: {
    HotelTopMenu,
    SpiderSetting
  },
  created() {
    this.fetchData()
    this.getHotelThreePlatInfoList()
    this.configList = hotelPlatformApi.getConfig()
    this.platformAccount()
  },
  data() {
    return {
      list: [],
      total: 0,
      currentPage: 1,
      platInfoList: [],
      nowI:"",
      loading: false,
      isEditable: true,
      showDialog: false,
      showSpiderDialog: false,
      showSpiderSetting: false,
      dialogTitle: '',
      dialogTag: '',
      form: {
        id: '',
        platformId: '',
        hotelId: '',
        platHotelId: '',
        platHotelId2: '',
        platUrl: '',
        platHotelName: '',
        platHotelNameEn: '',
        remark: '',
        isDisabled: '',
        PlatformAccountID: ''
      },
      rules: {
        platformId: [
          {
            required: true,
            message: '请选择平台',
            type: 'number'
          }
        ],
        platHotelId: [
          {
            required: true,
            message: '请输入平台酒店ID'
          }
          // {
          //   type: 'number',
          //   message: '平台酒店ID必须为数字值'
          // }
        ]
      },
      spiderData: '',
      PlatformAccountID: []
    }
  },
  methods: {
    async platformAccount() {
      const res = await policyApi.getPolicyPlatform()
      this.PlatformAccountID = res.data.Data
      console.log(this.PlatformAccountID)
    },
   async changeVal(e){
      const _self = this 
      let nowP = []
      const res = await policyApi.getPolicyPlatform()
      _self.PlatformAccountID = res.data.Data    
     for( let j in _self.PlatformAccountID){
       if(_self.PlatformAccountID[j].Platform.ID==e){
         nowP.push(_self.PlatformAccountID[j])
       }
     }
     _self.PlatformAccountID = nowP
    },
    beforeClose(done) {
      this.showSpiderSetting = false
      done()
    },
    spiderSetting(row) {
      console.log(row.ID)
      this.spiderData = row
      this.showSpiderDialog = true
      setTimeout(() => {
        this.showSpiderSetting = true
      }, 0)
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    async fetchData() {
      const _self = this
      _self.loading = true
      const res = await hotelPlatformApi.listByHotel(this.$route.params.ID)
      _self.list = res.data
      console.log(_self.list)
      _self.total = _self.list.length
      _self.loading = false
    },
    async getHotelThreePlatInfoList() {
      const _self = this
      const res = await hotelThreePlatInfoApi.getList()
      _self.platInfoList = res.data
      console.log(_self.platInfoList) 
    },
    clickAddBtn() {
      const _self = this
      _self.showDialog = true
      _self.dialogTag = 1
      _self.dialogTitle = '添加平台映射信息'
      _self.form = {
        // id: '',
        platformId: '',
        hotelId: this.$route.params.ID,
        platHotelId: '',
        platHotelId2: '',
        platUrl: '',
        platHotelName: '',
        platHotelNameEn: '',
        remark: '',
        isDisabled: true,
        PlatformAccountID: ''
      }
    },
    async clickEditBtn($index, row) {
      const _self = this
      try {
        const res = await hotelPlatformApi.detail(row.ID)
        console.log(res.data.Data)
        _self.showDialog = true
        _self.dialogTag = 2
        _self.dialogTitle = '编辑平台映射信息'
        _self.form.id = res.data.Data.ID
        _self.form.platformId = res.data.Data.PlatformID
        _self.form.hotelId = res.data.Data.HotelID
        _self.form.platHotelId = res.data.Data.PlatHotelID
        _self.form.platHotelId2 = res.data.Data.PlatHotelID_2
        _self.form.platUrl = res.data.Data.PlatURL
        _self.form.platHotelName = res.data.Data.PlatHotelName
        _self.form.platHotelNameEn = res.data.Data.PlatHotelName_En
        _self.form.remark = res.data.Data.Remark
        _self.form.isDisabled = res.data.Data.IsDisabled
        _self.form.PlatformAccountID = res.data.Data.PlatformAccountID
        console.log(_self.form)
      } catch (e) {
        console.error(e)
      }
    },
    closeDialog() {
      const _self = this
      _self.showDialog = false
      _self.$refs['form'].resetFields()
    },
    submitForm() {
      const _self = this
      if (_self.dialogTag === 1) _self.addSave()
      if (_self.dialogTag === 2) _self.editSave()
    },
    async addSave() {
      const _self = this
      _self.$refs['form'].validate(async valid => {
        if (valid) {
          try {
            _self.form.platHotelName_En = _self.form.platHotelNameEn
            _self.isEditable = false
            await hotelPlatformApi.add(_self.form)
            _self.fetchData()
            _self.$refs['form'].resetFields()
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
        } else {
          return false
        }
      })
    },
    async editSave() {
      const _self = this
      _self.$refs['form'].validate(async valid => {
        if (valid) {
          try {
            _self.form.platHotelName_En = _self.form.platHotelNameEn
            _self.isEditable = false
            await hotelPlatformApi.edit(_self.form)
            _self.fetchData()
            _self.$refs['form'].resetFields()
            _self.showDialog = false
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
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss">
#hotel-platform-info-page {
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
