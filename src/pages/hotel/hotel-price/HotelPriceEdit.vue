<!--<template>
<div>
  <h1>酒店价格信息编辑</h1>
</div>
</template>-->
<template lang='jade'>
div.mcontent
  div.content
    div
      div.row
        div.col-xs-4
          div.form-group
            label ID
            input.form-control(type="input", v-model='model.ID',disabled)
        div.col-xs-4
          div.form-group
            label 酒店ID
            input.form-control(type="input", v-model='model.HotelID')
        div.col-xs-4
          div.form-group
            label 酒店名称
            input.form-control(type="input", v-model='model.HotelName')
      div.row
        div.col-xs-8
          div.form-group
            label 床型
            multiselect(v-model='selbeds', track-by="ID", label="BedName",
             placeholder="床型", :options="beds", :multiple="true",
             :hide-selected="true", :close-on-select="false", :searchable="false")
        div.col-xs-4
          div.form-group
            label 价格
            input.form-control(type="input", v-model='model.Price')
      div.row
        div.col-xs-12
          div.form-group
            label 备注
            textarea.form-control(v-model='model.Remark',rows='5',style='color:#FF0000')
      div.row
        div.col-xs-12
          div.form-group.text-center
            button.btn-primary-lg(type="button", class="btn btn-default", @click='SumitHotelPrice') 提 交
            &nbsp;&nbsp;
            button.btn-primary-lg(type="button", class="btn btn-default", @click='Cancel') 取 消
</template>
<script>
import Modal from 'components/common/Modal.vue';
import Multiselect from 'vue-multiselect';
import vSelect from 'vue-select';
import { GetModel, SaveModel, CreateModel } from 'api/Hotel/HotelPrice';
import { GetBedList } from 'api/Hotel/common';
export default {
  name: 'HotelPriceEdit',
  props: {
    hotelID: Number,
    mode: String,
    priceID: Number
  },
  data() {
    return {
      model: {
        id: 0,
        HotelID: '',
        HotelName: '',
        Price: 0,
        remark: ''
      },
      id: 0,
      beds: [],
      selbeds: []
    };
  },
  components: {
    Modal,
    Multiselect,
    vSelect
  },
  created: async function() {
    console.log('created:HotelBaseEdit');
    // debugger
    if (this.mode === 'edit' && this.priceID > 0) {
      this.Get(this.priceID);
    }
    this.beds = await GetBedList();
  },
  methods: {
    Get: async function(id) {
      // debugger
      const data = await GetModel(id);
      this.model = data;

      // debugger
    },
    Create: async function(obj) {
      await CreateModel(obj);
    },
    Save: async function(obj) {
      // debugger
      await SaveModel(obj);

      // const data = await SaveModel(obj)

      // this.model = data.data
    },
    SumitHotelPrice: async function() {
      const postobj = this.fomateObject(this.model);
      // debugger
      if (this.mode === 'add') {
        await this.Create(postobj);
      } else {
        await this.Save(postobj);
      }
      this.$emit('Sumit');
    },
    Cancel() {
      this.$emit('Cancel');
    },
    fomateObject: function(obj) {
      // 床型映射表，
      console.log('fomateObject');
      obj.hotelID = this.hotelID;
      if (this.selbeds && this.selbeds.length > 0) {
        obj.beds = [];
        for (var i of this.selbeds) {
          obj.beds.push({ id: i.id });
        }
      } else {
        obj.beds = null;
      }
      return obj;
    }
  }
};
</script>
