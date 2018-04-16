<template lang="html">
<div id="Wxyh">
<el-row :gutter="20">
  <h1 style="text-align:center">酒店日志</h1>
</el-row>
    <el-form label-width="70px">
    <el-row :gutter="20">
        <el-col :span="6">
            <el-form-item label="开始时间">
                <el-date-picker  v-model="filters.StartDate" type="date"></el-date-picker>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="结束时间">
                <el-date-picker  v-model="filters.EndDate" type="date"></el-date-picker>
            </el-form-item>
        </el-col> 
        <el-col :span="6">
        <el-form-item label="采购渠道" prop="WaiCaiPlatID" style="margin-bottom:30px">
              <el-select v-model="filters.WaiCaiPlatID" clearable @change="updata">
                <el-option v-for="item in PlatPolicyIDs" :key="item.value" :label="item.PlatName" :value="item.ID"></el-option>
              </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="6">
        <el-form-item label="渠道" prop="PlatformID" style="margin-bottom:30px">
              <el-select v-model="filters.PlatformID" clearable >
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
                        <el-table-column label="日期" prop="RoomName" min-width="300"></el-table-column>
                        <el-table-column label="抓取时间" prop="RoomName" min-width="300"></el-table-column>
                        <el-table-column label="底价" prop="RoomName" min-width="300"></el-table-column>   
                        <el-table-column label="房量" prop="RoomName" min-width="300"></el-table-column>   
                    </el-table>
                  </el-collapse-item>
                  </el-collapse>
                  <el-collapse accordion style="border-right: none;" @change="">
                  <el-collapse-item title="上传价格日志">
                    <el-table :data="upLog" border style="width: 100%" v-loading="loading">
                        <el-table-column label="渠道" prop="RoomName" min-width="300"></el-table-column>
                        <el-table-column label="上传时间" prop="RoomName" min-width="300"></el-table-column>
                        <el-table-column label="价格" prop="RoomName" min-width="300"></el-table-column>     
                    </el-table>
                  </el-collapse-item>
                  </el-collapse>
                  <el-collapse accordion style="border-right: none;" @change="">
                  <el-collapse-item title="上传房态日志">
                    <el-table :data="upState" border style="width: 100%" v-loading="loading">
                        <el-table-column label="渠道" prop="RoomName" min-width="300"></el-table-column>
                        <el-table-column label="上传时间" prop="RoomName" min-width="300"></el-table-column>
                        <el-table-column label="房态" prop="RoomName" min-width="300"></el-table-column>     
                    </el-table>
                  </el-collapse-item>
                  </el-collapse>
                  <el-collapse accordion style="border-right: none;" @change="">
                  <el-collapse-item title="写入价格日志">
                    <el-table :data="writeLog" border style="width: 100%" v-loading="loading">
                        <el-table-column label="渠道" prop="RoomName" min-width="300"></el-table-column>
                        <el-table-column label="写入时间" prop="RoomName" min-width="300"></el-table-column>
                        <el-table-column label="价格" prop="RoomName" min-width="300"></el-table-column>   
                        <el-table-column label="房态" prop="RoomName" min-width="300"></el-table-column>   
                    </el-table>
                  </el-collapse-item>
                  </el-collapse>                         
                </template>   
            </template>                             
        </el-table-column> 
          <el-table-column label="物理房型" prop="RoomName" min-width="300"></el-table-column>   
    </el-table> -->
  <el-row  v-loading="loading" element-loading-text="拼命加载中" style="height:100px">
    <el-collapse accordion style="border-right: none;" @change="hotelDetail(activeName)" v-model="activeName">
            <el-collapse-item :key="item.id" v-for="(item,index) in dwzList" style="border-right: none;" :name="item.ID">
              <template slot="title">
                   <span>{{item.RoomName}}</span>
                </template>

                <el-collapse accordion style="border: none;" @change="hotelDetail1(activeName1)" v-model="activeName1">
                    <el-collapse-item :key="item.id" v-for="(item,index) in sons" style="border-right: none;" :name="item.SonRoomID">
                      <template slot="title">
                            <span>{{item.PlatSaleRoomName}}&nbsp;&nbsp;&nbsp;({{item.SonRoomID}})&nbsp;&nbsp;&nbsp;<strong>备注:</strong>{{item.Remark}}</span>
                        </template>
                        
                        <el-collapse accordion style="border: none;" @change="">
                            <el-collapse-item title="抓取价格日志">
                              <el-table :data="grabLog" border style="width: 100%" v-loading="loading">
                                  <el-table-column label="日期" prop="Date" min-width="300">
                                  <template scope="scope">
                                        <span v-if="scope.row.Date != null">{{scope.row.Date.substring(0,10)}}</span>
                                    </template>
                                  </el-table-column>
                                  <el-table-column label="抓取时间" prop="UpdateTime" min-width="300">
                                  <template scope="scope">
                                        <span v-if="scope.row.UpdateTime != null">{{scope.row.UpdateTime.substring(0,10)}}</span>
                                    </template>
                                  </el-table-column>
                                  <el-table-column label="底价" prop="Price" min-width="300"></el-table-column>   
                                  <el-table-column label="房量" prop="RoomCount" min-width="300"></el-table-column>   
                              </el-table>
                            </el-collapse-item>
                        </el-collapse>
                        <el-collapse accordion style="border: none;" @change="">
                            <el-collapse-item title="上传价格日志">
                              <el-table :data="upLog" border style="width: 100%" v-loading="loading">
                                  <el-table-column label="渠道" prop="PlatformID" min-width="300">
                                  <template scope="scope">
                                    <span v-for="item in PlatPolicyIDs">
                                        <span v-if="scope.row.PlatformID==item.ID">{{item.PlatName}}</span>
                                      </span>
                                    </template>
                                  </el-table-column>
                                  <el-table-column label="上传时间" prop="UpdateTime" min-width="300">
                                  <template scope="scope">
                                        <span v-if="scope.row.UpdateTime != null">{{scope.row.UpdateTime.substring(0,10)}}</span>
                                    </template>
                                  </el-table-column>
                                  <el-table-column label="价格" prop="Price" min-width="300"></el-table-column>     
                              </el-table>
                            </el-collapse-item>
                        </el-collapse> 

                         <el-collapse accordion style="border: none;" @change="">
                              <el-collapse-item title="上传房态日志">
                                <el-table :data="upstate" border style="width: 100%" v-loading="loading">
                                    <el-table-column label="渠道" prop="PlatformID" min-width="300">
                                    <template scope="scope">
                                    <span v-for="item in PlatPolicyIDs">
                                        <span v-if="scope.row.PlatformID==item.ID">{{item.PlatName}}</span>
                                      </span>
                                    </template>                                   
                                    </el-table-column>
                                    <el-table-column label="上传时间" prop="UpdateTime" min-width="300">
                                    <template scope="scope">
                                        <span v-if="scope.row.UpdateTime != null">{{scope.row.UpdateTime.substring(0,10)}}</span>
                                    </template>
                                    </el-table-column>
                                    <el-table-column label="房态" prop="RoomCount" min-width="300"></el-table-column>     
                                </el-table>
                              </el-collapse-item>
                          </el-collapse>
                          <el-collapse accordion style="border: none;" @change="">
                              <el-collapse-item title="写入价格日志">
                                <el-table :data="writeLog" border style="width: 100%" v-loading="loading">
                                    <el-table-column label="渠道" prop="PlatformID" min-width="300">
                                    <template scope="scope">
                                    <span v-for="item in PlatPolicyIDs">
                                        <span v-if="scope.row.PlatformID==item.ID">{{item.PlatName}}</span>
                                      </span>
                                    </template>
                                    </el-table-column>
                                    <el-table-column label="写入时间" prop="UpdateTime" min-width="300">
                                    <template scope="scope">
                                        <span v-if="scope.row.UpdateTime != null">{{scope.row.UpdateTime.substring(0,10)}}</span>
                                    </template>
                                    </el-table-column>
                                    <el-table-column label="价格" prop="Price" min-width="300"></el-table-column>   
                                    <el-table-column label="房态" prop="RoomCount" min-width="300"></el-table-column>   
                                </el-table>
                              </el-collapse-item>
                          </el-collapse>     
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
      expandRowKeys:[0],
      grabLog:[],//抓取价格
      upLog:[],//上传价格
      upstate:[],//上传房态
      writeLog:[],//写入价格      
      pageSize: 10,
      count: 0,
      ID:"",
      activeName:"",
      activeName1:"",      
      loading: false,
      isEditable: true,
      showDialog: false,
      dialogTitle: '',
      form: {
       
      },
      copyForm: {},
      filters: {
        StartDate: '',
        EndDate:'',
        SonRoomID:"",
        PlatformID:3,
        WaiCaiPlatID:5
      }
    }
  },
  created() { 
    const myDate = new Date()
    const now = myDate.Format('yyyy-MM-dd')
    this.filters.StartDate = new Date('2018-04-18')
    this.filters.EndDate = new Date('2018-04-20')
    this.fetchData()
    this.toWaiCaiPlatID()
    this.platformAccount()
  },
  methods: {
    carlineStationSearch() {
      this.fetchData()
    },
    updata(){
     this.fetchData()
      
    },
    async hotelDetail1(id){
        console.log(id)
      const _self = this;    
          const params = {
                HotelID: _self.$route.params.ID,
                SonRoomID:id,
                PlatformID: _self.filters.PlatformID,
                PurchasePlatID:_self.filters.WaiCaiPlatID,
                StartTime:_self.filters.StartDate ? new Date(_self.filters.StartDate).Format('yyyy-MM-dd') : '',
                EndTime:_self.filters.EndDate ? new Date(_self.filters.EndDate ).Format('yyyy-MM-dd') : ''                           
      }
      const getp = await hotelogApi.getPrice(params)
      const ups = await hotelogApi.upState(params)
      const upp = await hotelogApi.upPrice(params)
      const inp = await hotelogApi.intPrice(params)
      _self.grabLog = getp.data
      _self.upLog = ups.data
      _self.upstate = upp.data
     _self.writeLog = inp.data
       
      
      
      console.log(getp)
    },
    async platformAccount(){
            const res = await hotelThreePlatInfoApi.getList()
            this.PlatPolicyIDs = res.data
            console.log(res)
        },
   async hotelDetail(id){
      const _self = this;    
      if(id){
       const options = {
          PlatformID :3,
          RoomID:id
        }
      const res = await hotelogApi.getSon(options)
      _self.sons = res.data
      _self.sons = res.data      
      
      // _self.grabLog = getp
      // _self.upLog = ups
      // _self.upState = upp
      // _self.writeLog = inp
      
      console.log(res.data)
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
           console.log(this.WaiCaiPlatID)
    },
    async fetchData() {
        this.loading=true
        const options = {
          PlatformID :this.filters.PlatformID,
          HotelID:this.$route.params.ID
        }
      const res = await hotelogApi.getDetail(options)
    console.log(res)
      this.dwzList = res.data
      
      // const newList = [...res.data] 
      // newList.forEach((room, rindex) => {
      //   room.SonRooms.forEach(async(sroom, srindex) => {
      //     const platTimeRange = await this.platTimeRange(sroom.ID)
      //     sroom.platTimeRange = platTimeRange
      //     if (rindex + 1 === newList.length && srindex + 1 === room.length) {
      //       this.dwzList = newList
      //     } 
      //   })

      //   // this.$set(newList[index], 'platTimeRange', platTimeRange)
      // }) 
      if(this.dwzList){
        this.loading=false 
      }
      //console.log(s)

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
