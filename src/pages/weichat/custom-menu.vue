<template lang="html">
<div id="customMenu">
    <el-button type="primary" @click="addOneMenu">添加一级菜单</el-button>
    <DeleteButton api="weixinRedirectApi" @successCallBack="fetchData"></DeleteButton>
    <el-table :data="menuData" style="width: 100%">
        <el-table-column type="expand">
        <template scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
                <el-button type="primary" @click="addTwoMenu(props.$index)">添加二级菜单</el-button>
                <el-form-item>
                    <el-table :data="props.row.sub_button">
                        <el-table-column prop="name" label="二级菜单名称" width="180px"></el-table-column>
                        <el-table-column prop="url" label="链接" width="600px"></el-table-column>
                        <el-table-column label="操作" width="180px">
                            <template scope="scope">
                                <el-button size="mini" type="primary" @click="editMenu2(scope.$index, props.$index,scope.row)">编辑</el-button>
                                <el-button size="mini" type="danger" @click="deleteMenu2(scope.$index, props.$index,scope.row)">删除</el-button>
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
                <el-button size="mini" type="primary" @click="editMenu(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="deleteMenu(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-dialog :title="titles" v-model="dialogVisible" @close="resetForm('form')">
        <el-form :rules="rules" ref="form" :model="form"  >
            <el-form-item label="菜单名称" prop="name">
                <el-input placeholder="请输入菜单名称" v-model="form.name"></el-input>
            </el-form-item>
            <div>
                <el-form-item label="菜单内容">
                    <el-radio-group v-model="radio" @change="chowChose" :disabled='disabled2'>
                        <el-radio class="radio" v-model="radio" label="跳转网页">跳转网页</el-radio>
                        <el-radio class="radio" v-model="radio" label="发送消息">发送消息</el-radio>
                    </el-radio-group>
                </el-form-item>
            </div>
            <div v-if="showChose1">
                <el-form-item label="" prop="url">
                    <el-input placeholder="请输入菜单链接" v-model="form.url" :disabled="disabled"></el-input>
                </el-form-item>
            </div>
            <div v-if="showChose2" style="border:1px solid lightgrey;">
                <p style="padding:0px;margin:0px;">
                    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                        <el-menu-item index="1"><i class="el-icon-menu">图文消息</i></el-menu-item>
                        <el-menu-item index="2"><i class="el-icon-picture">图片</i></el-menu-item>
                        <el-menu-item index="3"><i class="el-icon-document">语音</i></el-menu-item>
                        <el-menu-item index="4"><i class="el-icon-document">视频</i></el-menu-item>
                    </el-menu>
                </p>
                <div style="border:1px solid lightgrey;height:220px;">
                    <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        <br>
                        <span class="el-upload__text">从素材库中选择</span>
                    </el-upload>
                    <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        <br>
                        <span class="el-upload__text">新建图文消息</span>
                    </el-upload>
                </div>
            </div>
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
        activeIndex: '1',
        imageUrl: '',
        radio:'跳转网页',
        showChose1:true,
        showChose2:false,
        del22:false,
        dialogVisible: false,
        disabled:false,
        disabled2:false,
        addORedit:'',
        form:{
          name:'',
          url:''
        },
        titles:'',
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
        chowChose(){
            if(this.radio=='跳转网页'){
                this.showChose1 = true;
                this.showChose2 = false;
            }
            if(this.radio=='发送消息'){
                this.showChose1 = false;
                this.showChose2 = true;
            }
        },
        async fetchData(){
           const res = await weixinRedirectApi.list();
           if(res.data==""){
               this.menuData=[];
           }else{
               this.menuData = res.data.menu.button;
           }  
        },
        async addOneMenu(){
            this.addORedit = 'addOne';
            this.titles = '一级菜单添加'
            const res = await weixinRedirectApi.list();
            if(res.data=='' || res.data.menu.button.length<3){
                this.dialogVisible = true;
            }else{
                alert("一级菜单数量最多不超过3个!")
            }
        },
        async addTwoMenu($index){
            this.index = $index;
            this.addORedit = 'addTwo';
            this.titles = '二级菜单添加'
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
            this.disabled2 = true;
            this.addORedit = 'editOne';
            this.titles = '一级菜单编辑'
        },
        editMenu2($index, $index2,row){
            const _self = this
            _self.dialogVisible = true
            _self.form.name = row.name
            _self.form.url = row.url
            this.index = $index;
            this.index2 = $index2;
            this.disabled = false;
            this.disabled2 = false;
            this.addORedit = 'editTwo';
            this.titles = '二级菜单编辑'
        },
        async deleteMenu($index,row){
            this.index = $index;
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.del(),
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        async del(){
            if(!this.del22){
                try {
                    const res = await weixinRedirectApi.list();
                    if(res.data.menu.button.length==1){
                        await weixinRedirectApi.del();
                    }else{
                        res.data.menu.button[this.index] = {};
                        let newData = {
                                "menu":{
                                    "button":res.data.menu.button
                                }
                            }
                        await weixinRedirectApi.add(newData)
                    }
                    this.fetchData();
                    this.visible=false;
                } catch (e) {
                    console.error(e);
                }             
            }else{
                this.del2();
            }
        },
        async deleteMenu2($index,$index2, row){
            this.deleteMenu();
            this.index2 = $index2;  
            this.index = $index;
            this.del22 = true;
        },
        async del2(){
           const res = await weixinRedirectApi.list();
           if(res.data.menu.button[this.index2].sub_button.length==1){
                 res.data.menu.button[this.index2] = {
                     "name":res.data.menu.button[this.index2].name,
                     "type":"view",
                     "url":"http://"
                 };
           }else{
                 res.data.menu.button[this.index2].sub_button[this.index]={};
           }
            let newData = {
                "menu":{
                    "button":res.data.menu.button
                }
            }
            await weixinRedirectApi.add(newData)
            this.fetchData();
            this.visible=false;
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
                            if(res.data==''){
                                let newData={
                                    "menu": {
                                        "button": [
                                            {
                                                "type": "view",
                                                "name": this.form.name,
                                                "url": this.form.url
                                            }
                                        ]
                                    }
                                }
                                await weixinRedirectApi.add(newData)
                            }else{
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
                                await weixinRedirectApi.add(newData)
                            }
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
        },
        handleSelect(key, keyPath) {
            console.log(key, keyPath)
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw)
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg'
            const isLt2M = file.size / 1024 / 1024 < 2
        },
    }
  }
</script>
<style lang="scss">
#customMenu {
    .el-menu--horizontal>.el-menu-item:hover {
        border-bottom: solid 0px white;
    }
    .el-menu--horizontal .el-menu-item:hover {
        background-color: white;
    }
    .el-menu {
        background-color: white;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 178px;
        height: 178px;
        margin: 20px;
        margin-left: 30px;
        float: left;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 18px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .el-upload__text {
        color: lightgrey;
        padding-top: 10px;
    }
}
</style>
