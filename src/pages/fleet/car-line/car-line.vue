<template lang="html">
<div id="carLine">
     <CustomSearch :configList="configList.searchFields" @searchCallback="searchCallback">
        <el-button type="primary" @click="clickAddBtn" slot="button-add">创建</el-button>
    </CustomSearch>
    <CustomTable :list="list" :configList="configList.listFields" :editMethod="configList.editMethod" @successCallBack="fetchData" element-loading-text="拼命加载中" v-loading="loading">
        <el-table-column label="操作" width="150" slot="right-two">
            <template scope="scope">
                <el-button size="small" @click="clickEditBtn(scope.$index, scope.row)">编辑</el-button>
                <DeleteButton api="carLineApi" @successCallBack="fetchData" :id="scope.row.ID"></DeleteButton>
            </template>
        </el-table-column>
    </CustomTable>
    <div class="pagination-wrapper">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" 
        :page-sizes="[10, 20, 30]" @size-change="handleSizeChange" @current-change="handleCurrentChange" 
        :current-page="currentPage" :page-size="pageSize" :total="count">
        </el-pagination>
    </div>
    <el-dialog :title="form.ID?'编辑车辆运行路线':'添加车辆运行路线'" v-model="showDialog" @close="resetForm('form')">
        <el-form :rules="rules" ref="form" :model="form" label-width="110px">
            <el-form-item label="名称" prop="Name">
                <el-input v-model="form.Name"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="Description">
                <el-input type="textarea" v-model="form.Description"></el-input>
            </el-form-item>
            <el-form-item label="全程用时" prop="TotalTime">
                <el-input v-model="form.TotalTime"></el-input>
                <!-- <el-time-picker v-model="form.TotalTime" ceholder="任意时间点"></el-time-picker> -->
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitForm()">确 定</el-button>
        </span>
    </el-dialog>
</div>  
</template>
<script>
import {
  carLineApi
} from 'api'
export default {
  created () {
      this.fetchData();
      this.configList = carLineApi.getConfig();
  },
  data(){
      return{
            list:[],
            currentPage: 1,
            pageSize: 10,
            count: 0,
            loading: false,
            filters: {
                Name:''
            },
            showDialog: false,
            form: {
                ID:'',
                Name:'',
                Description:'',
                TotalTime:''
                /* new Date(2017, 7, 20, 0, 0) */
            },
            rules: {
                Name: [{
                    required: true,
                    message: '请输入路线名称'
                }],
            },
      }
  },
  methods:{
      searchCallback(filters) {
            this.filters = filters
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
                     Name:_self.filters.Name
                }
            }
            try {
                const res = await carLineApi.listByQuery(options)
                _self.list = res.data.Data
                _self.count = res.data.Count
                _self.loading = false
            } catch (e) {
                console.error(e)
                _self.loading = false
            }
      },
      handleSizeChange(val) {
            this.pageSize = val
            this.fetchData(this.pageSize)
      },
      handleCurrentChange(val) {
            this.currentPage = val
            this.fetchData(this.currentPage)
      },
      clickAddBtn(){
            const _self = this
            _self.showDialog = true
            _self.form = {}
      },
      async clickEditBtn($index,row){
            const _self = this
            try {
                //const res = await carLineApi.detail(row.ID)
                _self.showDialog = true
                _self.form.ID = row.ID
                _self.form.Name = row.Name
                _self.form.Description = row.Description
                _self.form.TotalTime = row.TotalTime
                /* _self.form.ID = res.data.Data.ID
                _self.form.Name = res.data.Data.Name
                _self.form.Description = res.data.Data.Description
                _self.form.TotalTime = res.data.Data.TotalTime */
            } catch (e) {
                console.error(e)
            }
      },
      submitForm(){
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
                    await carLineApi.add(_self.form)
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
                    await carLineApi.edit(_self.form)
                    _self.$refs['form'].resetFields()
                    _self.showDialog = false
                    _self.fetchData()
                    _self.$message({
                    message: '编辑成功',
                    type: 'success'
                    })
                } catch (e) {
                    console.error(e)
                    _self.$message.error('编辑失败!!!')
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

</style>

