<template lang="html">
<div id="Verification">
    <h1>手机核销</h1>
    <div class="block">
        <p style="margin:10px 0 10px 0;">核销员权限管理</p>
        <el-input placeholder="请输入核销员名，备注名" v-model="input" style="width:30%">
            <el-button slot="append" icon="search"></el-button>
        </el-input>
        <el-button type="primary" icon="plus" style="margin-top:10px;float:right;" @click="dialogVisible = true">添加核销员</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%;margin-top:20px;min-height:200px;">
        <el-table-column prop="verifier" label="核销员"></el-table-column>
        <el-table-column prop="tag" :label="selectPlace" :filter-multiple="false"
        :filters="[{ text: '全部门店', value: '全部门店' },{ text: '良辰美景', value: '良辰美景' }]"
        :filter-method="filterTag"
        filter-placement="bottom-start">
        <template scope="scope">
            <el-tag
            :type="scope.row.tag === '全部门店' ? 'success' : 'primary'"
            close-transition>{{scope.row.tag}}</el-tag>
        </template>
        </el-table-column>
        <el-table-column prop="limits" label="权限"></el-table-column>
        <el-table-column prop="date" label="操作" width="180">
            <template scope="scope">
                <el-button type="primary" size="small">编辑</el-button>
                <!--<el-button type="danger" size="mini">删除</el-button>-->
                <DeleteButton :id="scope.row.ID"></DeleteButton>
            </template>
        </el-table-column>
    </el-table>
</div>
</template>
<script>
export default {
  data() {
      return {
        input:'',
        tableData:[{
            tag:'全部门店'
        }],
        dialogVisible:false,
        selectPlace:'全部门店'
      }
  },
  methods: {
      filterTag(value, row) {
            this.selectPlace = value;
            if (value === '全部门店') return true
            return row.tag === value
      },
  }
}
</script>
<style lang="scss">
#Verification{

}
</style>


