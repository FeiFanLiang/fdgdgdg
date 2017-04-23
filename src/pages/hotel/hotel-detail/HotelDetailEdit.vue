<!--<template>
<div>
  <h1>酒店展示信息编辑</h1>
</div>
</template>-->
<template lang="jade">
div.content
  div
    div.row
      div.col-xs-4
        div.form-group
          label ID
          input.form-control(type="input", v-model="model.ID", disabled)
      div.col-xs-4
        div.form-group
          label 内容2
          input.form-control(type="input", v-model="model.ID")
      div.col-xs-4
        div.form-group
          label 内容3
          input.form-control(type="input", v-model="model.ID")
    div.row
      div.col-xs-4
        div.form-group
          label 内容4
          input.form-control(type="input", v-model="model.ID", disable)
      div.col-xs-4
        div.form-group
          label 内容5
          multiselect(v-model="abc", :options="abc", :searchable="false", :multiple="multiple", track-by="ID", label="abc", placeholder="abc111")
          <!--input.form-control(type="input", v-model="model.ID")-->
    div.row
      div.col-xs-8
        label 备注
        textarea.form-control(rows='5',style='color:#FF0000', v-model="model.Remark")
    div.row
      div.col-xs-12
        div.form-group.text-center
          button.btn-primary-lg(type="button", class="btn btn-default", @click='SumitHotelDetail') 提 交
          &nbsp;&nbsp;
          button.btn-primary-lg(type="button", class="btn btn-default", @click='Cancel') 取 消
</template>
<script>
import Multiselect from 'vue-multiselect';
import vSelect from 'vue-select';
import { SaveModel, GetModel, CreateModel } from 'api/Hotel/HotelDetail';
export default {
  name: 'HotelDetailEdit',
  props: {
    detailID: Number,
    mode: String
  },
  data() {
    return {
      model: {
        ID: ''
      },
      abc: ['a']
    };
  },
  components: {
    Multiselect,
    vSelect
  },
  created: async function() {
    // debugger
    if (this.mode === 'edit' && this.detailID > 0) {
      this.Get(this.detailID);
    }
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
    },
    SumitHotelDetail: async function() {
      const postobj = this.fomateObject(this.model);
      // debugger
      if (this.mode === 'add') {
        await this.Create(postobj);
      } else {
        await this.Save(postobj);
      }
      this.$emit('Sumit');
    },
    Cancel: function() {
      // this.$router.go(-1)
      this.$emit('Cancel');
    }
  }
};
</script>
