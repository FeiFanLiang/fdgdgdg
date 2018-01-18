import lib from './lib'
import { hotelsOrderApi } from 'api'

const listData = [
  ['订单号', 'PlatOrderNo', true, false,'',''], 
  ['账户名称', 'AccountName', true, false,'','80'],
  ['订单渠道', 'ThreePlatID', true, false,'slot',''], 
  ['酒店名称', 'HotelName', true, false,'',''],
  ['入住/退房日期', 'StayDateStart', true, false,'slot',''],
  ['入住人', 'Passenger', true, false,'',''],
  ['预定时间', 'BookTime', true, false,'slot',''],
]

const searchData = [
  ['酒店名称', 'HotelName', 'input', ''], 
  ['订单号', 'PlatOrderNo', 'input', ''],
  ['入住日期', 'StayDateStart', 'date', ''],
  ['退房日期', 'StayDateEnd', 'date', ''], 
  ['预定日期', 'BookTime', 'daterange', ''],
  ['状态', 'StateCheck', 'select', ''],
]
const searchData2 = [
  ['订单号', 'PlatOrderNo', 'input', ''], 
  ['酒店名称', 'HotelName', 'input', ''],
  ['客人姓名', 'Passenger', 'input', ''],
  ['订单平台', 'ThreePlatID', 'select', ''], 
  ['入住日期', 'StayDateStart', 'date', ''],
  ['预定日期', 'BookTime', 'daterange', ''],
  ['订单渠道', 'HotelArea', 'select', ''],
  ['结款方式', 'SettlementCycle', 'select', ''],
  ['确认号', 'HotelBookingNoNeed', 'input', ''],
  ['筛选条件', 'checkList', 'select', ''],
]

const listFields = lib.transTable(listData)
const searchFields = lib.transSearch(searchData)
const searchFields2 = lib.transSearch(searchData2)
export default {
  getConfig () {
    return {
      listFields: listFields,
      searchFields: searchFields,
      searchOrderFields: searchFields2,
    }
  }
}
