import lib from './lib'
import { tripOrderApi } from 'api'

const listData = [
  ['订单名称', 'Title', true, false,'',''], 
  ['订单号', 'PlatOrderNo', true, false,'',''],
  ['订单来源', 'SourcePlatID', true, false,'slot','80'],
  ['预定时间', 'Booktime', true, false,'',''],
  ['客人姓名', 'Passenger', true, false,'',''],
  ['联系电话', 'Tel', true, false,'','']
  // ['采购单号', 'PurchaseNo', true, false,'',''], 
  // ['总收款金额', 'AmountShou', true, false,'',''],
  // ['总付款金额', 'AmountFu', true, false,'',''],
  // ['利润', 'Profit', true, false,'',''],
  //['采购平台ID', 'PurchasePlatID', true, false,'',''],
  // ['使用时间', 'UseDate', true, false,'',''],
  // ['订单类型', 'TypeID', true, false,'slot',''],
  //['图片', 'Picture', true, false,'',''],
  // ['关联的订单ID', 'HotelOrderID', true, false,'',''],
  // ['订单状态', 'OrderState', true, false,'slot',''],
  // ['付款状态', 'StateFu', true, false,'slot',''],
  // ['收款状态', 'StateShou', true, false,'slot',''],
  // ['收款到账时间', 'ShouDate', true, false,'',''],
  // ['是否忽略', 'StateIgnore', true, false,'slot',''],
  //['备注', 'Remark', true, false,'','']
]

const searchData = [
  ['订单名称', 'Title', 'input', ''],
  ['订单号', 'PlatOrderNo', 'input', ''],
  ['客人姓名', 'Passenger', 'input', ''],
  ['付款状态', 'StateFu', 'select', ''],
  ['收款状态', 'StateShou', 'select', ''],
  ['是否忽略', 'StateIgnore', 'select', '']
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
