<template lang="html">
  <div class="l-workspace-body m-price">
      <div class="" avalonctrl="toolbar">
          <div class="l-bar w960">
              <div class="left">
                  <div class="l-bar-item">
                      <div class="m-price-legend m-roomcontrol-legend">
                          <dl class="item">
                              <dt class="close"></dt>
                              <dd>关房</dd>
                          </dl>
                          <dl class="item">
                              <dt class="normal" @click=""><span class="oversale"><i class="ui-icon"></i></span></dt>
                              <dd>允许超售</dd>
                          </dl>
                          <dl class="item">
                              <dt class="disable"></dt>
                              <dd>不可售</dd>
                          </dl>
                      </div>
                  </div>
                  <div class="l-bar-item">
                      <!-- <div class="l-bar-label w70">状态</div> -->
                      <div class="oni-dropdown" tabindex="0">
                        <el-dropdown trigger="click" @command="handleCommand">
                          <span class="el-dropdown-link">{{stateText}}
                            <i class="el-icon-caret-bottom el-icon--right"></i>
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="全部">全部</el-dropdown-item>
                            <el-dropdown-item command="有效">有效</el-dropdown-item>
                            <el-dropdown-item command="无效">无效</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </div>
                  </div>
              </div>
              <div class="right"></div>
          </div>
        <div class="l-bar w960">
            <div class="left">
                <div class="l-bar-item">
                      <el-dropdown trigger="click" >
                        <el-button type="primary">批量修改价格
                          <i class="el-icon-caret-bottom el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="批量修改售卖价">批量修改售卖价</el-dropdown-item>
                          <el-dropdown-item command="批量修改采购价">批量修改采购价</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                  </div>
                  <!-- 渠道 -->
                  <!-- 渠道dropdown -->
                <div class="l-bar-item">
                    <el-dropdown trigger="click" >
                      <el-button type="primary">售卖价
                        <i class="el-icon-caret-bottom el-icon--right"></i>
                      </el-button>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="售卖价" disabled>售卖价</el-dropdown-item>
                        <el-dropdown-item command="售卖价" class="smalltext" divided>售卖价</el-dropdown-item>
                        <el-dropdown-item command="渠道价" disabled>渠道价</el-dropdown-item>
                        <el-dropdown-item command="渠道价B" class="smalltext" divided>渠道价B</el-dropdown-item>
                        <el-dropdown-item command="渠道价C" class="smalltext">渠道价C</el-dropdown-item>
                        <el-dropdown-item command="采购价" disabled>采购价</el-dropdown-item>
                        <el-dropdown-item command="采购价" class="smalltext" divided>采购价</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>

                  <!-- 分销商 -->
                  <!-- 分销商dropdown -->
                <div class="l-bar-item" style="display: none;">
                      <div class="l-bar-label">分销商</div>
                      <div class="oni-dropdown" tabindex="0" style="width: 200px;">
                      <div class="oni-dropdown-source">
                          <div class="oni-dropdown-input" id="title-disGroup" title="" style="width: 176px;">aa</div>
                          <div class="oni-dropdown-icon-wrap">
                              <i class="oni-dropdown-icon oni-icon oni-icon-angle-up" style="display: none;"></i>
                              <i class="oni-dropdown-icon oni-icon oni-icon-angle-down"></i>
                          </div>
                      </div>
                      <select avalonctrl="disGroup" multiple="false" size="1" style="display: none;"> </select>
                    </div>
                  </div>
            </div>
            <div class="right">
                  <!-- 展示方式，按周展示，按月展示 -->
                <div class="mydate">
                   <el-dropdown trigger="click">
                      <span class="el-dropdown-link">按周显示
                        <i class="el-icon-caret-bottom el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="按周显示">按周显示</el-dropdown-item>
                        <el-dropdown-item command="按月显示">按月显示</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <el-button type="primary" icon="arrow-left">前一周</el-button>
                <el-date-picker class="mydate"
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions0">
                </el-date-picker>
                <el-button type="primary">后一周<i class="el-icon-arrow-right el-icon--right"></i></el-button>
            </div>
          </div>
      </div>
      <div class="l-section w960">
          <div class="ui-table ui-table-bordered m-price-sheet" avalonctrl="calendar">
            <div class="ui-table-header">
                <table>
                    <tbody>
                    <tr class="ui-table-dark">
                        <th class="ui-table-col-left">房型/可用房型名称</th>
                        <th class="ui-table-col-center w80">周日</th>
                        <th class="ui-table-col-center w80">周一</th>
                        <th class="ui-table-col-center w80">周二</th>
                        <th class="ui-table-col-center w80">周三</th>
                        <th class="ui-table-col-center w80">周四</th>
                        <th class="ui-table-col-center w80 red">周五</th>
                        <th class="ui-table-col-center w80 red">周六</th>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="ui-table-body m-roomcontrol-sheet">
                <table>
                    <tbody>
                        <!-- 房型tr -->
                        <tr>
                            <td style="background: #f8f8f8;border-right-color: #f8f8f8;border-top:2px solid #2eb5e7;" colspan="9">
                                <span class="expander">
                                    <i class="ui-icon"></i>标准房
                                </span>

                            </td>
                        </tr>
                        <!-- 产品tr -->
                        <tr>
                            <!-- 产品名称 -->
                            <td class="ui-table-col-left" colspan="1" rowspan="6">
                                <div style="margin-left: 30px;">
                                    标准房-预付无早（双床双人入住）
                                    <span class="gray" style="display: none;">(无效)</span>
                                </div>
                            </td>
                            <td class="listp">
                              <div class="listc ui-table-col-center w80 current disable" v-for="a in list">
                                  <div class="dayname">{{a.date}}</div>
                                  <div class="price">CNY{{a.CNY}}</div>
                                  <div class="remain">余{{a.odd}}</div>
                              </div>

                            </td>

                        </tr>
                    </tbody>
                    <tbody>
                        <!-- 房型tr -->
                        <tr>
                            <td style="background: #f8f8f8;border-right-color: #f8f8f8;border-top:2px solid #2eb5e7;" colspan="9">
                                <span class="expander">
                                    <i class="ui-icon">
                                    </i>
                                    单人房
                                </span>
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <!-- 房型tr -->
                        <!-- 产品tr -->
                    </tbody>
                </table>
            </div>
          </div>
        </div>
      <div class="l-secction w960">无效：表示该产品不可售卖</div>
      <div class="ui-contextmenu hide w80" id="popuppanel" avalonctrl="gridPopupController">
        <div class="ui-contextmenu-set w130">
            <ul>
                <li class="ui-contextmenu-item" style="display: none;">
                    <a href="javascript:void(0);" class="ui-contextmenu-handler">开房</a></li>
                <li class="ui-contextmenu-item">
                    <a href="javascript:void(0);" class="ui-contextmenu-handler">关房</a></li>
                <li class="ui-contextmenu-divider"></li>
            </ul>
            <!-- <ul>
                <li class="ui-contextmenu-item"
                    ms-click="productControl" ms-visible="type == 'PRODUCT'">
                    <a href="javascript:void(0);" class="ui-contextmenu-handler">设置最大可售量</a></li>
                <li class="ui-contextmenu-item" ms-if='true'
                    ms-click="roomControl" ms-visible="type == 'ROOM'">
                    <a href="javascript:void(0);" class="ui-contextmenu-handler">修改房量</a></li>
                <li class="ui-contextmenu-item" ms-if='false'
                    ms-click="channelControl" ms-visible="type == 'ROOM' && hasChannel">
                    <a href="javascript:void(0);" class="ui-contextmenu-handler">渠道管理</a></li>
            </ul> -->
        </div>
      </div>
  </div>
</template>

<script>
import Mock from 'mockjs';

export default {
    data() {
        return {
            list: [],
            stateText: '全部',
            value1: ''
        };
    },

    methods: {
        async fetchData() {
            let total = 10;
            let count = 1;
            for (let i = 0; i < total; i++) {
                this.list.push(
                    Mock.mock({
                        date: `04-${count++}`,
                        'CNY|1000-3000': 1,
                        'odd|1-10': 1
                    })
                );
            }
            console.log(this.list)
        },
        handleCommand(command) {
            this.stateText = command
        },
        pickerOptions0: {
            disabledDate(time) {
                return time.getTime() < Date.now() - 8.64e7;
            }
        }
    },
    mounted() {
        this.fetchData();
    }
};
</script>

<style lang="css">
.smalltext{
    font-size: 10px;
}
.mydate{
    display: inline-block;
    margin: 0px 10px;
}
.listp{
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    padding: 0px !important;
}
.listc{
    box-sizing: border-box;
    -ms-flex: 0 0 14.28%;
    flex: 0 0 14.28%;
    border-right: 1px solid silver;
    border-bottom: 1px solid silver;
    text-align: center;
    height: 85px;
    padding-top: 10px;
    line-height: 20px;
    font-size: 10px;
}
html{background:#fff none;color:#333;font:normal 12px/1.5 tahoma,arial,"hiragino sans gb",simsun,sans-serif;-moz-font-feature-settings:"liga","kern";-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}
body,dd,dl,form,p,pre{margin:0}
table{border-collapse:collapse;border-spacing:0}
ol,ul{list-style:none;margin:0;padding:0}
em,i{font-style:normal}
.block{display:block}
.inline{display:inline}
.inlineblock{display:inline-block;*display:inline;vertical-align:middle;*zoom:1}
.left{display:inline;float:left}
.right{display:inline;float:right}
.w960{width:960px}

.ui-table table{width:100%}
.ui-table td,.ui-table th{border-bottom:1px solid #ececec;font-weight:400;padding:11px 5px}
.ui-table th{color:#9e9e9e;cursor:default}

.ui-table-dark th{background-color:#353a47;border-bottom:0 none;color:#fff}

.ui-table-bordered table,.ui-table-bordered td,.ui-table-bordered th{border:1px solid #ececec}
.ui-table-bordered .ui-table-header{margin-bottom:-1px}
.ui-table-bordered .ui-table-dark th{border:1px solid #353a47}
.ui-table-bordered .ui-table-child .ui-table{margin:0 -1px;position:relative;top:-1px}

.l-bar{zoom:1;font-size:0;margin-bottom:20px}
.l-bar:after{clear:both;content:"\0020";display:block;height:0;overflow:hidden}
.l-bar-item{display:inline-block;*display:inline;vertical-align:middle;*zoom:1;font-size:12px;margin-right:5px}

.l-bar-label{display:inline-block;*display:inline;vertical-align:middle;*zoom:1;margin-right:1px;*margin-right:5px;text-align:right;white-space:nowrap}

.m-roomcontrol-legend{zoom:1}
.m-roomcontrol-legend:after{clear:both;content:"\0020";display:block;height:0;overflow:hidden}
.m-roomcontrol-legend .item{display:inline;float:left;margin-right:15px}
.m-roomcontrol-legend dt{display:inline;float:left;margin:1px 3px 0 0;background-color:#fff;border:1px solid #e1e1e1;height:14px;overflow:hidden;text-align:center;width:14px}
.m-roomcontrol-legend dt.close{background-color:#ff7474;border-color:#ff7474}

.m-roomcontrol-legend dt.disable{background-color:#e0e0e0;border-color:#e0e0e0}

.m-roomcontrol-legend dd{display:inline;float:left}
.m-roomcontrol-legend .oversale{color:#52be7f}
.m-roomcontrol-legend .oversale .ui-icon{font-size:12px;position:relative;top:-2px}

.m-roomcontrol-sheet .disable{background-color:#e0e0e0}

.m-sysbar .userinfo .lang{display:inline;float:left;border-left:1px solid #e0e0e0;padding-left:20px}
.m-sysbar .userinfo .info{display:inline;float:left;border-left:1px solid #e0e0e0;margin-left:20px}


</style>
