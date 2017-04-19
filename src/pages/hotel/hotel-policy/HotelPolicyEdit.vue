<template lang='jade'>
div.mcontent
  div.title
    // button(@click="goback") 返回
  div.content
    div
      div.row
        div.col-xs-1
          div.form-group
            label id
            label.form-control {{model.ID}}
        div.col-xs-2
          div.form-group
            label HotelID
            label.form-control {{hotelID}}
        div.col-xs-3
          div.form-group
            label 政策负责人
            input.form-control(type="input", v-model='model.PersonName')
        div.col-xs-6
          div.form-group
            label 政策采购人
            input.form-control(type="input", v-model='model.PurchasingName')
      div.row
        div.col-xs-6
          div.form-group
            label 政策联系人
            input.form-control(type="input", v-model='model.LinkMan')
        div.col-xs-6
          div.form-group
            label 联系电话
            input.form-control(type="input", v-model='model.PhoneNum')
      div.row
        div.col-xs-6
          div.form-group
            label 保密类型
            multiselect(v-model='model.SecretType', :options="secrettypes", :searchable="false", track-by="id", label="SecretName", placeholder="保密类型...")
        div.col-xs-6
          div.form-group
            label 预订方式
            multiselect(v-model='model.ReserveMode', :options="reservemode", :searchable="false", track-by="id", label="ModeName", placeholder="预订方式...")
      div.row
        div.col-xs-6
          div.form-group
            label 打款账户
            multiselect(v-model='model.PayMode', :options="paymodes", :searchable="false", track-by="id", label="ModeName", placeholder="打款账户...")
        div.col-xs-6
          div.form-group
            label 付款公司
            multiselect(v-model='model.PayCompany', :options="paycompanys", :searchable="false", track-by="id", label="AccountName", placeholder="付款公司...")
      div.row
        div.col-xs-6
          div.form-group
            label 付款类型
            multiselect(v-model='model.PayType', :options="paytypes", :searchable="false", track-by="id", label="TypeName", placeholder="付款类型...")
      div.row
        div.col-xs-6
          div.form.group
            label 默认
            <input type="checkbox" v-model=model.IsDefault @click="visible = true"></input>
      div.row
        div.col-xs-12
          div.form.group
            label 退改规则备注
            input.form-control(type="input", v-model='model.Remark1')
      div.row
        div.col-xs-12
          div.form.group
            label 费用信息备注
            input.form-control(type="input",class="Height:60px" v-model='model.Remark2')
      div.row
        div.form-group.text-center
          button.btn-primary-lg(type="submit", class="btn btn-default", @click='SubmitModel') 提 交
          button.btn-primary-lg(type="button", class="btn btn-default", @click='Cancel') 取 消

</template>
<script>
// import Modal from 'components/common/Modal.vue'
import vSelect from 'vue-select'
import Multiselect from 'vue-multiselect'
// import Dialog from 'hsy-vue-dialog'
import {
  GetModel, SubmitModel, SaveModel
} from 'api/Hotel/HotelPolicy'
import { Getpaytype, GetPayModeList, Getsecrettypes, Getpaycompanys, Getreservemode } from 'api/Hotel/common'
export default {
  name: 'HotelPolicyEdit',
  props: {
    hotelID: Number,
    mode: String,
    policyid: Number
  },
  data () {
    return {
      model: {},
      paymodes: [],
      paycompanys: [],
      secrettypes: [],
      reservemode: [],
      paytypes: [],
      visible: false,
      id: -1
    }
  },
  components: {
    vSelect,
    Multiselect
  },
  created: async function () {
    // debugger
    if (this.policyid !== -1) {
      this.id = this.policyid
      this.getModel(this.policyid)
    }
    this.paymodes = await GetPayModeList()
    this.paycompanys = await Getpaycompanys()
    this.secrettypes = await Getsecrettypes()
    this.reservemode = await Getreservemode()
    this.paytypes = await Getpaytype()
  },
  methods: {
    checked: function () {
      console.log(this)
    },
    Getsecrettypes: async function () {
      const data = await Getsecrettypes()
      // debugger
      console.log(data)
    },
    GetPayModeList: async function () {
      // debugger
      const data = await GetPayModeList()
      console.log(data)
    },
    getModel: async function () {
      const data = await GetModel(this.id)
      // debugger
      this.model = data
    },
    SubmitModel: async function () {
      this.model.hotelID = this.hotelID
      if (this.mode === 'add') {
        const data = await SubmitModel(this.model)
        console.log(data)
      } else {
        const re = await SaveModel(this.model)
        console.log(re)
      }
      debugger
      // this.$dispatch('closeedit', this.msg)
      // this.$emit('hideEdit')
    },
    Cancel () {
      this.$emit('Cancel')
    },
    goback: function () {
      this.$router.go(-1)
    },
    handleYes: function () {
      // alert(yes);
    }
  }
}
</script>
<style>
.modal-scale-transition{
 transition: transform,opacity .3s ease;
}

.modal-scale-enter,
.modal-scale-leave {
 opacity: 0;
}

.modal-scale-enter {
 transform: scale(1.1);
}
.modal-scale-leave {
 transform: scale(0.8);
}
</style>
