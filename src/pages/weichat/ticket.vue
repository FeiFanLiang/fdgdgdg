<template>
<div id="ticket">
    <el-button type="primary" icon="plus" @click="dialogVisible = true">新建优惠券</el-button>
    <el-button @click="dialogVisible2 = true">导入已有优惠券</el-button>
    <el-table :data="tableData" border style="width: 100%;margin-top:10px;min-height:200px;">
        <el-table-column prop="type" label="卡券类型"></el-table-column>
        <el-table-column prop="name" label="卡券名称"></el-table-column>
        <el-table-column prop="indate" label="卡券有效期"></el-table-column>
        <el-table-column prop="stock " label="库存"></el-table-column>
        <el-table-column prop="tag" label="全部状态" :filter-multiple="false"
        :filters="[{ text: '审核中', value: '审核中' },{ text: '未通过', value: '未通过' },{ text: '待投放', value: '待投放' },{ text: '已投放', value: '已投放' },{ text: '违规下架', value: '违规下架' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template scope="scope">
            <el-tag
            :type="scope.row.tag === '已投放' ? 'success' : 'primary'"
            close-transition>{{scope.row.tag}}</el-tag>
        </template>
        </el-table-column>
        <el-table-column prop="date" label="操作" width="180">
            <template scope="scope">
                <el-button type="primary" size="mini" @click="clickEditBtn(scope.$index, scope.row)">编辑</el-button>
                <el-button type="danger" size="mini" @click="clickDelBtn(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-dialog title="创建优惠券" v-model="dialogVisible" size="small">
        <p>选择你要创建的卡券类型</p>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="">
                <el-radio-group v-model="form.radio">
                <el-radio class="radio" label="1"><span class="radioText1">折扣券</span><br><span class="radioText2">可为用户提供消费折扣，支持优惠抵扣快速买单</span></el-radio><br>
                <el-radio class="radio" label="2"><span class="radioText1">代金券</span><br><span class="radioText2">可为用户提供抵扣现金服务。可设置成为“满*元，减*元”，支持优惠抵扣快速买单</span></el-radio><br>
                <el-radio class="radio" label="3"><span class="radioText1">兑换券</span><br><span class="radioText2">可为用户提供消费送赠品服务</span></el-radio><br>
                <el-radio class="radio" label="4"><span class="radioText1">团购券</span><br><span class="radioText2">可为用户提供团购套餐服务</span></el-radio><br>
                <el-radio class="radio" label="5"><span class="radioText1">优惠券</span><br><span class="radioText2">即“通用券”，建议当以上四种无法满足需求时采用</span></el-radio><br>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>

    <el-dialog title="选择卡券" v-model="dialogVisible2" size="small">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <el-row :gutter="20">
                    <el-col :span="4"><span class="title">卡券类型</span></el-col>
                    <el-col :span="5"><span class="title">卡券有效期</span></el-col>
                    <el-col :span="6">
                        <el-dropdown trigger="click" @command="handleCommand">
                            <span class="el-dropdown-link">
                                {{message}}<i class="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="全部卡券">全部卡券</el-dropdown-item>
                                <el-dropdown-item command="朋友的券">朋友共享的券</el-dropdown-item>
                                <el-dropdown-item command="摇一摇">摇一摇</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-col>
                    <el-col :span="5"><span class="title">库存</span></el-col>
                    <el-col :span="4"><span class="title">卡券状态</span></el-col>
                </el-row>
            </div>
            <div style="min-height:120px;">
                <span v-if="nonePrompt" style="margin-left:46%;">暂无卡券</span>
            </div>
        </el-card>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      dialogVisible2: false,
      message: '全部卡券',
      nonePrompt: true,
      form: {
        radio: '1'
      },
      tableData: [
        {
          type: 'aaa',
          name: 'aaa',
          indate: 'aaa',
          stock: 'aaa',
          tag: '审核中'
        },
        {
          type: 'aaa',
          name: 'aaa',
          indate: 'aaa',
          stock: 'aaa',
          tag: '未通过'
        }
      ]
    }
  },
  methods: {
    filterTag(value, row) {
      return row.tag === value
    },
    clickEditBtn() {},
    clickDelBtn() {},
    handleCommand(command) {
      this.message = command
    }
  }
}
</script>
<style lang="scss">
#ticket{
    .radio{
        margin: 10px;
        margin-left: -30px;
    }
    .radioText1{
        margin-left: 5px;
    }
    .radioText2{
        margin-left: 27px;
        color:lightgrey;
    }
}
</style>
