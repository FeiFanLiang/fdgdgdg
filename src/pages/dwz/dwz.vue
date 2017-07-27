<template lang="html">
<div id="Dwz">
    <el-row :gutter="20">
        <el-col :span="5">
            <el-input placeholder="请输入短链接名称" v-model="filters.Surl"></el-input>
        </el-col>
        <el-col :span="5">
            <el-button type="primary" @click="carlineStationSearch(filters)">搜索</el-button>
            <el-button type="primary" @click="clickAddBtn()">添加</el-button>
        </el-col>
    </el-row>
    <el-table :data="dwzList" border style="width: 100%" v-loading="loading">
        <el-table-column prop="Title" label="名称"></el-table-column>
        <el-table-column label="Surl"><!-- //短链接 -->
            <template scope="scope">
                <el-popover trigger="hover" placement="top">
                    <div>http://d.qdjp.cn/{{ scope.row.Surl }}</div>
                    <div slot="reference" class="name-wrapper">
                        {{ scope.row.Surl }}
                    </div>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column prop="Lurl" label="Lurl"><!-- //原链接 -->
            <template scope="scope">
                <el-popover trigger="hover" placement="top" width="300">
                    <p style="width:100%;word-break:break-all;">{{ scope.row.Lurl }}</p>
                    <div slot="reference" class="name-wrapper">
                        原链接
                    </div>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column prop="Remark" label="备注"></el-table-column>
        <el-table-column label="操作">
            <template scope="scope">
                <el-button type="primary" size="small" @click="clickEditBtn(scope.$index,scope.row)">编辑</el-button>
                <DeleteButton api="dwzApi" @successCallBack="fetchData" :id="scope.row.ID"></DeleteButton>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog :title="dialogTitle" v-model="showDialog" size="tiny" @close="resetForm('form')">
      <el-form ref="form" :model="form">
        <el-form-item label="名称" prop="Title">
            <el-input placeholder="请输入名称" v-model="form.Title"></el-input>
        </el-form-item>
        <el-form-item label="短链接" prop="Surl">
            <el-input placeholder="请输入短链接" v-model="form.Surl"></el-input>
        </el-form-item>
        <el-form-item label="原链接" prop="Lurl">
            <el-input placeholder="请输入原链接" v-model="form.Lurl"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="Remark">
            <el-input type="textarea" v-model="form.Remark"></el-input>
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
import { dwzApi } from 'api'
export default{
    data(){
        return{
            dwzList:[],
            loading:false,
            showDialog:false,
            dialogTitle:'',
            form:{
                Title:'',
                Surl:'',
                Lurl:'',
                Remark:''
            },
            copyForm:{},
            filters:{
                Surl:''
            }
        }
    },
    created () {
      this.fetchData();  
    },
    methods: {
      carlineStationSearch(filters){
        const options = {
            query: {
                Surl: filters.Surl
            }
        }
        this.fetchData(options);
      },
      async fetchData(option) {
        const _self = this
        _self.loading = true
         try { 
          const res = await dwzApi.listByQuery(option);
          console.log(res)
          this.dwzList = res.data.Data;
          _self.loading = false
        } catch (e) {
          console.error(e)
          _self.loading = false
        } 
      },
      async clickAddBtn(){
        const _self = this
        _self.dialogTitle='添加短链接信息'
        _self.showDialog = true
        _self.form = {}
      },
      async clickEditBtn($index,row){
        const _self = this
        _self.dialogTitle='编辑短链接信息'
        try {
            _self.form.ID = row.ID
            _self.form.Title = row.Title
            _self.form.Surl = row.Surl
            _self.form.Lurl = row.Lurl
            _self.form.Remark = row.Remark
            _self.showDialog = true
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
            try {
                await dwzApi.add(_self.form)
                _self.fetchData()
                _self.showDialog = false
                _self.$message({
                    message: '保存成功',
                    type: 'success'
                })
            } catch (e) {
                console.error(e)
                _self.$message.error('添加失败!!!')
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
                    console.log(_self.form)
                    await dwzApi.edit(_self.form.ID,form)
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
      },
    }
}
</script>