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
    <el-option v-for="item in countryOptions" :key="item.AreaName" :label="item.AreaName" :value="item.AreaName"></el-option>
  </el-select>
  </el-col>
  <el-col :span="4">
      <el-input placeholder="请输入城市" v-model="filters.city"></el-input>
    </el-col>
    <el-col :span="3">
      <el-input placeholder="请输入星级" v-model="filters.StarNum"></el-input>
    </el-col>
    <el-col :span="5">
      <el-button type="primary" @click="hotelbaseSearch(filters)">搜索</el-button>
      <el-button @click="hotelbaseEdit()">添加酒店</el-button> 
    </el-col>
  </el-row>
  
  <el-col :span="5" style="margin:10px">
      <el-button type="primary" @click="alladd()">批量移除</el-button>
    </el-col>
  <div class="eltable">
       <el-table :data="hotelbase" element-loading-text="拼命加载中"  border  @selection-change="handleSelectionChange" v-loading="loading" style="width: 100%">
        <el-table-column type="selection" width="55" :reserve-selection="false"></el-table-column>
        <el-table-column prop="HotelName" label="酒店名称" show-overflow-tooltip></el-table-column>      
        <el-table-column prop="HotelName_En" label="酒店英文名" show-overflow-tooltip></el-table-column>
        <el-table-column prop="Address" label="地址" show-overflow-tooltip></el-table-column>
        <el-table-column prop="StarNum" label="星级" show-overflow-tooltip></el-table-column>
        <el-table-column prop="City" label="城市" show-overflow-tooltip></el-table-column>
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
          
      </div>
</template>

<script>
import { hotelGroupApi,hotelAreaApi2,hotelBaseApi } from 'api'
export default {
  created() {
    const _self = this
    _self.Groupname = _self.$route.query.GroupName
    _self.form.id = _self.$route.params.ID 
    _self.ID = _self.$route.params.ID         
    _self.form.GroupName = _self.$route.query.GroupName  
    _self.form.Remark = _self.$route.query.Remark     
    _self.getHotelbaseList()
    _self.getCountryOptions() 
  },
  data() {
    return {
      dialogTableVisible: false,
      Groupname:"",
      ID:"",
      countryOptions: [],
      multipleSelection: [],
      multipleSelection2:[],
      hotelbase: [],
      addlist:[],
      currentPage: 1,      
      pageSize: 10,    
      count: 0,
      loading: false,
      filters: {
        ID: '',
        HotelName: '',
        HotelName_En: '',
        StarNum:"",
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
    hotelbaseSearch() {
      const _self = this
      _self.getHotelbaseList()
      
    },
    async getHotelbaseList(currentPage,pageSize) {
      const _self = this
      _self.loading = true
      _self.currentPage = currentPage || _self.currentPage
      _self.pageSize = pageSize || _self.pageSize   
      const options = {
        pageIndex: currentPage || _self.currentPage,
        pageSize: pageSize || _self.pageSize,
        order: 'ID',
        query: {
          ID: _self.filters.labelVal === '3' ? _self.filters.ID : '',
          HotelName:
            _self.filters.labelVal === '1' ? _self.filters.HotelName : '',
          HotelName_En:
            _self.filters.labelVal === '2' ? _self.filters.HotelName_En : '',
          City: _self.filters.city,
          StarNum:_self.filters.StarNum,
          Country: _self.filters.country,
          IsDelete: false
        }
      }
      try {  
          const res = await hotelBaseApi.listgroup(_self.form.id,options)  
          console.log(options)
          let data = res.data.Data  
          _self.hotelbase = data            
          _self.count = res.data.Count               
         _self.loading = false
      } catch (e) {
         // console.log(e)
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
          let ids = []          
          ids.push(row.ID)    
          let strids = '['+ ids.toString() + ']'
              const a=  await hotelGroupApi.removehotel(_self.$route.params.ID,strids)  
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
      handleCurrentChange(val) {
        this.currentPage = val
        this.getHotelbaseList(this.currentPage)
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;  
       // console.log(this.multipleSelection)       
      },
    async alladd(){
        const _self = this; 
         try{
        let ids = []          
              for(let i in _self.multipleSelection){
                  ids.push(_self.multipleSelection[i].ID)
              }
          let strids = '['+ ids.toString() + ']'
          if(ids.length!=0){
              const a=  await hotelGroupApi.removehotel(_self.$route.params.ID,strids)  
              _self.getHotelbaseList()
              _self.loading2 = false
              _self.$message({
                message: '删除成功',
                type: 'success'
              })         
                
          }else{
              this.$message({
                  message: '请选择酒店',
                  type: 'warning'
              });
          }
      }catch(e){
              _self.$message.error('删除失败!!!')
          }
    },
    hotelbaseEdit() {
    const _self = this     
      _self.$router.push({
        name: '酒店组添加',
        params: {
          ID: _self.ID,
        },
        query: {
          GroupName: _self.$route.query.GroupName       
        }
      })
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
}
</style>
