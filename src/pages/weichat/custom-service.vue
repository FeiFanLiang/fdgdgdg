<template lang="html">
<div id="custom-service">
  <el-row :gutter="22">
    <el-col :span="3" class="left" style="padding:0;padding-bottom:100px;">
      <el-button type="primary" @click="allMessage" class="all">全部消息</el-button>
      <div v-if="showDetail" class="timeList">
        <el-button type="text" @click="today">今天</el-button><br>
        <el-button type="text">昨天</el-button><br>
        <el-button type="text">前天</el-button><br>
        <el-button type="text">最近5天</el-button>
      </div>
    </el-col>
    <el-col :span="21">
      <el-row>
        <el-col :span="16"><span class="span1">全部消息</span><span class="span2">(只保存最近5天的消息)</span></el-col>
        <el-col :span="8">
          <el-input v-model="input" placeholder="请输入搜索内容" style="width:80%"></el-input>
          <el-button color="gray">搜索</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="20">
          <el-pagination small layout="prev, pager, next" :total="50"></el-pagination>
        </el-col>     
      </el-row>
      <el-table stripe style="width: 100%" :data="tableData">
        <el-table-column type="expand">
          <template scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-tabs type="border-card">
                <el-tab-pane label="文字">
                  <el-card class="box-card">
                    <div slot="header" class="clearfix">
                      <img src="../../assets/images/common/hh.png" width="30px" height="30px"/>
                      <span style="float: right;">还可输入200个字</span>
                    </div>
                    <div>
                      <el-input
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="请输入内容"
                        v-model="textarea3">
                      </el-input>
                    </div>
                    <br>
                    <div>
                      <el-button>保存</el-button>
                      <el-button>删除</el-button>
                    </div>
                  </el-card>
                </el-tab-pane>
                <el-tab-pane label="图片">图片</el-tab-pane>
                <el-tab-pane label="语音">语音</el-tab-pane>
                <el-tab-pane label="视频">视频</el-tab-pane>
              </el-tabs>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="消息">
          <template scope="scope">
            <el-row style="margin-top:10px;">
              <el-col :span="4">
                <img src="../../assets/images/img/dog.jpg" width="50px" height="50px"/>
              </el-col>
              <el-col :span="12">
                <p>昵称</p>
                <p>消息</p>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="时间"></el-table-column>
        
      </el-table>
    </el-col>
  </el-row>
</div>
</template>

<script>
  export default {
    data() {
      return {
        showDetail:true,
        input:'',
        a:false,
        tableData: [{
          time: '2016-05-02',
        }, {
          time: '2016-05-02',
        },{
          time: '2016-05-02',
        }]
      };
    },
    created(){
      
    },
    methods: {
      allMessage(){
        this.showDetail = !this.showDetail;
      },
      today(){
        alert('today');
      },
    }
  }
</script>

<style lang="scss">
#custom-service{
  .el-menu-vertical{
    height:100%;
  }
  .left{
    background-color:#EEF1F6;    
  }
  .all{
    width:100%;
  }
  .span1{
    font-size:18px;
  }
  .span2{
    font-size:15px;
    color:lightgrey;
  }
  .timeList{
    text-align:center;
  }
}
</style>