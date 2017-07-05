<template lang="html">
<div>
    <el-button type="primary" @click="addOneMenu">添加一级菜单</el-button>
    <DeleteButton api="weixinRedirectApi" @successCallBack="fetchData"></DeleteButton>
    <el-table :data="menuData" style="width: 100%">
        <el-table-column type="expand">
        <template scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
                <el-button type="primary" @click="addTwoMenu(props.$index)">添加二级菜单</el-button>
                <el-form-item>
                    <!--<span>{{ props.row.name }}</span>-->
                    <el-table :data="props.row.sub_button" >
                        <el-table-column prop="name" label="二级菜单名称" width="180px"></el-table-column>
                        <el-table-column prop="url" label="链接" width="600px"></el-table-column>
                        <el-table-column label="操作" width="180px">
                            <template scope="scope">
                                <el-button size="small" @click="editMenu2(scope.$index, props.$index,scope.row)">编辑</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
            </el-form>
        </template>
        </el-table-column>
        <el-table-column label="一级菜单名称" prop="name"></el-table-column>
        <el-table-column label="链接" prop="url"></el-table-column>
        <el-table-column label="操作">
            <template scope="scope">
                <el-button size="small" @click="editMenu(scope.$index, scope.row)">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-dialog title="编辑菜单/添加菜单" v-model="dialogVisible" @close="resetForm('form')">
        <el-form :rules="rules" ref="form" :model="form"  >
            <el-form-item label="菜单名称" prop="name">
                <el-input placeholder="请输入菜单名称" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="链接" prop="url">
                <el-input placeholder="请输入菜单链接" v-model="form.url" :disabled="disabled"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm">提交</el-button>
        </span>
    </el-dialog>
</div>
</template>
<script>
import {weixinRedirectApi} from 'api'
  export default {
    data() {
      var checkUrl = (rule, value, callback) => {
        let a= /^((http|ftp|https)?:\/\/)|((http|ftp|https)?:\/\/)+\w{1,}$/;
        if (!value) {
            return callback(new Error('链接不能为空'));
        }
        else if (!a.test(value)) {
            return callback(new Error('链接形式必须为http://'));
        }
        else{
            callback();
        }
      };
      return {
        dialogVisible: false,
        disabled:false,
        addORedit:'',
        form:{
          name:'',
          url:''
        },
        index:'',
        index2:'',
        rules: {
          name: [
            { required: true, message: '请输入菜单名称', trigger: 'blur' },
            { min: 1, max: 4, message: '长度在 1 到 4 个字符', trigger: 'blur' }
          ],
          url: [
              { validator: checkUrl, trigger: 'blur' }
          ]
        },
        menuData: []
      }
    },
    created () {
      this.fetchData();  
    },
    methods: {
        async fetchData(){
           const res = await weixinRedirectApi.list();
           this.menuData = res.data.menu.button;
        },
        async addOneMenu(){
            this.addORedit = 'addOne';
            const res = await weixinRedirectApi.list();
            if(res.data.menu.button.length<3){
                this.dialogVisible = true;
            }else{
                alert("一级菜单数量最多不超过3个!")
            }
        },
        async addTwoMenu($index){
            this.index = $index;
            this.addORedit = 'addTwo';
            const res = await weixinRedirectApi.list();
            if(res.data.menu.button[$index].sub_button==undefined || res.data.menu.button[$index].sub_button.length<5){
                this.dialogVisible = true;
            }else{
                alert("二级菜单数量最多不超过5个!")
            }
        },
        editMenu($index, row) {
            const _self = this
            _self.dialogVisible = true
            _self.form.name = row.name
            this.index = $index;
            this.disabled = true;
            this.addORedit = 'editOne';
        },
        editMenu2($index, $index2,row){
            const _self = this
            _self.dialogVisible = true
            _self.form.name = row.name
            _self.form.url = row.url
            this.index = $index;
            this.index2 = $index2;
            this.disabled = false;
            this.addORedit = 'editTwo';
        },
        async submitForm() {
            if (this.addORedit == 'addOne' || this.addORedit == 'addTwo') {
                this.addSave()
            }else{
                this.editSave()
            }
        },
        async addSave() {
            const _self = this
            
            if(this.addORedit == 'addOne'){
                _self.$refs['form'].validate(async valid => {
                    if (valid) {
                        try {
                            const res = await weixinRedirectApi.list();
                            res.data.menu.button.push({
                                "type": "view",
                                "name": this.form.name,
                                "url": this.form.url
                            });
                            let newData ={
                                "menu":{
                                    "button":res.data.menu.button
                                }
                            }
                            console.log(newData)
                                await weixinRedirectApi.add(newData)
                                this.dialogVisible = false;
                                this.form = {};
                                this.fetchData();
                        } catch (e) {
                            console.error(e)
                            _self.$message.error('添加失败!!!')
                        } 
                    }
                })
            }
            if(this.addORedit == 'addTwo'){
                console.log(this.addORedit)
                _self.$refs['form'].validate(async valid => {
                    if (valid) {
                        try {
                            const res = await weixinRedirectApi.list();
                            res.data.menu.button[this.index].url = ''
                            if(res.data.menu.button[this.index].sub_button==undefined){
                                res.data.menu.button[this.index].sub_button = []
                            }
                            res.data.menu.button[this.index].sub_button.push({
                                "type": "view",
                                "name": this.form.name,
                                "url": this.form.url
                            });
                            let newData = {
                                "menu":{
                                    "button":res.data.menu.button
                                }
                            }
                            await weixinRedirectApi.add(newData);
                            this.form = {};
                            this.dialogVisible = false;
                            this.fetchData();
                        } catch (e) {
                            console.error(e)
                            _self.$message.error('添加失败!!!')
                        } 
                    }
                }) 
            }else {
                    return false
                }
        },
        async editSave(){
            if(this.addORedit=='editOne'){this.rules.url=[];}
            this.$refs['form'].validate(async valid => {
                if (valid) {
                    if(this.addORedit=='editOne'){
                        this.rules.url=[];
                        try {
                            const res = await weixinRedirectApi.list();
                                res.data.menu.button[this.index].name=this.form.name;
                            let newData = {
                                    "menu":{
                                        "button":res.data.menu.button
                                    }
                                }
                            await weixinRedirectApi.add(newData)
                            this.dialogVisible = false;
                            this.form = {};
                            this.fetchData();
                        } catch (e) {
                            console.error(e)
                            _self.$message.error('编辑失败!!!')
                        } 
                    }                  
                    if(this.addORedit=='editTwo'){
                        console.log(this.index2)
                        try {
                            const res = await weixinRedirectApi.list();
                            res.data.menu.button[this.index2].sub_button[this.index].name=this.form.name;
                            res.data.menu.button[this.index2].sub_button[this.index].url=this.form.url;
                            let newData = {
                                "menu":{
                                    "button":res.data.menu.button
                                }
                            }
                            await weixinRedirectApi.add(newData);
                            this.form = {};
                            this.dialogVisible = false;
                            this.fetchData();
                        } catch (e) {
                            console.error(e)
                            _self.$message.error('编辑失败!!!')
                        } 
                    }
                }
            })
        }
    }
  }
</script>

