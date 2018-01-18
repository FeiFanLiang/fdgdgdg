<template lang="html">
  <div >
    <el-row>
      <el-button type="primary" @click="clickAddBtn()">创建</el-button>
    </el-row>
    <el-table :data="list" border style="width: 100%" element-loading-text="拼命加载中" v-loading="loading">
      <el-table-column prop="PlatformHotelID" label="平台酒店ID"></el-table-column>
      <el-table-column prop="Period" label="抓取频率" ></el-table-column>
      <el-table-column prop="StartDate" label="开始日期" ></el-table-column>
      <el-table-column prop="EndDate" label="结束日期" width="110"></el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template scope="scope">
  <DeleteButton api="spiderSettingApi" @successCallBack="fetchData" :id="scope.row.ID"></DeleteButton>
  </template>
      </el-table-column>
    </el-table>
    <div class="pagination-wrapper" v-show="!loading&&list.length">
      <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog title="爬虫配置" v-model="showDialog" size="tiny" :modal-append-to-body="false" @close="resetForm('form')" :modal="false">
      <el-form :rules="rules"  ref="form" :model="form" >

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="开始日期" prop="startDate">
               <el-input-number size="small" v-model="form.startDate"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束日期" prop="endDate">
               <el-input-number size="small" v-model="form.endDate"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="周期" prop="period">
               <el-input-number size="small" v-model="form.period"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="closeDialog()">取 消</el-button>
          <el-button type="primary" @click="addSave()" :loading="!isEditable">{{isEditable?'确 定':'提交中'}}</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import { spiderSettingApi } from 'api'

import { HotelTopMenu } from 'components'

export default {
  components: {
    HotelTopMenu
  },
  props: {
    platformHotelId: {
      required: true
    },
    isShow: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  watch: {
    isShow(val) {
      val && this.fetchData()
    }
  },
  data() {
    return {
      list: [],
      total: 0,
      currentPage: 1,
      loading: false,
      isEditable: true,
      showDialog: false,
      form: {
        platformHotelId: '',
        period: '',
        startDate: '',
        endDate: ''
      },
      rules: {
        period: [
          {
            required: true,
            message: '请选择周期',
            type: 'number'
          }
        ],
        startDate: [
          {
            required: true,
            message: '请选择周期',
            type: 'number'
          }
        ],
        endDate: [
          {
            required: true,
            message: '请选择周期',
            type: 'number'
          }
        ]
      }
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val
    },
    async fetchData() {
      const _self = this
      _self.loading = true
      try {
        const res = await spiderSettingApi.listByHotel(this.platformHotelId)
        _self.list = res.data
        _self.total = _self.list.length
      } catch (e) {
        _self.list = []
        _self.total = 0
      }
      _self.loading = false
    },
    clickAddBtn() {
      const _self = this
      _self.showDialog = true
    },
    closeDialog() {
      const _self = this
      _self.showDialog = false
      _self.$refs['form'].resetFields()
    },
    async addSave() {
      const _self = this
      _self.$refs['form'].validate(async valid => {
        if (valid) {
          try {
            _self.isEditable = false
            _self.form.platformHotelId = _self.platformHotelId
            await spiderSettingApi.setPeriod(_self.form)
            _self.fetchData()
            _self.$refs['form'].resetFields()
            _self.showDialog = false
            _self.$message({
              message: '保存成功',
              type: 'success'
            })
          } catch (e) {
            console.log(e)
            _self.$message.error('添加失败!!!')
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
