<template>
<div id="membershipCard">
    <el-tabs type="border-card">
        <el-tab-pane label="会员卡管理">
            <div>
                <el-button type="primary" icon="plus" style="margin-top:10px;">新建会员卡</el-button>
                <el-table :data="tableData" style="width: 100%;min-height:200px;margin-top:10px;">
                    <el-table-column prop="date" label="会员卡" width="500"></el-table-column>
                    <el-table-column prop="date" label="来源" ></el-table-column>
                    <el-table-column prop="date" label="状态" ></el-table-column>
                    <el-table-column label="操作" width="150">
                        <template scope="scope">
                            <el-button type="primary" size="mini" @click="clickEditBtn(scope.$index, scope.row)">编辑</el-button>
                            <el-button type="danger" size="mini" @click="clickDelBtn(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-tab-pane>
        <el-tab-pane label="会员管理">
            <div>
                <div style="margin-top: 15px;">
                    <el-input placeholder="可通过姓名，手机号，会员卡号搜索" v-model="input">
                        <el-button slot="append" icon="search"></el-button>
                    </el-input>
                </div>
                <hr color="#EEF1F6">
                <div class="block">
                    <p style="margin:10px 0 10px 0;">按最近使用时间查看会员</p>
                    <el-date-picker v-model="dateValue" type="daterange" placeholder="选择日期范围"></el-date-picker>
                    <el-button type="primary" icon="plus" style="margin-top:10px;float:right;">新建标签</el-button>
                </div>
                <!--<div style="margin-top:20px;">
                    <div style="border:1px solid red;width:80%;">
                        <el-row :gutter="24">
                            <el-col :span="19">全部用户</el-col>
                        </el-row>
                    </div>
                    <div style="border:1px solid red;width:20%;float:right;">
                        <p>全部用户(0)</p>
                    </div>
                </div>-->
            </div>
        </el-tab-pane>
    </el-tabs>
</div>  
</template>
<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        tableData:[],
        input:'',
        dateValue:''
      };
    },
    methods: {
      clickEditBtn(){

      },
      clickDelBtn(){

      }
    }
  }
</script>
<style>
 .el-input {
    width: 30%;
  }
</style>