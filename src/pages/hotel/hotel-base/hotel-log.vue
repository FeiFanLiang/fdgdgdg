<template lang="html">
<div id="Wxyh">
<el-row :gutter="20">
  <h1 style="text-align:center">酒店日志</h1>
</el-row>
    <el-form label-width="70px">
    <el-row :gutter="20">
        <el-col :span="6">
            <el-form-item label="时间范围">
                <el-date-picker  v-model="filters.CreateTime" type="daterange"></el-date-picker>
            </el-form-item>
        </el-col>  
        <el-col :span="6">
        <el-form-item label="外采渠道" prop="WaiCaiPlatID" style="margin-bottom:30px">
              <el-select v-model="filters.WaiCaiPlatID" clearable @change="updata">
                <el-option v-for="item in WaiCaiPlatID" :key="item.value" :label="item.Account" :value="item.ID"></el-option>
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

    <el-collapse accordion style="border-right: none;" @change="hotelDetail(activeName)" v-model="activeName">
            <el-collapse-item :key="item.id" v-for="(item,index) in dwzList" style="border-right: none;" :name="item.ID">
              <template slot="title">
                   <span>{{item.RoomName}}</span>
                </template>

                <el-collapse accordion style="border: none;">
                    <el-collapse-item :key="item.id" v-for="(item,index) in dwzList" style="border-right: none;" :name="item.ID">
                      <template slot="title">
                            <span>{{item.RoomName}}</span>
                        </template>
                        <el-collapse accordion style="border: none;" @change="">
                            <el-collapse-item title="抓取价格日志">
                              <el-table :data="dwzList" border style="width: 100%" v-loading="loading">
                                  <el-table-column label="日期" prop="RoomName" min-width="300"></el-table-column>
                                  <el-table-column label="抓取时间" prop="RoomName" min-width="300"></el-table-column>
                                  <el-table-column label="底价" prop="RoomName" min-width="300"></el-table-column>   
                                  <el-table-column label="房量" prop="RoomName" min-width="300"></el-table-column>   
                              </el-table>
                            </el-collapse-item>
                        </el-collapse>
                        <el-collapse accordion style="border: none;" @change="">
                            <el-collapse-item title="上传价格日志">
                              <el-table :data="dwzList" border style="width: 100%" v-loading="loading">
                                  <el-table-column label="渠道" prop="RoomName" min-width="300"></el-table-column>
                                  <el-table-column label="上传时间" prop="RoomName" min-width="300"></el-table-column>
                                  <el-table-column label="价格" prop="RoomName" min-width="300"></el-table-column>     
                              </el-table>
                            </el-collapse-item>
                        </el-collapse>
                         <el-collapse accordion style="border: none;" @change="">
                              <el-collapse-item title="上传房态日志">
                                <el-table :data="dwzList" border style="width: 100%" v-loading="loading">
                                    <el-table-column label="渠道" prop="RoomName" min-width="300"></el-table-column>
                                    <el-table-column label="上传时间" prop="RoomName" min-width="300"></el-table-column>
                                    <el-table-column label="房态" prop="RoomName" min-width="300"></el-table-column>     
                                </el-table>
                              </el-collapse-item>
                          </el-collapse>
                          <el-collapse accordion style="border: none;" @change="">
                              <el-collapse-item title="写入价格日志">
                                <el-table :data="dwzList" border style="width: 100%" v-loading="loading">
                                    <el-table-column label="渠道" prop="RoomName" min-width="300"></el-table-column>
                                    <el-table-column label="写入时间" prop="RoomName" min-width="300"></el-table-column>
                                    <el-table-column label="价格" prop="RoomName" min-width="300"></el-table-column>   
                                    <el-table-column label="房态" prop="RoomName" min-width="300"></el-table-column>   
                                </el-table>
                              </el-collapse-item>
                          </el-collapse>     
                    </el-collapse-item>
                </el-collapse>
                

            </el-collapse-item>
    </el-collapse>                         
    
    
    
</div>
</template> 
<script>
import {policyApi,hotelRoomApi,sonRoomPlatformApi  } from 'api'
export default {
  data() {
    return {
      currentPage: 1,
      dwzList:[], 
      WaiCaiPlatID:[],
      expandRowKeys:[0],
      grabLog:[],//抓取价格
      upLog:[],//上传价格
      upState:[],//上传房态
      writeLog:[],//写入价格      
      pageSize: 10,
      count: 0,
      ID:"",
      activeName:"",
      loading: false,
      isEditable: true,
      showDialog: false,
      dialogTitle: '',
      form: {
       
      },
      copyForm: {},
      filters: {
        Nickname: ''
      }
    }
  },
  created() { 
    this.fetchData()
    this.platformAccount()
  },
  methods: {
    carlineStationSearch() {
      this.fetchData()
    },
    updata(){
      console.log("更新")
    },
    hotelDetail(id){
      if(id){
        console.log(id)
          
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
    handleExpand(row, expanded) {
      const _self = this;
      if (expanded) {
        _self.expandRowKeys.length = 0;
        _self.expandRowKeys.push(row.ID);
        _self.ID = row.ID;
      }
     
    },
    async platformAccount(){
            const options = {
                pageSize: 1000,
                order: 'Sort'
            }     
            const res = await policyApi.getPolicyPlatform(options)
            this.WaiCaiPlatID = res.data.Data
           console.log(this.WaiCaiPlatID)
    },
    async platTimeRange(pid) {
      if (!pid) {
        return ''
      }
      const res = await sonRoomPlatformApi.listBySonRoom(pid)
      if (!res.data || !res.data.length) {
        return ''
      }
      const data = res.data.map(item => ({
        platName: item.Platform.PlatName,
        beginDate: item.BeginDate,
        endDate: item.EndDate
      }))
      return data
    },
    async fetchData(currentPage,pageSize) {

      const res = await hotelRoomApi.list(this.$route.params.ID)
    
      this.dwzList = [...res.data]
      const newList = [...res.data]
      newList.forEach((room, rindex) => {
        room.SonRooms.forEach(async(sroom, srindex) => {
          const platTimeRange = await this.platTimeRange(sroom.ID)
          sroom.platTimeRange = platTimeRange
          if (rindex + 1 === newList.length && srindex + 1 === room.length) {
            this.dwzList = newList
          }
        })

        // this.$set(newList[index], 'platTimeRange', platTimeRange)
      })

      console.log(this.dwzList)

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
