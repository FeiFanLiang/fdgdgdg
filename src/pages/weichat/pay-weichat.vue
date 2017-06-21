<template lang="html">
<div id="PayWeichat">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span class="title">公众号支付</span>
        </div>
        <div class="content item">
            <el-row :gutter="20">
                <el-col :span="3">支付授权目录</el-col>
                <el-col :span="9"><div>http://0460.souxw.com/newtravel/payment/index/confirm/</div></el-col>
                <el-col :span="8"><el-button type="text" style="padding:0;margin:0;" @click="dialogVisible = true">修改</el-button></el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="17" :offset="3">http://m.qdjp.cn/order/</el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="17" :offset="3">http://m.qdjp.cn/order/#/car/</el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="17" :offset="3"> http://m.qdjp.cn/pay/wxpay/</el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="17" :offset="3">http://www.chinabtob.net/wxpay00/</el-col>
            </el-row>        
        </div>
    </el-card>
    <el-dialog title="支付授权目录" v-model="dialogVisible" size="small" @close="cancel"> 
      <div>
          请添加支付目录
      </div>
      <div style="margin-top: 15px;">
        <el-input v-model="payInput">
            <el-select v-model="paySelect" slot="prepend" placeholder="http://">
              <el-option label="http://" value="1"></el-option>
              <el-option label="https://" value="2"></el-option>
            </el-select>
            <el-button slot="append" @click="addPayList">添加</el-button>
        </el-input>
        <div style="margin-top:10px;">
            http://0460.souxw.com/newtravel/payment/index/confirm/  &nbsp;&nbsp;&nbsp;
            <el-button type="text" style="padding:0;margin:0;">删除</el-button><br>
            http://m.qdjp.cn/order/  &nbsp;&nbsp;&nbsp;
            <el-button type="text" style="padding:0;margin:0;">删除</el-button><br>
        </div>
        <div class="text">
            1、所有使用公众号支付方式发起支付请求的链接地址，都必须在支付授权目录之下；<br>
            2、最多设置5个支付授权目录，且域名必须通过ICP备案；<br>
            3、头部要包含http或https，须细化到二级或三级目录，以左斜杠“/”结尾。<br>
        </div>
        <div style="color:red;margin-top:10px;">
            <span v-if="showNull">请输入目录</span>
            <span v-if="showUrl">url必须以/结尾</span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span class="title">扫码支付</span>
        </div>
        <div class="content item">
            <el-row :gutter="20">
                <el-col :span="3">支付回调URL</el-col>
                <el-col :span="10"><div>http://weixinredirect.qdjp.cn/WeixinRedirect/Pay/ResultNotify</div></el-col>
                <el-col :span="7"><el-button type="text" style="padding:0;margin:0;" @click="dialogVisible2 = true">修改</el-button></el-col>
            </el-row>
            <!--<el-row :gutter="20">
                <el-col :span="17" :offset="3">http://m.qdjp.cn/order/</el-col>
            </el-row>--> 
        </div>
        <div class="content text">
            注： 此URL仅适用于扫码支付模式一，详见<a href="#">扫码支付开发文档</a>
        </div>
    </el-card>
    <el-dialog title="支付回调URL" v-model="dialogVisible2" size="small">
      <div>
          请输入支付回调URL
      </div>
      <div style="margin-top: 15px;">
        <el-input v-model="urlInput">
        </el-input>
        <div class="text">
            头部要包括http或https，当公众平台接到扫码支付请求时，会回调此URL传递订单信息
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span class="title">刷卡支付</span>
        </div>
        <div class="content item">
            <el-row :gutter="20">
                <el-col :span="3">接口状态</el-col>
                <el-col :span="9"><span style="color:green;">已获得</span></el-col>
            </el-row>
        </div>
        <div class="content text">
            注： 刷卡支付接口能力已获得，详见<a href="#">刷卡支付开发文档</a>
        </div>
    </el-card>
</div>
</template>
<script>
export default{
  data() {
      return {
        dialogVisible:false,
        dialogVisible2:false,
        payInput: '',
        paySelect: '',
        showNull:false,
        showUrl:false,
        urlInput: 'http://weixinredirect.qdjp.cn/WeixinRedirect/Pay/ResultNotify'
      }
  },
  methods: {
      cancel() {
        this.payInput = ''
        this.showUrl = false;
        this.showNull = false;
      },
      addPayList() {
        if(this.payInput == ''){
            this.showNull = true;
            this.showUrl = false;
        }else if(!this.payInput.match(/^.*\/$/)){
            this.showUrl = true;
            this.showNull = false;
        }else{
            this.showUrl = false;
            this.showNull = false;
        }
      }
  }
}
</script>
<style lang="scss">
#PayWeichat{
  .item {
    padding: 18px 0;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }

  .box-card {
    width: 90%;
  }

  .el-select .el-input {
    width: 110px;
  }

  a{
      color:#64BFFF;
  }

  .title{
      line-height: 36px;
      color:#64BFFF;
      font-size: 18px;
  }

  .content{
      margin: 20px;
  }

  .text{
      color:lightgrey;
      margin-top:10px;
  }
}
</style>