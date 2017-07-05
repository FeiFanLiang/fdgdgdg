<template lang="html">
<div id="customMenu">
    <div style="width:250px;height:600px;border:solid 1px #A9A9A9;float:left;">
        <p style="background-color:#EAEAEA;margin:0;padding:10px;">
           <el-row>
               <el-col :span="21">菜单管理</el-col>
           </el-row>
        </p>
        <vue-tree :option="option"></vue-tree>
    </div>
    <div style="width:600px;height:600px;border:solid 1px #A9A9A9;float:left;">
        <p style="background-color:#EAEAEA;margin:0;padding:10px;">
           设置动作--子菜单
        </p>
        <div>
            <p style="padding:10px;">
                <el-row>
                    <el-col :span="4">子菜单名称</el-col>
                    <el-col :span="20"><el-input v-model="input" placeholder="请输入内容" style="width:50%"></el-input></el-col>
                </el-row>
                <el-row>
                    <el-col :offset="4" :span="20"><span style="color:lightgrey;">字数不超过8个汉字或16个字母</span></el-col>
                </el-row>
            </p>
            <p style="padding:10px;">
                <el-row>
                    <el-col :span="4">子菜单内容</el-col>
                    <el-col :span="20">
                        <el-radio-group v-model="radio">
                            <el-radio label="1">发送消息</el-radio>
                            <el-radio label="2">跳转网页</el-radio>
                            <el-radio label="3">跳转小程序</el-radio>
                        </el-radio-group>
                    </el-col>
                </el-row>
                <div style="border:solid 1px #A9A9A9;margin:10px;height:300px;">
                    <p style="padding:0px;margin:0px;">
                        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                            <el-menu-item index="1"><i class="el-icon-menu">图文消息</i></el-menu-item>
                            <el-menu-item index="2"><i class="el-icon-picture">图片</i></el-menu-item>
                            <el-menu-item index="3"><i class="el-icon-document">语音</i></el-menu-item>
                            <el-menu-item index="4"><i class="el-icon-document">视频</i></el-menu-item>
                        </el-menu>
                    </p>
                    <hr>
                    <div>
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
            </p>
            <el-button style="margin:10px;">保存</el-button>
        </div>
    </div>
</div>
</template>
<script>
import {weixinRedirectApi} from 'api'
let id = 1000
export default {
    data() {
        return {
            input: '',
            radio: '1',
            activeIndex: '1',
            imageUrl: '',
            //////////////////
            option: {
                root: {
                    name: '菜单栏',
                    isParent: true,
                    isOpen: true,
                    buttons: [{
                        title: 'Add',
                        icon: 'el-icon-plus',
                        click: this.addMainNode
                    },{
                        title: 'Delete',
                        icon: 'el-icon-delete',     
                        click: this.removeNode
                    }],
                    children: [],
                }
            },
            button:[]
      }
    },
    created() {
        this.fetchData();
    },
    methods: {
        async fetchData(){
            const res = await weixinRedirectApi.list();
            this.button = res.data.menu.button;
            for(let i=0;i<this.button.length;i++){
                    this.option.root.children.push(
                        {
                                name: this.button[i].name,
                                isParent: true,
                                isOpen: true,
                                children: [],
                                buttons: [
                                        {
                                            title: 'Add',
                                            icon: 'el-icon-plus',
                                            click: this.addMenuNode
                                        },
                                        {
                                            title: 'Edit',
                                            icon: 'el-icon-edit',
                                            click: this.editNode
                                        }
                                ]
                        }
                    );
                    if(this.button[i].sub_button){
                        for(let j=0;j<this.button[i].sub_button.length;j++){
                            this.option.root.children[i].children.push(
                                {
                                    name: this.button[i].sub_button[j].name,
                                    isParent: true,
                                    children:[],
                                    buttons: [
                                        {
                                            title: 'Edit',
                                            icon: 'el-icon-edit',
                                            click: this.editNode
                                        }
                                    ]
                                }
                            )
                        }
                    }
            }
            console.log(this.option.root.children)
            console.log(this.button[0].name)
        },
        handleNodeClick(data) {
            console.log(data)
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

        ///////////////////////////////////////////////////////

        async addMenuNode (node) {
                "use strict";
                node.isOpen = true;
                node.children.push({
                    name: '二级名称',
                    parent: node,
                    isParent: true,
                    children:[],
                    buttons: [
                        {
                            title:'Edit',
                            icon:'el-icon-edit',
                            click: this.editNode
                        }
                    ]
                });
                const res2 = await weixinRedirectApi.list();
                console.log(res2.data)
                console.log("1111111")
                console.log(node)
                //let a = res2.data.menu.button[res2.data.menu.button.length-1]
                /*={
                    "sub_button":[],
                     "name":node.children[node.children.length-1].parent.name,
                };*/
                this.sub_button.push(
                     {"url":"https://weidian.com/s/173363319?wfr=wechatpo_welcome_shop","type":"view","name":node.children[node.children.length-1].name}
                )
                //res2.data.menu.button.push(a);
                console.log(res2.data)
                let newData = {
                    "menu":{
                        "button":res2.data.menu.button
                        }
                }
                console.log(JSON.stringify(newData))
                await weixinRedirectApi.add(newData)
        },
        async addMainNode (node) {
                "use strict";
                node.isOpen = true;
                console.log(node.children);
                if(node.children.length<3){
                   node.children.push({
                        name: '一级名称',
                        parent: node,
                        isParent: true,
                        children: [],
                        buttons: [
                            {
                                title: 'Add',
                                icon: 'el-icon-plus',
                                click: this.addMenuNode
                            },{
                                title:'Edit',
                                icon:'el-icon-edit',
                                click: this.editNode
                            }
                        ]
                    });
                    const res = await weixinRedirectApi.list();
                    res.data.menu.button.push({
                        "type":"view",
                        "name":node.children[node.children.length-1].name,
                        "url":"http://m.qdjp.cn/member/membernav.aspx",
                        "sub_button":[],
                    });
                    let newData = {
                        "menu":{
                            "button":res.data.menu.button
                         }
                    }
                    await weixinRedirectApi.add(newData)
            }
        },
        addNode(){
            console.log("aaaaaa")
        },
        async editNode (node) {
            console.log(node.children.length)
            if(node.children.length>0){
                node.name = prompt('Editing node name, require string', node.name) || node.name;
                console.log(node)
                const res = await weixinRedirectApi.list();
                console.log(res.data)
            }
            if(node.children.length==0){
                this.input = node.name;
                console.log("111111111111111111")
            }
        },
        async removeNode (node) {
            //node.parent.children.splice(node.parent.children.indexOf(node), 1);
            await weixinRedirectApi.del();
        }

        //////////////////////////////////////////////////////////////////////////
        
  },
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
        height: 178px;
        margin: 20px;
        margin-left: 50px;
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


