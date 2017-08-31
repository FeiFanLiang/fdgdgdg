<template lang="html">
    <div id="gasoline-card-log">
        <el-row :gutter="20">
            <el-col :span="4">
                <el-select v-model="filters.gasolineCardID" placeholder="请选择">
                   <el-option
                      v-for="(item,index) in cardList"
                      :key="index"
                      :label="item.CardNum"
                      :value="item.ID">
                   </el-option>
                </el-select>
            </el-col>
            <el-col :span="10">
                <el-button type="primary" @click="gasolineSearch(filters)">搜索</el-button>
                <el-button type="primary" @click="clear()">清空</el-button>
                <el-button type="primary" @click="clickAddBtn">
                    创建
                </el-button>
            </el-col >
        </el-row>
        <el-table :data="list" ref="table" style="width: 100%" element-loading-text="拼命加载中" v-loading="loading" border>
            <el-table-column type="expand">
                <template scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item>
                             <img v-if="props.row.ImagePath" :src="imageUrl+ props.row.ImagePath" style="width: 200px;">
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="ID" label="ID"></el-table-column>
            <el-table-column prop="DateTime" label="加油时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="GasolineCardID" label="油卡编号"></el-table-column>
            <el-table-column prop="Total" label="总额"></el-table-column>
            <el-table-column prop="Balance" label="余额"></el-table-column>
            <el-table-column label="操作" width="150">
<template scope="scope">
    <el-button size="small" @click="clickEditBtn(scope.$index, scope.row)">
        编辑</el-button>
    <DeleteButton api="gasolineCardLogApi" @successCallBack="fetchData" :id="scope.row.ID"></DeleteButton>
</template>
            </el-table-column>
        </el-table>
        <div class="pagination-wrapper">
            <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30]" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="count">
            </el-pagination>
        </div>
        <el-dialog :title="form.ID?'编辑加油卡充值记录':'添加加油卡充值记录'" v-model="showDialog" @close="resetForm('form')">
            <el-form ref="form" :model="form" :rules="rules" label-width="110px">
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="加油时间" prop="DateTime">
                            <el-date-picker v-model="form.DateTime" type="datetime" placeholder="选择加油时间" :picker-options="pickerOptions" style="width:100%"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="油卡编号" prop="GasolineCardID">
                            <el-select v-model="form.GasolineCardID" placeholder="请选择">
                                <el-option
                                v-for="(item,index) in cardList"
                                :key="index"
                                :label="item.CardNum"
                                :value="item.ID">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="总额" prop="Total">
                            <el-input placeholder="请输入总额" v-model="form.Total"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="余额" prop="Balance">
                            <el-input placeholder="请输入余额" v-model="form.Balance"></el-input>
                        </el-form-item>
                    </el-col>
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
import path from '../../../api/api.js'
import { gasolineCardLogApi, gasolineLogApi } from 'api'
export default {
  created() {
    this.imageUrl = path.imageUrl
    this.fetchData()
    this.getList()
  },
  data() {
    return {
      rules: {
        GasolineCardID: [{ required: true, message: '请选择油卡编号' }],
        DateTime: [{ required: true, message: '请选择加油时间' }],
        Total: [{ required: true, message: '请输入总额' }],
        Balance: [{ required: true, message: '请输入余额' }]
      },
      filters: {
        gasolineCardID: ''
      },
      imageUrl: '',
      list: [],
      currentPage: 1,
      pageSize: 10,
      count: 0,
      loading: false,
      showDialog: false,
      disabled: false,
      form: {
        GasolineCardID:'',
        DateTime: '',
        Total:'',
        Balance:'',
        UseType:0
      },
      pickerOptions: {},
      isEditable:true,
      cardList:[]
    }
  },
  methods: {
    querySearch(queryString, cb) {
        var restaurants = this.oilList;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        cb(results);
    },
    createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
        };
    },
    handleSelect(item) {
        console.log(item);
    },
    gasolineSearch() {
      this.fetchData()
    },
    clear(){
        this.filters.gasolineCardID = ''
        this.fetchData()
    },
    async fetchData(currentPage, pageSize) {
      const _self = this
      _self.loading = true
      _self.currentPage = currentPage || _self.currentPage
      _self.pageSize = pageSize || _self.pageSize
      const options = {
        pageIndex: _self.currentPage,
        pageSize: _self.pageSize,
        order: 'ID',
        query: {
          gasolineCardID: _self.filters.gasolineCardID
        }
      }
      try {
        const res = await gasolineCardLogApi.list(options)
        _self.list = res.data.Data
        _self.count = res.data.Count
        _self.loading = false
      } catch (e) {
        console.error(e)
        _self.loading = false
      }
    },
    async getList() {
      const res3 = await gasolineLogApi.cardList()
      this.cardList = res3.data.Data
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.fetchData(this.pageSize)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData(this.currentPage)
    },
    clickAddBtn() {
      const _self = this
      this.form = {
        GasolineCardID:'',
        DateTime: '',
        Total:'',
        Balance:'',
        UseType:0
      }
      _self.showDialog = true
    },
    async clickEditBtn($index, row) {
      const _self = this
      try {
        const res = await gasolineCardLogApi.detail(row.ID)
        _self.form = res.data.Data
        _self.showDialog = true
      } catch (e) {
        console.error(e)
      }
    },
    submitForm() {
      const _self = this
      if (_self.form.ID) {
        _self.editSave()
      } else {
        _self.addSave()
      }
    },
    async addSave() {
      const _self = this
      _self.$refs['form'].validate(async valid => {
        if (valid) {
          try {
            _self.isEditable = false
            _self.form.DateTime ? (_self.form.DateTime = new Date(_self.form.DateTime).Format('yyyy-MM-dd hh:mm:ss')): ''
            await gasolineCardLogApi.add(_self.form)
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
            _self.isEditable = false
            _self.form.DateTime ? (_self.form.DateTime = new Date(_self.form.DateTime).Format('yyyy-MM-dd hh:mm:ss')): ''
            await gasolineCardLogApi.edit(_self.form.ID, _self.form)
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
    },
    channelChange() {
      if (this.form.Channel == 0) {
        this.disabled = false
      }
      if (this.form.Channel == 1) {
        this.disabled = true
        this.form.SerialNumber = ''
      }
    }
  }
}
</script>
<style lang="scss">
#gasoline-card-log {
    .pagination-wrapper {
        text-align: center;
        padding: 30px;
    }
    .el-table__expanded-cell {
        padding: 20px 15px 20px 66px !important;
    }
    .demo-table-expand {
        padding: 0 0 10px 16px !important;
    }
}
</style>
