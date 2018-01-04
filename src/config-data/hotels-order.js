import lib from './lib'
import { hotelsOrderApi } from 'api'

const searchData = [
  ['酒店名称', 'HotelName', 'input', ''], 
  ['订单号', 'PlatOrderNo', 'input', ''],
  ['入住日期', 'StayDateStart', 'date', ''],
  ['退房日期', 'StayDateEnd', 'date', ''], 
  ['预定日期', 'BookTime', 'daterange', ''],
]
const searchData2 = [
  ['订单编号', 'OrderNo', 'input', ''], 
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

const searchFields = lib.transSearch(searchData)
const searchFields2 = lib.transSearch(searchData2)
export default {
  getConfig () {
    return {
      searchFields: searchFields,
      searchOrderFields: searchFields2,
    }
  }
}
