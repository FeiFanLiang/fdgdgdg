<template lang="html">
<div id="Wxyh">
    <el-form label-width="70px">
      <el-row :gutter="17">
        <el-col :span="6">
            <el-form-item label="处理人">
                <el-input v-model="filters.OptUserName"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="标题">
                <el-input v-model="filters.Title"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="提单人">
                <el-input v-model="filters.CreateUserName"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="处理状态" prop="OptState" style="margin-bottom:30px">
                <el-select v-model="filters.OptState" clearable>
                  <el-option v-for="item in OptState" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="17">
        <el-col :span="6">
            <el-form-item label="结单状态" prop="ReState" style="margin-bottom:30px">
                <el-select v-model="filters.ReState" clearable>
                  <el-option v-for="item in ReState" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="创建时间">
                <el-date-picker  v-model="filters.CreateTime" type="daterange"></el-date-picker>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="项目" prop="ProjectType" style="margin-bottom:30px">
                <el-select v-model="filters.ProjectType" clearable>
                  <el-option v-for="item in ProjectType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-button type="primary" @click="hotelsOrderSearch(filters)">搜索</el-button>
            <el-button @click="downloadList()">下载<i class="el-icon-document el-icon--right" ></i></el-button>
            <el-button type="primary" @click="addlss()">新建</el-button>            
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="dwzList" border style="width: 100%" v-loading="loading">
        <el-table-column prop="ID" label="ID"></el-table-column>
        <el-table-column prop="ProjectType" label="项目">
          <template scope="scope">
            <span  v-if="scope.row.ProjectType == 0">酒店订单</span>
            <span  v-if="scope.row.ProjectType == 1">酒店财务</span>
            <span  v-if="scope.row.ProjectType == 9">其他</span>            
          </template>
        </el-table-column>
        <el-table-column prop="Title" label="标题" width="170">
          <template scope="scope">
            <el-tooltip placement="top-start">
            <span slot="content">{{scope.row.Description}}</span>
                  <span>{{scope.row.Title}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
       <!-- <el-table-column prop="Description" label="描述"></el-table-column> -->
        <el-table-column prop="OptState" label="处理状态">
          <template scope="scope">
            <el-button type="text" size="small"  v-if="scope.row.OptState  == 0" @click="Single(scope.row,$event)">未处理</el-button>
            <el-button type="text" size="small"  v-if="scope.row.OptState  == 1" @click="Single(scope.row,$event)">处理中</el-button>                                    
            <span  v-if="scope.row.OptState == 2">处理完成</span>            
          </template>
        </el-table-column>
        <el-table-column prop="OptUserName" label="处理人"></el-table-column>
        <el-table-column prop="CreateTime" label="创建时间">
            <template scope="scope">
                    <span v-if="scope.row.CreateTime != null">{{ scope.row.CreateTime.split(' ')[0] }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="CreateUserName" label="提单人"></el-table-column>        
        <el-table-column prop="ReState " label="结单状态">
        <template scope="scope">
            <el-button type="text" size="small"  v-if="scope.row.ReState  == 0" @click="Single(scope.row,$event)">未结</el-button>
            <span v-if="scope.row.ReState  == 1">结单</span>
          </template>
        </el-table-column> 
    </el-table>
    <div class="pagination-wrapper" style="text-align:center;margin:10px;">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30]" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="count"></el-pagination>
    </div>
        <el-dialog title="新建工单" v-model="showDialog" @close="resetForm('form')">
            <el-form ref="form" :model="form"  label-width="70px">
                <el-row :gutter="17">
                    <el-col :span="24">
                        <el-form-item label="标题" prop="Title" style="margin-bottom:30px">
                              <el-input v-model="form.Title"></el-input>     
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                <el-col :span="12">
                        <el-form-item label="描述" prop="Description" style="margin-bottom:30px">
                              <el-input type="textarea" v-model="form.Description"></el-input>     
                        </el-form-item>
                </el-col>
                <el-col :span="12">
                        <el-form-item label="项目" prop="ProjectType" style="margin-bottom:30px">
                            <el-select v-model="form.ProjectType" clearable>
                              <el-option v-for="item in ProjectType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col> 
                </el-row>
                <el-row>
                        <el-form-item label="截图信息" prop="Picture">
                            <UploadImageCopy :images="imageList" @onRemove="handleRemove" @onSuccess="handleSuccesss"></UploadImageCopy>
                        </el-form-item> 
                </el-row> 
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="showDialog = false">取 消</el-button>
                <el-button type="primary" @click="addSave()" :loading="!isEditable">{{isEditable?'确 定':'提交中'}}</el-button>
            </span>
        </el-dialog>
</div>
</template>
<script>
import { lssueApi } from 'api'
import UploadImageCopy from 'components/upload-image-copy'

export default {
  components: {
        UploadImageCopy
      },
  data() {
    return {
      dwzList: [],
      currentPage: 1,
      imageList:[],
      pageSize: 10,
      count: 0,
      loading: false,
      isEditable: true,
      showDialog: false,
      dialogTitle: '',
      labelPosition: 'right',
      form: {
        OptState:'',
        ProjectType:'',
        Description:"",
        Picture:"",
        Title:"",
        ID:""
      },
      form2: {
        ReState:'',
        ID:""
      },
      copyForm: {},
      filters: {
       ProjectType:"",
       Title:"",
       Description:"",
       OptState:"",
       OptUserName:"",
       CreateTime:"",
       CreateUserName:"",
       ReState:""
      },
      OptState:[
        {
          label: "未处理",
          value: 0
        },
        {
          label:"处理中",
          value: 1
        },
        {
          label:"处理完成",
          value: 2
        }
      ],
      ReState:[
        {
          label:"未结",
          value: 0
        },
        {
          label:"结单",
          value: 1
        }
      ],
      ProjectType:[
        {
          label:"酒店订单",
          value:0
        },
        {
          label:"酒店财务",
          value:1
        },
        {
          label:"其它",
          value:9
        }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    hotelsOrderSearch() {
      this.fetchData()
    },
    handleSizeChange(val) {
        this.pageSize = val
        this.fetchData(1, this.pageSize)
    },
    handleCurrentChange(val) {
        this.currentPage = val
        this.fetchData(this.currentPage)
    },
    handleRemove(index,file, fileList) {
            this.imageList.splice(index, 1)
            let f = this.imageList
            this.form.Picture = f.toString()
    },
    async handleSuccesss(response, file, fileList) {
            if (!response) {
                this.$message.error('上传失败,请重新上传')
                return false
            }
            this.imageList.push(response)
            let f = this.imageList
            this.form.Picture = f.toString()
    },
    addlss(){
        this.showDialog=true
        this.imageList = []
    },
    async downloadList(){
          const _self = this
          const options = {
            order: 'ID',
            query: { 
                OptUserName:_self.filters.OptUserName,
                Title:_self.filters.Title,
                CreateUserName:_self.filters.CreateUserName,
                ReState:_self.filters.ReState,
                ProjectType:_self.filters.ProjectType,
                'CreateTime>':_self.filters.CreateTime[0] ? new Date(_self.filters.CreateTime[0]).Format('yyyy-MM-dd') : '',
                'CreateTime<':_self.filters.CreateTime[1] ? new Date(_self.filters.CreateTime[1]).Format('yyyy-MM-dd') : '',
                OptState:_self.filters.OptState
            }
          }
         try {  
              const res = await lssueApi.downloadList(options);
              if (res.request.responseURL) {
                  window.location.href = res.request.responseURL;
                }     
            } catch (e) {
              _self.$message.error("数据下载失败!!!");
            }
       
    },
    async fetchData(currentPage,pageSize) {
      const _self = this
      _self.loading = true
      _self.currentPage = currentPage || _self.currentPage
      _self.pageSize = pageSize || _self.pageSize
      const options = {
            pageIndex: currentPage || _self.currentPage,
            pageSize: pageSize || _self.pageSize,
            order: 'ID',
            query:{
                OptUserName:_self.filters.OptUserName,
                Title:_self.filters.Title,
                CreateUserName:_self.filters.CreateUserName,
                ReState:_self.filters.ReState,
                ProjectType:_self.filters.ProjectType,
                'CreateTime>':_self.filters.CreateTime[0] ? new Date(_self.filters.CreateTime[0]).Format('yyyy-MM-dd') : '',
                'CreateTime<':_self.filters.CreateTime[1] ? new Date(_self.filters.CreateTime[1]).Format('yyyy-MM-dd') : '',
                OptState:_self.filters.OptState
            }
      }
      try {
        const res = await lssueApi.listByQuery(options)
        console.log(res)
        this.dwzList = res.data.Data
        this.count =  res.data.Count
        _self.loading = false
      } catch (e) {
        _self.loading = false
      }
    },
   async Single(row,e){
      const _self = this
      const ntext = e.target.innerText
        try{
            _self.form.ID = row.ID          
          if(ntext=="处理中"){
            _self.form.OptState = 2
            await lssueApi.states(_self.form)  
          }
          else{
            if(ntext=="未处理"){
            _self.form.OptState = 1
            await lssueApi.states(_self.form)    
          }else{
            _self.form2.ID = row.ID
            _self.form2.ReState = 1
            await lssueApi.states(_self.form2)    
          }
          }  
            this.$message({
                message: '设置成功',
                type: 'success'
            })
            this.fetchData();
        }catch(e){
            this.$message.error('设置失败!!!')
        }
    },
    async addSave() {
      const _self = this
      try {
        _self.isEditable = false
        await lssueApi.add(_self.form)
        _self.fetchData()
        _self.showDialog = false
        _self.$message({
          message: '添加成功',
          type: 'success'
        })
      } catch (e) {
        console.error(e)
        _self.$message.error('添加失败!!!')
      } finally {
        _self.isEditable = true
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
