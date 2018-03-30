<template lang="html">
<div id="HotelGrouPage">
<el-row :gutter="20">
  <h1 style="text-align:center">{{Groupname}}</h1>
</el-row>
<el-row :gutter="20">
<el-form  ref="form" :model="form"  label-width="50px">
      <el-row> 
          <el-col :span="6">
            <el-form-item label="名称" prop="GroupName" >
                  <el-input v-model="form.GroupName" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="备注" prop="Remark" >
                <el-input v-model="form.Remark" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="margin-left:30px">
            <el-button type="primary" @click="submitForm()">保存</el-button>
          </el-col>
        </el-row>
</el-form>
</el-row>
  <el-row :gutter="20">
    <el-col :span="3">
      <el-select v-model="filters.labelVal" placeholder="请选择">
        <el-option v-for="(item,index) in selectedOptions" :label="item.label" :value="item.value" :key="index">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="5">
      <el-input placeholder="请输入酒店名称" v-model="filters.HotelName" v-show="filters.labelVal == '1'"></el-input>
      <el-input placeholder="请输入酒店英文名称" v-model="filters.HotelName_En" v-show="filters.labelVal == '2'"></el-input>
      <el-input placeholder="请输入酒店ID" v-model="filters.ID" v-show="filters.labelVal == '3'"></el-input>
    </el-col>
    <el-col :span="4">
      <el-select v-model="filters.country" placeholder="请选择国家">
    <el-option
      v-for="item in countryOptions"
      :key="item.AreaName"
      :label="item.AreaName"
      :value="item.AreaName">
    </el-option>
  </el-select>
  </el-col>
  <el-col :span="4">
      <el-input placeholder="请输入城市" v-model="filters.city"></el-input>
    </el-col>
    <el-col :span="5">
      <el-button type="primary" @click="hotelbaseSearch(filters)">搜索</el-button>
      <el-button type="primary" @click="hotelAddHide">
        添加酒店
      </el-button>
    </el-col>
  </el-row>
  <el-col :span="5" style="margin:10px">
      <el-button type="primary" @click="alladd(filters)">批量移除</el-button>
    </el-col>
  <div class="eltable">
       <el-table :data="hotelbase" element-loading-text="拼命加载中"  border  @selection-change="handleSelectionChange" v-loading="loading" style="width: 100%">
        <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
        <el-table-column prop="HotelName" label="酒店名称" show-overflow-tooltip></el-table-column>      
        <el-table-column prop="GroupName" label="酒店组名" show-overflow-tooltip></el-table-column>
        <el-table-column prop="Address" label="地址" show-overflow-tooltip></el-table-column>
        <el-table-column prop="Star.StarName" label="星级" show-overflow-tooltip></el-table-column>
        <el-table-column prop="GroupName" label="城市" show-overflow-tooltip></el-table-column>
        <el-table-column   label="操作" width="180" fixed="right">
          <template scope="scope">
             <el-button size="small" type="danger"  @click="del(scope.$index, scope.row)">移除</el-button>
          </template>
        </el-table-column>
      </el-table> 
    </div>
      <div class="pagination-wrapper" >
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="[10, 20, 30]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="count">
        </el-pagination>
      </div>
      <el-dialog title="添加酒店" v-model="dialogTableVisible" width="80%">
      <el-row :gutter="20">
    <el-col :span="3">
      <el-select v-model="filters.labelVal" placeholder="请选择">
        <el-option v-for="(item,index) in selectedOptions" :label="item.label" :value="item.value" :key="index">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="5">
      <el-input placeholder="请输入酒店名称" v-model="filters.HotelName" v-show="filters.labelVal == '1'"></el-input>
      <el-input placeholder="请输入酒店英文名称" v-model="filters.HotelName_En" v-show="filters.labelVal == '2'"></el-input>
      <el-input placeholder="请输入酒店ID" v-model="filters.ID" v-show="filters.labelVal == '3'"></el-input>
    </el-col>
    <el-col :span="4">
      <el-select v-model="filters.country" placeholder="请选择国家">
    <el-option
      v-for="item in countryOptions"
      :key="item.AreaName"
      :label="item.AreaName"
      :value="item.AreaName">
    </el-option>
  </el-select>
  </el-col>
  <el-col :span="4">
      <el-input placeholder="请输入城市" v-model="filters.city"></el-input>
    </el-col>
    <el-col :span="5">
      <el-button type="primary" @click="hotelbaseSearch2(filters)">搜索</el-button>
      <el-button type="primary" @click="addtogroup">
        添加
      </el-button>
    </el-col>
  </el-row>
          <div class="eltable">
            <el-table
            :data="addlist"
            v-loading="loading"
            element-loading-text="拼命加载中"
            @selection-change="handleSelectionChange2"
            border
            style="width: 100%">
              <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
              <el-table-column prop="HotelName" label="酒店名称" show-overflow-tooltip></el-table-column>      
              <el-table-column prop="GroupName" label="酒店组名" show-overflow-tooltip></el-table-column>
              <el-table-column prop="Address" label="地址" show-overflow-tooltip></el-table-column>
              <el-table-column prop="StarNum" label="星级" show-overflow-tooltip></el-table-column>
              <el-table-column prop="City" label="城市" show-overflow-tooltip></el-table-column>
            </el-table> 
          </div>
          <div class="pagination-wrapper" >
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="[10, 20, 30]"
          @size-change="handleSizeChange2"
          @current-change="handleCurrentChange2"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="count2">
        </el-pagination>
      </div>
      </el-dialog>
      
  </div>
</template>

<script>
import { hotelGroupApi,hotelAreaApi2,hotelBaseApi } from 'api'
import HotelBaseAdd from './hotel-base-add.vue'
export default {
  components: {
    HotelBaseAdd
  },
  created() {
    const _self = this
    _self.getHotelbaseList()
    _self.getCountryOptions()
    _self.Groupname = _self.$route.query.GroupName
    _self.form.id = _self.$route.params.ID
   
  },
  data() {
    return {
      dialogTableVisible: false,
      Groupname:"",
      countryOptions: [],
      multipleSelection: [],
      multipleSelection2:[],
      hotelbase: [],
      addlist:[],
      currentPage: 1,
      pageSize: 10,
      count: 0,
      count2:0,
      loading: false,
      filters: {
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
    hotelAddHide() {
      this.dialogTableVisible = true
      console.log("123")
      this.getHotelbaseall()
    },
    hotelbaseSearch() {
      this.getHotelbaseList()
    },
    hotelbaseSearch2(){
       this.getHotelbaseall()
    },
    async getHotelbaseList(currentPage, pageSize) {
      const _self = this
      _self.loading = true
      _self.currentPage = currentPage || _self.currentPage
      _self.pageSize = pageSize || _self.pageSize
      const options = {
        pageIndex: currentPage || _self.currentPage,
        pageSize: pageSize || _self.pageSize,
        GroupId:_self.$route.params.ID,
        order: 'ID',
        query: {
          ID: _self.filters.labelVal === '3' ? _self.filters.ID : '',
          HotelName:
            _self.filters.labelVal === '1' ? _self.filters.HotelName : '',
          HotelName_En:
            _self.filters.labelVal === '2' ? _self.filters.HotelName_En : '',
          City: _self.filters.city,
          Country: _self.filters.country,
          IsDelete: false
        }
      }
      try {  
          const res = await hotelBaseApi.listgroup(options)  
          let data = res.data.Data
          _self.hotelbase = data
          _self.count = res.data.Count               
         _self.loading = false
      } catch (e) {
          console.log(e)
        _self.loading = false
      }
          
    },
    async submitForm(){
      const _self = this
      _self.$refs['form'].validate(async valid => {
                if (valid) {
                try {       
                 const res =  await hotelGroupApi.keep(_self.form)
                 console.log(res)
                    _self.getHotelbaseList()
                    _self.dialogTableVisible = false
                    _self.$message({
                    message: '保存成功',
                    type: 'success'
                    })
                    this.$router.go(-1);
                } catch (e) {
                    console.error(e)
                    _self.$message.error('添加失败!!!')
                } 
                } else {
                return false
                }
            })

    },
    async getHotelbaseall(currentPage, pageSize) {
      const _self = this
      _self.loading = true
      _self.currentPage = currentPage || _self.currentPage
      _self.pageSize = pageSize || _self.pageSize
      const options = {
        pageIndex: currentPage || _self.currentPage,
        pageSize: pageSize || _self.pageSize,
        GroupId:_self.$route.params.ID,
        order: 'ID',
        query: {
          ID: _self.filters.labelVal === '3' ? _self.filters.ID : '',
          HotelName:
            _self.filters.labelVal === '1' ? _self.filters.HotelName : '',
          HotelName_En:
            _self.filters.labelVal === '2' ? _self.filters.HotelName_En : '',
          City: _self.filters.city,
          Country: _self.filters.country,
          IsDelete: false
        }
      }
      try {
          const res2 = await hotelBaseApi.addlist(options)
          console.log(res2)
          let data2 = res2.data.Data
          _self.addlist = data2        
          _self.count2 = res2.data.Count
         _self.loading = false
      } catch (e) {
          console.log(e)
        _self.loading = false
      }
          
    },
    async submitForm(){
      const _self = this
      _self.$refs['form'].validate(async valid => {
                if (valid) {
                try {       
                 const res =  await hotelGroupApi.keep(_self.form)
                 console.log(res)
                    _self.getHotelbaseList()
                    _self.dialogTableVisible = false
                    _self.$message({
                    message: '保存成功',
                    type: 'success'
                    })
                    this.$router.go(-1);
                } catch (e) {
                    console.error(e)
                    _self.$message.error('添加失败!!!')
                } 
                } else {
                return false
                }
            })

    },
   async del($index, row){
          const _self = this
          _self.$confirm(`是否删除?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          })
          .then(async() => {
          try {
              await hotelGroupApi.del(row.ID)  
              _self.getHotelbaseList()
              _self.$message({
              message: '删除成功',
              type: 'success'
              })
          } catch (e) {
              console.error(e)
          }
          })
          .catch(() => {})
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getHotelbaseList(1, this.pageSize)
    },
    handleSizeChange2(val) {
      this.pageSize = val
      this.getHotelbaseall(1, this.pageSize)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getHotelbaseList(this.currentPage)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;  
      console.log(this.multipleSelection)       
    },
    handleSelectionChange2(val) {
      this.multipleSelection2 = val;  
      console.log(this.multipleSelection)       
    },
    handleCurrentChange2(val) {
      this.currentPage = val
      this.getHotelbaseall(this.currentPage)
    },
    async alladd(){
        const _self = this;
        
        if(_self.multipleSelection.length!=0){
            console.log(_self.multipleSelection)
        }else{
            this.$message({
                message: '请选择酒店',
                type: 'warning'
            });
        }
   },
   async addtogroup(){
      const _self = this;
      console.log(_self.multipleSelection2)       
      
        if(_self.multipleSelection2.length!=0){
            console.log(_self.multipleSelection2)
        }else{
            this.$message({
                message: '请选择酒店',
                type: 'warning'
            });
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
