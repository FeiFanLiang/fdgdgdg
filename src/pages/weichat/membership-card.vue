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
                            <el-button type="primary" size="small" @click="clickEditBtn(scope.$index, scope.row)">编辑</el-button>
                            <!--<el-button type="danger" size="mini" @click="clickDelBtn(scope.$index, scope.row)">删除</el-button>-->
                            <DeleteButton :id="scope.row.ID"></DeleteButton>
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
                    <el-popover ref="popover" placement="bottom" title="标签名称" width="200"  trigger="click" v-model="visible">
                        <el-row>
                            <el-col :span="24">
                                <el-input v-model="inputs" placeholder="请输入内容" @change="changes" style="width:80%;"></el-input>
                                <span style="font-size:16px;">{{count}}/6</span>
                            </el-col>
                        </el-row>
                        <el-row style="margin-top:10px;">
                            <el-col :span="12">
                                <el-button type="primary" size="small" style="width:80%;" :plain="true" @click="open">确定</el-button>
                            </el-col>
                            <el-col :span="12" style="text-align:right;">
                                <el-button size="small" style="width:80%;" @click="visible = false">取消</el-button>
                            </el-col>
                        </el-row>
                    </el-popover>
                    <el-button type="primary" icon="plus" v-popover:popover style="margin-top:10px;float:right;">新建标签</el-button>
                </div>
                <div class="div">
                  <el-row>
                      <el-col :span="21">
                          <div>
                                <div class="div1">
                                    <el-row :gutter="24">
                                        <el-col :span="19">全部用户</el-col>
                                    </el-row>
                                </div>
                                <div class="div2">
                                    <el-row :gutter="24">
                                        <el-col :span="6">
                                            <el-checkbox>全选</el-checkbox>
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <el-button type="primary" :disabled="true">打标签</el-button>
                                        </el-col>
                                        <el-col :span="5" class="text">当前状态
                                            <el-tooltip class="item" placement="bottom" effect="light">
                                                <div slot="content" class="content" style="width:150px;">
                                                    <p style="font-size:14px;margin:10px;">有效：会员卡状态为“有效”，且用户未删除已激活/领取的卡；</p>
                                                    <p style="font-size:14px;margin:10px;"> 无效：会员卡状态为“失效”，或用户删除了已激活/领取的卡；</p>
                                                    <p style="font-size:14px;margin:10px;">删除的会员卡可重新领取，会员信息及历史积分将自动恢复</p>
                                                </div>
                                                <i class="el-icon-information"></i>
                                            </el-tooltip>
                                        </el-col>
                                        <el-col :span="4" class="text">积分</el-col>
                                        <el-col :span="5" class="text">上次使用日期</el-col>
                                        <el-col :span="4" class="text">操作</el-col>
                                    </el-row>
                                </div>
                                <div class="div3">
                                    <el-row :gutter="24">
                                        <el-col :span="6">全部用户</el-col>
                                        <el-col :span="5">全部用户</el-col>
                                        <el-col :span="4">全部用户</el-col>
                                        <el-col :span="5">全部用户</el-col>
                                        <el-col :span="4">全部用户</el-col>
                                    </el-row>
                                </div>
                                <div class="div4">
                                    <el-row :gutter="24">
                                        <el-col :span="19">可对会员<a href="#" style="color:#20A0FF;">群发消息</a></el-col>
                                    </el-row>
                                </div>
                          </div>
                      </el-col>
                      <el-col :span="3">
                          <div class="div5">
                            <p>全部用户(0)</p>
                            <hr color="#F4F5F9">
                          </div>
                      </el-col>
                  </el-row>
                </div>
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
      tableData: [],
      input: '',
      inputs:'',
      count: 0,
      dateValue: '',
      visible:false,
    }
  },
  methods: {
    clickEditBtn() {},
    clickDelBtn() {},
    changes() {
        this.count = this.inputs.length;
    },
    open() {
        if(this.inputs.length>6){
          this.$message({
            message: '标签必须为1-6个字',
            type: 'warning'
          });
        }
    },
  }
}
</script>
<style lang="scss">
#membershipCard{
  .el-input {
    width: 30%;
  }
  .div{
      width:100%;
      margin-top:20px;
      border: 1px solid #E7E7EB;
  }
  .div1,.div2,.div3{
      border-bottom:1px solid #E7E7EB;
      border-right:1px solid #E7E7EB;
      padding:10px 0 0 20px;
  }
  .div2{
      height:45px;
      background-color: #F4F5F9;
  }
  .div3{
      min-height:150px;
  }
  .div1,.div4{
      height:35px;
      border-right:1px solid #E7E7EB;
      padding:10px 0 0 20px;
  }
  .div5{
      min-height:270px;
      p{
          font-size: 15px;
          padding:0 0 0 20px;
      }
  }
  .text{
      margin-top: 8px;
  }
}
</style>
