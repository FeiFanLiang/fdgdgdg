<template>
  <div class="components-container">
    <div>
      <tinymce :height="320" :width="756" v-model="content"></tinymce>
    </div>
    <div id="print" class="editor-content" v-html="content" style="width:756px;hight:1086px;border:lightgrey solid 1px;"></div>
    <el-button @click="printpage()" style="margin:10px 0">打印</el-button>
    <el-button @click="save()" style="margin:10px 0" :loading="!isEditable">{{isEditable?'保存信息':'提交中'}}</el-button>
  </div>
</template>

<script>
import Tinymce from 'components/Tinymce'
import {hotelOrderDetailApi} from 'api'
export default {
  components: { Tinymce },
  data() {
    return {
      ID: '',
      content: '',
      datas:{},
      stringWX:'',
      stringQRH:'',
      Passenger : '',
      StayDateStart : '',
      StayDateEnd : '',
      Room : '',
      RoomNum : '',
      NightNum : '',
      HotelName : '',
      isEditable:true,
    }
  },
  // watch:{
  //   content(val){
  //     console.log(1111111111111)
  //     console.log(val)
  //   }
  // },
  created() {
    const _self = this
    _self.ID = _self.$route.params.ID
    console.log(_self.ID)
    _self.getData()
  },
  methods:{
    setContent(){
      const _self = this
      _self.stringWX = `<div style="font-size: 18px;"><p>青岛惠和旅行社<br />入住人：`+_self.Passenger+`<br />入离日期：`+_self.StayDateStart+`至`+_self.StayDateEnd+`<br />预订房型：`+_self.Room+`&nbsp; &nbsp;`+_self.RoomNum+`间`+_self.NightNum+`晚<br />早餐类型：含x早<br />房价：xx </p></div>`
      _self.stringQRH = `<div style="font-size: 18px;">
        <p style="text-align: center; font-size: 29px;">青岛澳迅航空订房确认函</p>
        <p style="text-align: left;">&nbsp; &nbsp; &nbsp; From:&nbsp;青岛澳迅航空</p>
        <p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;TO: <span style="font-size: 16px;">`+_self.HotelName+`</span>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;FAX:&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;TEL:</p>
        <p style="text-align: left;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 您好！&nbsp;</p>
        <p style="text-align: left;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;以下是我司客户订房消息，请查收！</p>
        <p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 顺祝商祺！</p>
        <p>确认信息：</p>
        <table style="border: 1px solid black; border-collapse: collapse; width: 756;">
        <tbody>
        <tr>
        <td style="border: solid black 1px;" colspan="2" width="756">
        <p>客人姓名：&nbsp;`+_self.Passenger+`</p>
        <p>&nbsp;</p>
        </td>
        </tr>
        <tr>
        <td style="border: solid black 1px;" width="305">
        <p>入住日期：<span style="font-size: 12px;">`+_self.StayDateStart+`</span></p>
        </td>
        <td style="border: solid black 1px;" width="318">
        <p>退房日期：<span style="font-size: 12px;">`+_self.StayDateEnd+`</span></p>
        </td>
        </tr>
        <tr>
        <td style="border: solid black 1px;" width="305">
        <p>房型名称：<span style="font-size: 14px;">`+_self.Room+`</span></p>
        </td>
        <td style="border: solid black 1px;" width="318">
        <p>间夜数：&nbsp;&nbsp;`+_self.NightNum+` 间`+_self.NightNum+`夜&nbsp;</p>
        </td>
        </tr>
        <tr>
        <td style="border: solid black 1px;" colspan="2" width="623">
        <p>房价：</p>
        </td>
        </tr>
        </tbody>
        </table>
        <p><br />&nbsp; &nbsp; &nbsp; 付费方式：网上转账&nbsp;</p>
        <p>&nbsp; &nbsp; &nbsp; 签发部门：青岛澳迅机票部&nbsp; &nbsp; &nbsp;联系电话：15698161689</p>
        <p>&nbsp; &nbsp; &nbsp; 传&nbsp;&nbsp;&nbsp;&nbsp;真：0532-58715050转801&nbsp; &nbsp; &nbsp;联&nbsp;系&nbsp;人：孙</p>
        <p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;签发日期：2017年&nbsp;6月25日</p>
        <p>&nbsp; &nbsp; &nbsp; 如无异议，请于2017年6月25日1200时前确认回执。谢谢！</p>
        <p>&nbsp;</p>
        </div>`;
    },
    printpage(){
      document.body.innerHTML=document.getElementById('print').innerHTML; 
      window.print(); 
    },
    async getData(){
      const _self = this
      const res = await hotelOrderDetailApi.getDetail(_self.ID)
      _self.datas = res.data.Data
      console.log(_self.datas)
      let detail = _self.datas.detail
      if(_self.datas.policy.ReserveModeID == 1 || _self.datas.policy.ReserveModeID == 2){
        _self.Passenger = detail.Passenger
        _self.StayDateStart = detail.StayDateStart ? detail.StayDateStart.substring(0,10) : ''
        _self.StayDateEnd = detail.StayDateEnd ? detail.StayDateEnd.substring(0,10) : ''
        _self.Room = detail.Room
        _self.RoomNum = detail.RoomNum
        _self.NightNum = detail.NightNum
        _self.setContent()
        _self.content = _self.stringWX
      }
      if(_self.datas.policy.ReserveModeID == 3 || _self.datas.policy.ReserveModeID == 4){
        _self.HotelName = detail.HotelName
        _self.Passenger = detail.Passenger
        _self.StayDateStart = detail.StayDateStart ? detail.StayDateStart.substring(0,10) : ''
        _self.StayDateEnd = detail.StayDateEnd ? detail.StayDateEnd.substring(0,10) : ''
        _self.Room = detail.Room
        _self.RoomNum = detail.RoomNum
        _self.NightNum = detail.NightNum
        _self.setContent()
        _self.content = _self.stringQRH
      }
    },
    async save(){
      const _self = this
      _self.isEditable = false
      let params = {
        id:_self.datas.detail.ID,
        HotelBookingNote:_self.content
      }
      console.log(params)
      try{
        const res = await hotelOrderDetailApi.saveDetail(params)
        _self.$message({
          message: '保存成功',
          type: 'success'
        })
      }catch(e){
        _self.$message.error('保存失败!!!')
      }finally{
        _self.isEditable = true
      }
    },
  }
}
</script>

<style scoped>
.editor-content{
  margin-top: 20px;
}
</style>


