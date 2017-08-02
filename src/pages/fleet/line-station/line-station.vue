<template lang="html">
<div id="lineStation">
    <el-row :gutter="20">
        <el-col :span="3">
            <el-select v-model="filters.labelVal"  placeholder="请选择">
                <el-option
                    v-for="(item,index) in selectedOptions"
                    :label="item.label"
                    :value="item.value"
                    :key="index">
                </el-option>
            </el-select>
        </el-col>
        <el-col :span="3">
            <el-select v-model="filters.CarLineID" filterable clearable placeholder="请选择路线名称" v-show="filters.labelVal == '1'">
                <el-option v-for="(item,index) in carlineList" :key="index" :label="item.Name" :value="item.ID"></el-option>
            </el-select>
            <el-select v-model="filters.StationID" filterable clearable placeholder="请选择站点名称" v-show="filters.labelVal == '2'">
                <el-option v-for="(item,index) in stationList" :key="index" :label="item.Name" :value="item.ID"></el-option>
            </el-select>
        </el-col>
        <el-col :span="5">
            <el-button type="primary" @click="carlineStationSearch(filters)">搜索</el-button>
            <el-button type="primary" @click="clickAddBtn">
                创建
            </el-button>
        </el-col>
    </el-row>
    
     <el-table :data="list" ref="table" style="width: 100%;" element-loading-text="拼命加载中" v-loading="loading" border >
      <el-table-column prop="CarLineName" label="路线名称" show-overflow-tooltip width="150" fixed></el-table-column> 
      <el-table-column label="站点名称"  fit>
         <template scope="scope" >
             <div style="width:100%;overflow:auto;">
            <tr style="overflow:auto">
                <td v-for="(item,index) in scope.row.Stations" :key="index" style="border:none;" id="td">
                    <el-button type="text" @click="clickEditBtn(scope.row,item.StationID,item.ID,item.Order,item.name)">
                        {{item.name}}
                    </el-button>
                    <i class="el-icon-delete" style="margin:5px;" @click="del(item.ID)"></i>
                </td>
            </tr>
            </div>
          </template>
      </el-table-column>
    </el-table>
    
    <el-dialog :title="dialogTitle" v-model="showAddDialog" size="tiny" @close="resetForm('form')">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="路线名称" prop="CarLineID">
            <el-select v-model="form.CarLineID" placeholder="请选择路线名称" style="width:70%" @change="carlineChange" id="mySelect">
                <el-option v-for="(item,index) in carlineList" :key="index" :label="item.Name" :value="item.ID"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="站点名称" prop="StationID">
            <el-select v-model="form.StationID" clearable placeholder="请选择站点名称" style="width:70%" @visible-change="stationChange" :disabled="stationDisable">
                <el-option v-for="(item,index) in stationList" :key="index" :label="item.Name" :value="item.ID"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="站点次序" prop="Order">
            <el-input type="number" placeholder="请输入第几站" v-model="form.Order" style="width:70%" auto-complete="off"></el-input>
        </el-form-item> 
        <p style="color:lightgrey">{{addMessage}}</p>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showAddDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitForm()">确 定</el-button>
      </span>
    </el-dialog>
</div>  
</template>
<script>
import { carLineApi, stationApi, lineStationApi } from 'api'
export default {
  data() {
      var validateOrder = async (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入站点序列'));
        } else {
          const options = {
            pageSize: 100,
            query:{
                CarLineID:this.form.ID
            }
          }
          const res = await lineStationApi.listByQuery(options);
          let order = [];
          order = res.data.Data; 
          console.log(this.form.CarLineID)
          if(this.form.CarLineID !='') {
            for(let i in order){
                if(this.form.Order==order[i].Order){
                    callback(new Error('站点序列重复'));
                }
            }
          }
          callback();
        }
      };
      return {
        stationDisable:false,
        addEdit:'',
        addMessage:'',
        copyStationList:[],
        copyForm:{},
        carlineList:[],
        stationList:[],
        filters: {
            CarLineID:'',
            StationID:'',
            labelVal: '1'
        },
        selectedOptions: [
            {
            value: '1',
            label: '路线名称'
            },
            {
            value: '2',
            label: '站点名称'
            }
        ],
        list:[],
        loading:false,
        form: {
            CarLineID:'',
            StationID:'',
            Order:0
        },
        showAddDialog:false,
        showEditDialog:false,
        dialogTitle:'',
        rules:{
            Order: [
                { validator: validateOrder, trigger: 'blur' }
            ]
        }
      }
  },
  methods: {
      async fetchData() {
         const _self = this
         _self.loading = true
         const options = {
            pageSize: 100,
            order: 'ID',
            query: {
                CarLineID: _self.filters.labelVal === '1' ? _self.filters.CarLineID : '',
                StationID: _self.filters.labelVal === '2' ? _self.filters.StationID : ''
            }
         }
         try { 
          const res = await lineStationApi.listByQuery(options);
          var arr = res.data.Data;
          let unlineStation = await this.unRepeat(arr);
          this.list = unlineStation;
          _self.loading = false
        } catch (e) {
          console.error(e)
          _self.loading = false
        }
      },
      async unRepeat(arr){
          var map = {},
              dest = [],
              stationName = '',
              carlineName = '';
              var station = await this.getStationList();
              var carline = await this.getCarlineList();

          for(var i = 0; i < arr.length; i++){
              var ai = arr[i];
               for(let a in station){
                  if(ai.StationID == station[a].ID){
                      stationName = station[a].Name;
                  }
              }
              for(let b in carline){
                  if(ai.CarLineID == carline[b].ID){
                      carlineName = carline[b].Name;
                  }
              } 
              if(!map[ai.CarLineID]){
                  dest.push({
                      CarLineID: ai.CarLineID,
                      CarLineName:carlineName,
                      EndTime: ai.EndTime,
                      Stations: [{ID:ai.ID,name:'第'+ai.Order+'站:'+stationName,StationID:ai.StationID,Order:ai.Order}]
                  });
                  map[ai.CarLineID] = ai;
              }else{
                  for(var j = 0; j < dest.length; j++){
                      var dj = dest[j];
                      if(dj.CarLineID == ai.CarLineID){
                          dj.Stations.push({ID:ai.ID,name:'第'+ai.Order+'站:'+stationName,StationID:ai.StationID,Order:ai.Order});
                          break;
                      }
                  }
              }
          }
          return dest;
      },
      carlineStationSearch(filters){
        this.filters = filters
        this.fetchData()
      },
      async clickAddBtn(){
        const _self = this
        _self.dialogTitle='添加路线/站点映射'
        _self.addMessage='注：先添加路线再添加站点！'
        _self.showAddDialog = true
        _self.form = {
            CarLineID:'',
            StationID:'',
            Order:0
        }
        this.addEdit = 'add';
        this.stationDisable = true;
      },
      async clickEditBtn(row,StationID,ID,Order,name){
        const _self = this
        _self.dialogTitle='编辑路线/站点映射'
        try {
            _self.form.ID = ID
            _self.form.CarLineID = row.CarLineID
            _self.form.StationID = StationID
            _self.form.Order = Order
            _self.showAddDialog = true
            this.addEdit = 'edit'
        } catch (e) {
            console.error(e)
        }
      },
      submitForm(){
        const _self = this
         if (_self.form.ID) {
            _self.editSave()
        } else { 
            _self.addSave()
        }
      },
      async addSave() {
        const _self = this
         _self.$refs['form'].validate(async valid => {
            if (valid) { 
            try {
                await lineStationApi.add(_self.form)
                _self.fetchData()
                _self.$refs['form'].resetFields()
                _self.showAddDialog = false
                _self.$message({
                message: '保存成功',
                type: 'success'
                })
            } catch (e) {
                console.error(e)
                _self.$message.error('添加失败!!!')
            }
             } else {
            return false
            }
        }) 
      },
      async editSave() {
            const _self = this
            _self.$refs['form'].validate(async valid => {
                 const form = {}
                for (let [k, v] of Object.entries(_self.form)) {
                    if (_self.form[k] != _self.copyForm[k]) {
                        if(_self.form[k].disabled){
                            _self.form[k]='';
                        }
                    form[k] = v
                    }
                } 
                if (valid) {
                try {

                    await lineStationApi.edit(_self.form.ID,form)
                    _self.$refs['form'].resetFields()
                    _self.showAddDialog = false
                    _self.fetchData()
                    _self.$message({
                    message: '编辑成功',
                    type: 'success'
                    })
                } catch (e) {
                    console.error(e)
                    _self.$message.error('编辑失败!!!')
                }
                } else {
                return false
                }
            })
      },
      async del(id){
            const _self = this;
            _self.$confirm('是否删除此条信息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async() => {
                try {
                    await lineStationApi.del(id);
                    _self.fetchData();
                    _self.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                } catch (e) {
                    console.error(e);
                }
            }).catch(() => {});
      },
      async getStationList(){
          const res = await stationApi.listByQuery();
          var stationData = res.data.Data;
          return stationData;
      },
      async getCarlineList(){
          const res = await carLineApi.listByQuery();
          var carlineData = res.data.Data;
          return carlineData;
      },
      async getSelectData(){
          const _self = this;
          _self.carlineList = await _self.getCarlineList(); 
          _self.stationList = await _self.getStationList();
      },
       async carlineChange(value){
           this.stationDisable = false;
          const options = {
            pageSize: 100,
          }
          const res = await lineStationApi.listByQuery(options);
          let a = res.data.Data
          if(this.addEdit == 'add' && this.form.CarLineID == ''){
              this.form.StationID = ''
          }
          this.stationList = await this.getStationList();
          this.copyStationList = this.stationList
          for(let i in a){
            if(value == a[i].CarLineID){
                for(let j=0;j<this.copyStationList.length;j++){
                    if(a[i].StationID == this.copyStationList[j].ID){
                        this.copyStationList.splice(j,1)
                    }
                }
            }
          }
      }, 
      async stationChange(a){
          if(a==true){
              if(this.addEdit == 'edit'){
                this.carlineChange(this.form.CarLineID)
              }
              this.stationList = this.copyStationList;
          }
      },
      
  },
   created() {
    this.fetchData();
    this.getSelectData();
  }
}
</script>
 <style lang="scss">
#lineStation{
    #td:hover{
        background-color: #dfe6ec;
    }
}
</style>
 
