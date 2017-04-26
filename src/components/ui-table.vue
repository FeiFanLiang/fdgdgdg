<template lang="html">
  <div class="ui-table sheet">
              <div class="ui-table-header">
                  <table>
                      <tbody>
                      <tr>
                          <th class="ui-table-col-left w150">
                              <input type="checkbox" class="checkbox"> 房型名称
                          </th>
                          <th class="ui-table-col-left w150">
                              <input type="checkbox" class="checkbox"> 产品名称
                          </th>
                          <th class="ui-table-col-center w50">早餐</th>
                          <th class="ui-table-col-center w80">支付方式</th>
                          <th class="ui-table-col-center w250">退款规则</th>
                          <th class="ui-table-col-center w250">生效规则</th>
                          <th class="ui-table-col-center w80">状态</th>
                          <th class="ui-table-col-center w80"> 操作
                          </th>
                      </tr>
                      </tbody>
                  </table>
              </div>
              <div class="ui-table-body">
                  <table>
                      <tbody>
                        <tr v-for="n in 6">
                          <td class="ui-table-col-left w150" rowspan="2" v-if="n%2 !==0">
                              <input type="checkbox" class="checkbox" value="2536469">
                              单人间
                          </td>
                          <td class="ui-table-col-left w150">
                              <input type="checkbox" class="checkbox" value="3693326">
                              <!-- 当点击一个ruleName的时候，批量设置规则 batchEdit -->
                                  <a href="javascript: void 0">预付无早
                                      <i class="ui-icon" title="批量编辑同名称产品"></i>
                                  </a>
                          </td>
                          <td class="ui-table-col-center w50">无早</td>
                          <td class="ui-table-col-center w80">预付</td>
                          <td class="ui-table-col-center w250">不可退改
                          </td>
                          <td class="ui-table-col-center w250"> 仅07:00:00到当日23:00:00可售 需提前7天22:00:00之前可订</td>
                          <td class="ui-table-col-center w80">
                              <i class="ui-icon green"></i>
                            </td>
                          <td class="ui-table-col-center w80">
                              <a href="/web/hotel/modifyProduction?hotelId=1054691&amp;productId=3693326" data-auth-uri="/product/api/product/edit">编辑</a>
                          </td>
                      </tr>
                      </tbody>
                  </table>
              </div>
          </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
.w10{width:10px}
.w20{width:20px}
.w30{width:30px}
.w40{width:40px}
.w50{width:50px}
.w60{width:60px}
.w70{width:70px}
.w80{width:80px}
.w90{width:90px}
.w100{width:100px}
.w110{width:110px}
.w120{width:120px}
.w130{width:130px}
.w140{width:140px}
.w150{width:150px}
.w160{width:160px}
.w170{width:170px}
.w180{width:180px}
.w190{width:190px}
.w200{width:200px}
.w210{width:210px}
.w220{width:220px}
.w230{width:230px}
.w240{width:240px}
.w250{width:250px}
.w260{width:260px}
.w270{width:270px}
.w280{width:280px}
.w290{width:290px}
.w300{width:300px}
.w310{width:310px}
.w320{width:320px}
.w330{width:330px}
.w340{width:340px}
.w350{width:350px}
.w360{width:360px}
.w370{width:370px}
.w380{width:380px}
.w390{width:390px}
.w400{width:400px}
.w450{width:450px}
.w500{width:500px}
.w550{width:550px}
.w600{width:600px}
.w650{width:650px}
.w700{width:700px}
.w750{width:750px}
.w800{width:800px}
.w480{width:480px}
.w640{width:640px}
.w720{width:720px}
.w960{width:960px}
.w1000{width:1000px}
.w1200{width:1200px}
.ui-table-col-center{text-align:center}
.ui-table-col-left{text-align:left}
.ui-table-col-right{text-align:right}
</style>
