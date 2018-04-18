<template lang="html">
<div id="Wxyh">
<el-row :gutter="20">
  <h1 style="text-align:center">酒店日志</h1>
  <el-button type="primary" @click="returns()">返回</el-button>
</el-row>
    <el-form label-width="70px">
    <el-row :gutter="20">
        <el-col :span="6">
            <el-form-item label="时间范围">
                <el-date-picker  v-model="filters.StartDate"  type="daterange"  @change="uphlog"></el-date-picker>
            </el-form-item>
        </el-col> 
        <el-col :span="6">
        <el-form-item label="采购渠道" prop="WaiCaiPlatID" style="margin-bottom:30px">
              <el-select v-model="filters.WaiCaiPlatID" clearable @change="uphlog">
                <el-option v-for="item in PlatPolicyIDs" :key="item.value" :label="item.PlatName" :value="item.ID"></el-option>
              </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="6">
        <el-form-item label="渠道" prop="PlatformID" style="margin-bottom:30px">
              <el-select v-model="filters.PlatformID" clearable  @change="updata" >
                <el-option v-for="item in PlatPolicyIDs" :key="item.value" :label="item.PlatName" :value="item.ID"></el-option>
              </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="6">
        <el-form-item label="基础信息渠道" prop="PlatformID" style="margin-bottom:30px">
              <el-select v-model="filters.PlatformID1" clearable  @change="updata" >
                <el-option v-for="item in PlatPolicyIDs" :key="item.value" :label="item.PlatName" :value="item.ID"></el-option>
              </el-select>
        </el-form-item>
        </el-col>
    </el-row>
    </el-form>    
    <!--  <el-table :data="dwzList" border style="width: 100%" row-key="ID" v-loading="loading" @expand="handleExpand" :expand-row-keys="expandRowKeys" >
        <el-table-column type="expand"> 
            <template scope="props" >
                <p><span>子房型名称</span>{{RoomName.SonRoomName}}</p>            
                  <template scope="props">
                  <el-collapse accordion style="border-right: none;" @change="">
                  <el-collapse-item title="抓取价格日志">
                    <el-table :data="grabLog" border style="width: 100%" v-loading="loading">
                        <el-table-column label="日期" prop="RoomName"></el-table-column>
                        <el-table-column label="抓取时间" prop="RoomName"></el-table-column>
                        <el-table-column label="底价" prop="RoomName"></el-table-column>   
                        <el-table-column label="房量" prop="RoomName"></el-table-column>   
                    </el-table>
                  </el-collapse-item>
                  </el-collapse>
                  <el-collapse accordion style="border-right: none;" @change="">
                  <el-collapse-item title="上传价格日志">
                    <el-table :data="upLog" border style="width: 100%" v-loading="loading">
                        <el-table-column label="渠道" prop="RoomName"></el-table-column>
                        <el-table-column label="上传时间" prop="RoomName"></el-table-column>
                        <el-table-column label="价格" prop="RoomName"></el-table-column>     
                    </el-table>
                  </el-collapse-item>
                  </el-collapse>
                  <el-collapse accordion style="border-right: none;" @change="">
                  <el-collapse-item title="上传房态日志">
                    <el-table :data="upState" border style="width: 100%" v-loading="loading">
                        <el-table-column label="渠道" prop="RoomName"></el-table-column>
                        <el-table-column label="上传时间" prop="RoomName"></el-table-column>
                        <el-table-column label="房态" prop="RoomName"></el-table-column>     
                    </el-table>
                  </el-collapse-item>
                  </el-collapse>
                  <el-collapse accordion style="border-right: none;" @change="">
                  <el-collapse-item title="写入价格日志">
                    <el-table :data="writeLog" border style="width: 100%" v-loading="loading">
                        <el-table-column label="渠道" prop="RoomName"></el-table-column>
                        <el-table-column label="写入时间" prop="RoomName"></el-table-column>
                        <el-table-column label="价格" prop="RoomName"></el-table-column>   
                        <el-table-column label="房态" prop="RoomName"></el-table-column>   
                    </el-table>
                  </el-collapse-item>
                  </el-collapse>                         
                </template>   
            </template>                             
        </el-table-column> 
          <el-table-column label="物理房型" prop="RoomName"></el-table-column>   
    </el-table> -->
  <el-row  v-loading="loading" element-loading-text="拼命加载中" style="height:100px">
    <el-collapse accordion style="border-right: none;" @change="hotelDetail(activeName)" v-model="activeName">
            <el-collapse-item :key="item.id" v-for="(item,index) in dwzList" style="border-right: none;" :name="item.ID">
              <template slot="title">
                   <span>{{item.RoomName}}</span>
                </template>
                <el-collapse accordion style="border: none;" @change="hotelDetail2(activeName1)" v-model="activeName1" v-loading="loading1" element-loading-text="拼命加载中">
                    <el-collapse-item :key="item.id" v-for="(item,index) in sons" style="border-right: none;" :name="item.SonRoomID">
                      <template slot="title">
                            <span>{{item.PlatSaleRoomName}}&nbsp;&nbsp;&nbsp;({{item.SonRoomID}})&nbsp;&nbsp;&nbsp;<strong>备注:</strong>{{item.Remark}}</span>
                        </template>
                        <el-row  v-loading="loading2" element-loading-text="拼命加载中">                        
                          <el-collapse accordion style="border: none;" @change="toplog"  v-model="activeName2">
                              <el-collapse-item title="抓取价格日志">
                                <el-table :data="grabLog" border style="width: 100%" v-loading="loading">
                                <el-table-column label="渠道" prop="PlatformID">
                                    <template scope="scope">
                                    <span v-for="item in PlatPolicyIDs">
                                        <span v-if="scope.row.PlatformID==item.ID">{{item.PlatName}}</span>
                                      </span>  
                                    </template>
                                    </el-table-column>
                                    <el-table-column label="外采渠道" prop="PurchasePlatID">
                                    <template scope="scope">
                                      <span v-for="item in PlatPolicyIDs">
                                          <span v-if="scope.row.PurchasePlatID==item.ID">{{item.PlatName}}</span>
                                        </span>
                                      </template>
                                    </el-table-column>
                                    <el-table-column label="日期" prop="Date" sortable>
                                    <template scope="scope">
                                          <span v-if="scope.row.Date != null">{{scope.row.Date.substring(0,10)}}</span>
                                      </template>
                                    </el-table-column>
                                    <el-table-column label="抓取时间" prop="UpdateTime" sortable>
                                    <template scope="scope">
                                          <span v-if="scope.row.UpdateTime != null">{{scope.row.UpdateTime.substring(0,16)}}</span>
                                      </template>
                                    </el-table-column>
                                    <el-table-column label="底价" prop="Price">
                                    <template scope="scope">
                                          <span v-if="scope.row.Currency == 0">￥{{scope.row.Price}}</span>
                                          <span v-if="scope.row.Currency == 1">YEN{{scope.row.Price}}</span>                                        
                                      </template>
                                    </el-table-column>   
                                    <el-table-column label="房量" prop="RoomCount"></el-table-column>   
                                </el-table>
                              </el-collapse-item>
                          </el-collapse>
                          <el-collapse accordion style="border: none;" @change="touplog" v-model="activeName3">
                              <el-collapse-item title="上传价格日志">
                                <el-table :data="upLog" border style="width: 100%" v-loading="loading">
                                    <el-table-column label="渠道" prop="PlatformID">
                                    <template scope="scope">
                                      <span v-for="item in PlatPolicyIDs">
                                          <span v-if="scope.row.PlatformID==item.ID">{{item.PlatName}}</span>
                                        </span>
                                      </template>
                                    </el-table-column>
                                    <el-table-column label="外采渠道" prop="PurchasePlatID">
                                    <template scope="scope">
                                      <span v-for="item in PlatPolicyIDs">
                                          <span v-if="scope.row.PurchasePlatID==item.ID">{{item.PlatName}}</span>
                                        </span>
                                      </template>
                                    </el-table-column>
                                    <el-table-column label="日期" prop="Date" sortable>
                                    <template scope="scope">
                                          <span v-if="scope.row.Date != null">{{scope.row.Date.substring(0,10)}}</span>
                                      </template>
                                    </el-table-column>
                                    <el-table-column label="上传时间" prop="UpdateTime" sortable>
                                    <template scope="scope">
                                          <span v-if="scope.row.UpdateTime != null">{{scope.row.UpdateTime.substring(0,16)}}</span>
                                      </template>
                                    </el-table-column>
                                    <el-table-column label="价格" prop="Price">
                                    <template scope="scope">
                                          <span v-if="scope.row.Currency == 0">￥{{scope.row.Price}}</span>
                                          <span v-if="scope.row.Currency == 1">YEN{{scope.row.Price}}</span>                                        
                                      </template>
                                    </el-table-column>     
                                </el-table>
                              </el-collapse-item>
                          </el-collapse> 
                          <el-collapse accordion style="border: none;" @change="toupstate" v-model="activeName4">
                              <el-collapse-item title="上传房态日志">
                                <el-table :data="upstate" border style="width: 100%" v-loading="loading">
                                    <el-table-column label="渠道" prop="PlatformID">
                                    <template scope="scope">
                                    <span v-for="item in PlatPolicyIDs">
                                        <span v-if="scope.row.PlatformID==item.ID">{{item.PlatName}}</span>
                                      </span>
                                    </template>                                   
                                    </el-table-column>
                                    <el-table-column label="外采渠道" prop="PurchasePlatID">
                                    <template scope="scope">
                                      <span v-for="item in PlatPolicyIDs">
                                          <span v-if="scope.row.PurchasePlatID==item.ID">{{item.PlatName}}</span>
                                        </span>
                                      </template>
                                    </el-table-column>
                                    <el-table-column label="日期" prop="Date" sortable>
                                    <template scope="scope">
                                          <span v-if="scope.row.Date != null">{{scope.row.Date.substring(0,10)}}</span>
                                      </template>
                                    </el-table-column>
                                    <el-table-column label="上传时间" prop="UpdateTime" sortable>
                                    <template scope="scope">
                                        <span v-if="scope.row.UpdateTime != null">{{scope.row.UpdateTime.substring(0,16)}}</span>
                                    </template>
                                    </el-table-column>
                                    <el-table-column label="房态" prop="RoomCount"></el-table-column>     
                                </el-table>
                              </el-collapse-item>
                          </el-collapse>
                          <el-collapse accordion style="border: none;" @change="towlog" v-model="activeName5">
                              <el-collapse-item title="写入价格日志">
                                <el-table :data="writeLog" border style="width: 100%" v-loading="loading">
                                    <el-table-column label="渠道" prop="PlatformID">
                                    <template scope="scope">
                                    <span v-for="item in PlatPolicyIDs">
                                        <span v-if="scope.row.PlatformID==item.ID">{{item.PlatName}}</span>
                                      </span>
                                    </template>
                                    </el-table-column>
                                    <el-table-column label="外采渠道" prop="PurchasePlatID">
                                    <template scope="scope">
                                      <span v-for="item in PlatPolicyIDs">
                                          <span v-if="scope.row.PurchasePlatID==item.ID">{{item.PlatName}}</span>
                                        </span>
                                      </template>
                                    </el-table-column>
                                    <el-table-column label="日期" prop="Date" sortable>
                                    <template scope="scope">
                                          <span v-if="scope.row.Date != null">{{scope.row.Date.substring(0,10)}}</span>
                                      </template>
                                    </el-table-column>
                                    <el-table-column label="写入时间" prop="UpdateTime" sortable>
                                    <template scope="scope">
                                        <span v-if="scope.row.UpdateTime != null">{{scope.row.UpdateTime.substring(0,16)}}</span>
                                    </template>
                                    </el-table-column>
                                    <el-table-column label="价格" prop="Price">
                                    <template scope="scope">
                                          <span v-if="scope.row.Currency == 0">￥{{scope.row.Price}}</span>
                                          <span v-if="scope.row.Currency == 1">YEN{{scope.row.Price}}</span>                                        
                                      </template>
                                    </el-table-column>   
                                    <el-table-column label="房态" prop="RoomCount"></el-table-column>   
                                </el-table>
                              </el-collapse-item>
                          </el-collapse>
                    </el-row>
                               
                    </el-collapse-item>
                </el-collapse>
                

            </el-collapse-item>
    </el-collapse>                        
    </el-row>
    
    
</div>
</template> 
<script>
import {hotelogApi,hotelRoomApi,hotelThreePlatInfoApi,policyApi  } from 'api'
export default {
  data() {
    return {
      currentPage: 1,
      dwzList:[], 
      WaiCaiPlatID:[],
      PlatPolicyIDs:[],
      sons:[],
      grabLog:[],//抓取价格
      upLog:[],//上传价格
      upstate:[],//上传房态
      writeLog:[],//写入价格      
      pageSize: 10,
      count: 0,
      ID:"",
      sonID:"",
      activeName:"",
      activeName1:"", 
      activeName2:"",
      activeName3:"",     
      activeName4:"",     
      activeName5:"",                
      loading: false,
      loading1: false, 
      loading2: false,                 
      isEditable: true,
      isopen1:false,
      isopen2:false,
      isopen3:false,
      isopen4:false,      
      showDialog: false,
      dialogTitle: '',
      nowload:"",
      form: {
       
      },
      copyForm: {},
      filters: {
        StartDate: '',
        EndDate:'',
        SonRoomID:"",
        PlatformID1:3,
        PlatformID:3,
        WaiCaiPlatID:5
      }
    }
  },
  created() { 
    const myDate = new Date()
    const now = myDate.Format('yyyy-MM-dd')
    const nn = now +"-"+now
    this.filters.StartDate = new Date(now)
    this.filters.EndDate = new Date(now)
    //console.log(nn)
    this.fetchData()
    this.toWaiCaiPlatID()
    this.platformAccount()
  },
  methods: {
    carlineStationSearch() {
      this.fetchData()
    },
    returns(){
            this.$router.go(-1)
    },
    updata(){
      const _self = this; 
      _self.activeName = 0
      _self.activeName1 = 0  
      _self.toInitial()                   
      _self.fetchData()
    },
    async uphlog(){
      const _self = this;
      _self.toInitial()
      _self.isopen1 = false
      _self.isopen2 = false
      _self.isopen3 = false
      _self.isopen4 = false   
    },
    toInitial(){
      const _self = this;      
      _self.activeName2 = 0  
      _self.activeName3 = 0                
      _self.activeName4 = 0                
      _self.activeName5 = 0  
      _self.grabLog =[]
      _self.upLog =[] 
      _self.upstate =[] 
      _self.writeLog =[] 
    },
    toplog(){
      const _self = this; 
      _self.nowload = 0
      if(!_self.isopen1){
      _self.hotelDetail1(_self.sonID)   
      } 
    },
    touplog(){
      const _self = this; 
      _self.nowload = 1
      if(!_self.isopen2){
        _self.hotelDetail1(_self.sonID)    
        }   
    },
    toupstate(){
      const _self = this; 
      _self.nowload = 2
     if(!_self.isopen3){
        _self.hotelDetail1(_self.sonID)    
        }   
    },
    towlog(){
      const _self = this; 
      _self.nowload = 3
        if(!_self.isopen4){
         _self.hotelDetail1(_self.sonID)    
        } 
    },
    hotelDetail2(id){
      const _self = this; 
      _self.sonID = id  
      _self.toInitial()
      _self.isopen1 = false
      _self.isopen2 = false
      _self.isopen3 = false
      _self.isopen4 = false 
              
    },
    async hotelDetail1(id){
        console.log(id)
      const _self = this; 
      _self.loading2=true
      if(id!=''){
        _self.sonID = id
        _self.isopen = false
        let time1 = "";
      let time2 = "";
      if (typeof _self.filters.StartDate != "undefined") {
        if (_self.filters.StartDate[0] != null) {
          time1 = new Date(_self.filters.StartDate[0]).Format("yyyy-MM-dd");
          time2 = new Date(_self.filters.StartDate[1]).Format("yyyy-MM-dd");
        }
      }
            const params = {
                    HotelID: _self.$route.params.ID,
                    SonRoomID:id,
                    PlatformID: _self.filters.PlatformID,
                    PurchasePlatID:_self.filters.WaiCaiPlatID,
                    StartTime:time1,
                    EndTime:time2                          
            }
            if(_self.nowload == 0){   
              const getp = await hotelogApi.getPrice(params)
              _self.grabLog = getp.data  
              _self.isopen1 = true       
            }
            if(_self.nowload == 2){
              const ups = await hotelogApi.upState(params)
             _self.upstate = ups.data 
              _self.isopen3 = true       
             
            }
            if(_self.nowload == 1){
               const upp = await hotelogApi.upPrice(params)
              _self.upLog = upp.data  
              _self.isopen2 = true       
                      
            }
            if(_self.nowload == 3){
                const inp = await hotelogApi.intPrice(params)       
              _self.writeLog = inp.data
              _self.isopen4 = true       
              
                       
            }
          _self.loading2 = false
    
       }else{
           _self.loading2 = false
       }   
    },
    async platformAccount(){
          const res = await hotelThreePlatInfoApi.getList()
          this.PlatPolicyIDs = res.data
          console.log(res)
    },
    async hotelDetail(id){
      const _self = this;  
      _self.loading1 = true  
      if(id){
        _self.ID = id
       const options = {
          PlatformID :_self.filters.PlatformID1,
          RoomID:id
        }
      const res = await hotelogApi.getSon(options)
      _self.sons = res.data
      _self.loading1 = false       
      }
    },
    handleSizeChange(val) {
        this.pageSize = val
        this.fetchData(1, this.pageSize)
    },
    handleCurrentChange(val) {
        this.currentPage = val
        this.fetchData(this.currentPage)
    },
    async toWaiCaiPlatID(){
            const options = {
                pageSize: 1000,
                order: 'Sort'
            }     
            const res = await policyApi.getPolicyPlatform(options)
            this.WaiCaiPlatID = res.data.Data
        //   console.log(this.WaiCaiPlatID) 
    },
    async fetchData() {
        this.loading=true
        const options = {
          PlatformID :this.filters.PlatformID1,
          HotelID:this.$route.params.ID
        }
      const res = await hotelogApi.getDetail(options)
      console.log(res)
      this.dwzList = res.data
      if(this.dwzList){
        this.loading=false 
      }
    }
  
  
  }
}
</script>
<style lang="scss">
#Wxyh{
  .el-dialog--small{
    width:50%
  }
}
</style>
