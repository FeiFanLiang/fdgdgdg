import lib from './lib'
import { hotelsOrderApi } from 'api'

const listData = [
  ['订单编号', 'OrderNo', true, false, 'string'],
  ['酒店名称', 'Hotel', true, false, 'string'],
  ['城市', 'City', true, false, 'string'],
  ['房型', 'Room', true, false, 'string'],
  ['入住日期', 'StayDateStart', true, false, 'string'],
  ['退房日期', 'StayDateEnd', true, false, 'string'],
  ['间数', 'RoomNum', true, false, 'string'],
  ['晚数', 'NightNum', true, false, 'string'],
  ['到店时间', 'ArrivalTime', true, false, 'string'],
  ['货币', 'Currency', true, false, 'string'],
  ['总金额', 'AmountTotal', true, false, 'string'],
  /* ['实收款额', 'AmountShouldIn', true, false, 'string'],
  ['应支款额', 'AmountShouldOut', true, false, 'string'],
  ['已支付金额', 'AmountPaid', true, false, 'string'],
  ['优惠金额', 'Discounts', true, false, 'string'],
  ['其他费用', 'OherFee', true, false, 'string'],
  ['优惠金额', 'Discounts', true, false, 'string'], */
  ['订单状态', 'OrderState', true, false, 'string'],
]
const searchData = [
  ['请输入酒店名称', 'Hotel', 'input', ''],
  ['请输入城市名称', 'City', 'input', ''],
]

const listFields = lib.transTable(listData)
const searchFields = lib.transSearch(searchData)
export default {
  getConfig () {
    return {
      listFields: listFields,
      searchFields: searchFields
    }
  }
}
