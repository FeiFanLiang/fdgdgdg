<template lang="html">
<div id="HotelShow">
    <el-row :gutter="24">
        <el-col :span="4">
            <!-- <el-select v-model="filters.Destination" clearable placeholder="目的地">
                <el-option v-for="item in destinationOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select> -->
            <el-cascader :options="options" :show-all-levels="false" clearable></el-cascader>
        </el-col>
        <el-col :span="5">
            <el-input  placeholder="请输入酒店名称/编号" v-model="filters.Number"></el-input>
        </el-col>
        <el-col :offset="2" :span="6">
            <el-button type="primary" @click="hotelsOrderSearch(filters)">搜索</el-button>
            <el-button type="primary" @click="clickAddBtn">创建</el-button>
        </el-col>
    </el-row>
    <el-table :data="hotelShowList" border style="width: 100%" :default-sort = "{prop: 'Number', order: 'descending'}">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="Number" label="编号" sortable></el-table-column>
        <el-table-column prop="Name" label="酒店名称"></el-table-column>
        <el-table-column prop="Date" label="报价有效期"></el-table-column>
        <el-table-column prop="Star" label="星级"></el-table-column>
        <el-table-column prop="Destination" label="目的地"></el-table-column>
        <el-table-column prop="Sx" label="属性"></el-table-column>
        <el-table-column prop="Img" label="图标"></el-table-column> 
        <el-table-column label="管理">
            <template scope="scope">
                <el-button type="primary" icon="edit" size="small"  @click="clickEditBtn(scope.$index, scope.row)"></el-button>
                <el-button type="danger" icon="delete" size="small" ></el-button>
                <!-- <DeleteButton api="hotelsOrderApi" @successCallBack="fetchData" :id="scope.row.ID"></DeleteButton> --> 
            </template>
        </el-table-column>
    </el-table>
    <el-row :gutter="24" style="margin-top:20px;">
        <el-col :span="1">
            <el-button type="danger" size="small">删除</el-button>
        </el-col>
        <el-col :span="2">
            <!-- <el-button type="primary" size="small">批量操作</el-button> -->
            <el-dropdown @command="handleCommand">
                <el-button type="primary" size="small">
                    批量设置<i class="el-icon-caret-bottom el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="a">目的地</el-dropdown-item>
                    <el-dropdown-item command="b">属性</el-dropdown-item>
                    <el-dropdown-item command="c">图标</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-col>
        <el-col :offset="14" :span="6">
            <div>
                <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30]" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="count"></el-pagination>
            </div>
        </el-col>
    </el-row>
    <el-dialog :title="title" v-model="showDialog" @close="resetForm('form')">
        <el-form ref="form" :model="form" label-width="110px">
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="编号" prop="Number">
                        <el-input placeholder="请输入酒店编号" v-model="form.Number"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="酒店名称" prop="Name">
                        <el-input placeholder="请输入酒店名称" v-model="form.Name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="报价有效期" prop="Date">
                        <el-input placeholder="请输入报价有效期" v-model="form.Date"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="目的地" prop="Destination">
                        <el-input placeholder="请输入目的地" v-model="form.Destination"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="图标" prop="Img">
                        <!-- <el-input placeholder="请输入图标" v-model="form.Img"></el-input> -->
                        <el-popover ref="popover" placement="right" width="200" style="height:100px;" trigger="click">
                            <div style="height:50px;">
                                <el-button icon="star-on"></el-button>
                                <el-button icon="setting"></el-button>
                            </div>
                        </el-popover>
                        <el-button v-popover:popover>选择图标</el-button>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="属性" prop="Sx">
                        <el-input placeholder="请输入属性" v-model="form.Sx"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="星级" prop="Star">
                        <el-select v-model="form.Star" placeholder="请选择星级">
                            <el-option v-for="item in starOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitForm()" :loading="!isEditable">{{isEditable?'确 定':'提交中'}}</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
  export default {
    data() {
      return {
        currentPage: 1,
        pageSize: 10,
        count: 0,
        hotelShowList: [{
          Number: 'aaa',
          Name: 'aaa',
          Date: 'aaa',
          Star: 'aaa',
          Destination: 'aaa',
          Img: 'aaa',
          Sx:'aaa'
        },
        {
          Number: 'aaa',
          Name: 'aaa',
          Date: 'aaa',
          Star: 'aaa',
          Destination: 'aaa',
          Img: 'aaa',
          Sx:'aaa'
        },
        {
          Number: 'aaa',
          Name: 'aaa',
          Date: 'aaa',
          Star: 'aaa',
          Destination: 'aaa',
          Img: 'aaa',
          Sx:'aaa'
        }],
        destinationOptions:[
            {
                label:'全部',
                value:0
            },
            {
                label:'国内游',
                value:1
            },
            {
                label:'境外游',
                value:2
            }
        ],
        options: [{
            value: '0',
            label: '全部'
        },{
          value: '1',
          label: '国内游',
          children: [{
            value: 'a',
            label: '青岛'
          },{
            value: 'b',
            label: '济宁'
          }]
        },{
          value: '2',
          label: '境外游',
          children: [{
            value: 'aa',
            label: '巴黎'
          }]
        }],
        filters: {
            Destination:'全部',
            Number:''
        },
        form:{
            Number: '',
            Name: '',
            Date: '',
            Star: '',
            Destination: '',
            Img: '',
            Sx:''
        },
        title:'',
        showDialog:false,
        isEditable:true,
        starOptions:[{
            label:'一星级酒店',
            value:'one'
        },{
            label:'二星级酒店',
            value:'two'
        },{
            label:'三星级酒店',
            value:'three'
        },{
            label:'四星级酒店',
            value:'four'
        },{
            label:'五星级酒店',
            value:'five'
        }]
      }
    },
    methods: {
        handleSizeChange(val) {
            this.pageSize = val
            this.fetchData(1, this.pageSize)
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.fetchData(this.currentPage)
        },
        hotelsOrderSearch(){

        },
        fetch(){

        },
        clickAddBtn(){
            this.title = '添加酒店展示信息'
            this.showDialog = true
            this.form = {
                Star:''
            }
        },
        clickEditBtn($index,row){
            const _self = this
            _self.title = '酒店展示信息编辑'
            _self.showDialog = true
            _self.form.Number = row.Number
            _self.form.Name = row.Name
            _self.form.Date = row.Date
            _self.form.Star = row.Star
            _self.form.Destination = row.Destination
            _self.form.Img = row.Img
            _self.form.Sx = row.Sx
        },
        handleCommand(command) {
            this.$message('click on item ' + command);
        },
        submitForm(){
            this.isEditable = false
        },
    }
  }
</script>
