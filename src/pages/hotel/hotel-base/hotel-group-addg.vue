<template lang="html">
<div id="HotelGrouPage">
<el-row :gutter="20">
  <h1 style="text-align:center">{{Groupname}}</h1>
  <h1>添加酒店</h1>
</el-row>
  <el-row :gutter="20">
        <el-col :span="3">
          <el-select v-model="filters2.labelVal" placeholder="请选择">
            <el-option v-for="(item,index) in selectedOptions" :label="item.label" :value="item.value" :key="index">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-input placeholder="请输入酒店名称" v-model="filters2.HotelName" v-show="filters2.labelVal == '1'"></el-input>
          <el-input placeholder="请输入酒店英文名称" v-model="filters2.HotelName_En" v-show="filters2.labelVal == '2'"></el-input>
          <el-input placeholder="请输入酒店ID" v-model="filters2.ID" v-show="filters2.labelVal == '3'"></el-input>
        </el-col>
        <el-col :span="4">
          <el-select v-model="filters2.country" placeholder="请选择国家">
            <el-option v-for="item in countryOptions" :key="item.AreaName" :label="item.AreaName" :value="item.AreaName"></el-option>
          </el-select>
      </el-col>
        <el-col :span="4">
          <el-input placeholder="请输入城市" v-model="filters2.city"></el-input>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" @click="hotelbaseSearch2(filters2)">搜索</el-button>
          <el-button type="primary" @click="addtogroup"> 添加</el-button>
          <el-button type="primary" @click="returns()">返回</el-button>          
        </el-col>
  </el-row>
        <div class="eltable">
          <el-table  :data="addlist" v-loading="loading2" element-loading-text="拼命加载中" @selection-change="handleSelectionChange2" border style="width: 100%">
            <el-table-column type="selection" width="55" :reserve-selection="false"></el-table-column>
            <el-table-column prop="HotelName" label="酒店名称" show-overflow-tooltip></el-table-column>      
            <el-table-column prop="HotelName_En" label="酒店英文名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="Address" label="地址" show-overflow-tooltip></el-table-column>
            <el-table-column prop="StarNum" label="星级" show-overflow-tooltip></el-table-column>
            <el-table-column prop="City" label="城市" show-overflow-tooltip></el-table-column>
          </el-table> 
        </div>
        <div class="pagination-wrapper" >
          <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30,50]" @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :current-page="currentPage2" :page-size="pageSize2" :total="count2">
          </el-pagination>
        </div>  
      </div>
</template>

<script>
import { hotelGroupApi,hotelAreaApi2,hotelBaseApi } from 'api'
export default {
  created() {
    const _self = this
    _self.form.id = _self.$route.params.ID 
    _self.ID = _self.$route.params.ID  
    _self.Groupname = _self.$route.query.GroupName                         
    _self.getHotelbaseall()
    _self.getCountryOptions() 
  },
  data() {
    return {
      dialogTableVisible: false,
      Groupname:"",
      ID:"",
      countryOptions: [],
      multipleSelection2:[],
      hotelbase: [],
      addlist:[],
      currentPage2: 1,      
      pageSize2: 10,      
      count2:0,
      loading2:false,
      filters2: {
        ID: '',
        HotelName: '',
        HotelName_En: '',
        FrontPhone: '',
        labelVal: '1',
        country: '',
        city: ''
      },
      form:{
        Remark: '',
        GroupName: '',
        id: ""
      },
      selectedOptions: [
         {
          value: '1',
          label: '酒店名称'
        },
        {
          value: '2',
          label: '酒店英文名称'
        },
        {
          value: '3',
          label: '酒店ID'
        }
      ],
      countryOptions: []
    }
  },

  methods: {
     async getCountryOptions() {
      const _self = this
      const res = await hotelAreaApi2.listByLevel('1')
      _self.countryOptions = res.data
    },
    returns(){
            this.$router.go(-1)
    },
    hotelbaseSearch2(){
       this.getHotelbaseall()
    },
    async getHotelbaseall(currentPage2, pageSize2) {
        const _self = this
        _self.loading2 = true
        _self.currentPage2 = currentPage2 || _self.currentPage2
        _self.pageSize2 = pageSize2 || _self.pageSize2
        const options = {
          pageIndex: _self.currentPage2,
          pageSize: _self.pageSize2,
          order: 'ID',
          query: {
            ID: _self.filters2.labelVal === '3' ? _self.filters2.ID : '',
            HotelName:
              _self.filters2.labelVal === '1' ? _self.filters2.HotelName : '',
            HotelName_En:
              _self.filters2.labelVal === '2' ? _self.filters2.HotelName_En : '',
            City: _self.filters2.city,
            Country: _self.filters2.country,
            IsDelete: false
            }
        }
        try {
          console.log(options)
            const res2 = await hotelBaseApi.addlist(_self.$route.params.ID,options)
            console.log(res2)
            let data2 = res2.data.Data
            _self.addlist = data2        
            _self.count2 = res2.data.Count
          _self.loading2 = false
        } catch (e) {
            console.log(e)
          _self.loading2 = false
        }     
      },
      handleSizeChange2(val) {
        this.pageSize2 = val
        this.getHotelbaseall(1, this.pageSize2)
      },
      handleSelectionChange2(val) {
        this.multipleSelection2 = val;  
       // console.log(this.multipleSelection2)       
      },
      handleCurrentChange2(val) {
        this.currentPage2 = val
        this.getHotelbaseall(this.currentPage2)
      },
    async addtogroup(){
        const _self = this;
      //  console.log(_self.$route.params.ID)
      try{
        let ids = []          
              for(let i in _self.multipleSelection2){
                  ids.push(_self.multipleSelection2[i].ID)
              }
          if(ids.length!=0){
           let strids = '['+ ids.toString() + ']'
            const res = await hotelGroupApi.addbase(_self.$route.params.ID,strids) 
            _self.getHotelbaseall()      
            _self.dialogTableVisible = false
            _self.getHotelbaseall()
            _self.$message({
                message: '添加成功',
                type: 'success'
            })  
                    
          }else{
              this.$message({
                  message: '请选择酒店',
                  type: 'warning'
              });
          }
      }catch(e){
              _self.$message.error('添加失败!!!')
          }

    }
    }
}
</script>

<style lang="scss">
#HotelGrouPage {
  .pagination-wrapper {
    text-align: center;
    padding: 30px;
  }
  .el-dialog{
    width:80%
  }
}
</style>
