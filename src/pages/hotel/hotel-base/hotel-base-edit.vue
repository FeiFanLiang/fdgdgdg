<template lang="html">
<div id="hotelbaseEdit">
  <HotelTopMenu path="">
  </HotelTopMenu>
  <el-form ref="form" :model="form" label-position="top" style="margin-top:25px">
    <el-row :gutter="20">
      <el-col :span="6">
          <el-form-item label="酒店ID" >
            <el-input v-model="form.id" :disabled='true'></el-input>
          </el-form-item>
      </el-col>
      <el-col :span="6">
          <el-form-item label="酒店编号" >
            <el-input v-model="form.hotelNum"></el-input>
          </el-form-item>
      </el-col>
      <el-col :span="6">
          <el-form-item label="酒店名称" >
            <el-input v-model="form.hotelName"></el-input>
          </el-form-item>
      </el-col>
      <el-col :span="6">
          <el-form-item label="酒店英文名称" >
            <el-input v-model="form.hotelName_En"></el-input>
          </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
          <el-form-item label="前台电话" >
            <el-input v-model="form.frontPhone"></el-input>
          </el-form-item>
      </el-col>
      <el-col :span="6">
          <el-form-item label="传真号" >
            <el-input v-model="form.faxNum"></el-input>
          </el-form-item>
      </el-col>
      <el-col :span="6">
          <el-form-item label="区域" >
            <el-select
              v-model="form.areaId"
              clearable
              filterable
              remote
              placeholder="请选择酒店所在区域"
              :remote-method="remoteMethod"
              :loading="loading">
              <el-option
                v-for="(item,index) in areaOptions"
                :key="index"
                :label="item&&item.AreaName"
                :value="item&&item.ID">
              </el-option>
            </el-select>
          </el-form-item>
      </el-col>
      <el-col :span="6">
          <el-form-item label="地址" >
            <el-input v-model="form.address"></el-input>
          </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
          <el-form-item label="星级">
            <el-select v-model="form.star" clearable placeholder="请选择酒店星级">
              <el-option v-for="(item,index) in starOptions" :key="index" :label="item.StarName" :value="item.ID"></el-option>
            </el-select>
          </el-form-item>
      </el-col>
      <el-col :span="18">
          <el-form-item label="备注" >
            <el-input type="textarea" v-model="form.remark"></el-input>
          </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="18">
      <el-col :span="2" :offset="19">
        <el-form-item>
          <el-button @click="Cancel">取消</el-button>
        </el-form-item>
      </el-col>
      <el-col :span="3">
        <el-form-item>
          <el-button type="primary" @click="submit">保存</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <div class="line">

  </div>
</div>
</template>

<script>
import {
    hotelPayModeApi,
    hotelBaseApi,
    hotelStarApi,
    hotelAreaApi
} from 'api';
import {
    HotelTopMenu
} from 'components'
export default {
    components: {
        HotelTopMenu
    },
    data() {
        return {
            id: '',
            hotelName: '',
            form: {
                id: '',
                hotelNum: '',
                hotelName: '',
                hotelName_En: '',
                frontPhone: '',
                faxNum: '',
                areaId: '',
                address: '',
                star: '',
                remark: ''
            },
            loading: false,
            list: [],
            areaOptions: [],
            starOptions: [],
        };
    },
    mounted() {
        const _self = this;
        _self.id = _self.$route.params.ID;
        if (_self.id) {
            _self.getHotelbaseList();
            _self.getStarOptions();
        }
        _self.hotelName = _self.$route.query.name;
    },
    methods: {
        async remoteMethod(query) {
            const _self = this;
            if (query !== '') {
                _self.loading = true;
                const res = await hotelAreaApi.listByQue(query);
                _self.list = res.data;
                setTimeout(() => {
                    _self.loading = false;
                    _self.areaOptions = _self.list.splice(0, 20);
                }, 200);
            } else {
                _self.areaOptions = [];
            }
        },
        async getStarOptions() {
            const res = await hotelStarApi.list();
            if (res && res.data && Array.isArray(res.data)) {
                this.starOptions = res.data;
            }
        },
        async getHotelbaseList() {
            const _self = this;
            const res = await hotelBaseApi.detailsById(_self.id);
            if (res && res.data) {
                const data = res.data;
                _self.form.id = data.ID
                _self.form.hotelNum = data.HotelNum
                _self.form.hotelName = data.HotelName
                _self.form.hotelName_En = data.HotelName_En
                _self.form.frontPhone = data.FrontPhone
                _self.form.faxNum = data.FaxNum
                _self.form.areaId = data.AreaID
                _self.form.address = data.Address
                _self.form.star = data.Star
                _self.form.remark = data.Remark
            }
        },
        async submit() {
            try {
                await hotelBaseApi.edit(this.form.id, this.form);
                this.$message({
                    message: '保存成功',
                    type: 'success'
                });
            } catch (e) {}
        },
        Cancel() {
            this.$router.go(-1);
        }
    }
};
</script>

<style lang="scss" scoped>
.el-row {
    margin-bottom: 20px;
    &:last-child {
        margin-bottom: 0;
    }
}
.el-col {
    border-radius: 4px;
}
.row-bg {
    padding: 10px 0;
}
</style>
