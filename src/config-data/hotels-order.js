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

//暂时只对收款对账使用,其他地方暂时不使用
const searchData = [

  //> 酒店名称,订单号,客人姓名,酒店国家,城市
  //> 采购平台,销售平台,
  //> 预定日期,入住日期,退房日期,收款日期
  //> 外采/自营
  ['酒店名称', 'HotelName', 'input', ''],
  ['订单号', 'PlatOrderNo', 'input', ''],
  ['客人姓名', 'Passenger', 'input', ''],

  ['入住日期', 'StayDateStart', 'date', ''],
  ['退房日期', 'StayDateEnd', 'date', ''],
  ['预定日期', 'BookTime', 'daterange', ''],
  ['收款日期', 'ExpectSettlement', 'daterange', ''],

  ['销售平台', 'PlatPolicyID', 'select', ''],
  //['采购平台', 'PlatPolicyID', 'select', ''],
  ['打款账户', 'CompanyAcount', 'select', ''],
  ['收款状态', 'StateCheck', 'select', ''],
]

const searchData2 = [
  ['订单号', 'PlatOrderNo', 'input', ''],
  ['酒店名称', 'HotelName', 'input', ''],
  ['客人姓名', 'Passenger', 'input', ''],
  // ['订单平台', 'ThreePlatID', 'select', ''],
  ['订单平台', 'PlatPolicyID', 'select', ''],
  
  ['入住日期', 'StayDateStart', 'date', ''],
  ['预定日期', 'BookTime', 'daterange', ''],
  ['人工处理状态', 'HandState', 'select', ''],
  ['外采订单号', 'WaiCaiNo', 'input', ''],     
  ['订单类别', 'OrderType', 'select', ''],
  ['外采渠道', 'WaiCaiPlatID', 'select', ''],  
  ['采购方式', 'WaiCaiFlag', 'select', ''],  
  ['订单状态', 'OrderState', 'select', ''],
  ['付款周期', 'SettlementCycleFu', 'select', ''], 
  
  ['确认号', 'HotelBookingNo', 'input', ''],
  ['回填日期', 'BackfillTime', 'daterange', ''],     
  ['回填人', 'BackfillUserName', 'select', ''],  
  ['审核日期', 'AuditorTime', 'daterange', ''],     
  
  ['筛选条件', 'checkList', 'select', ''],
  
]
const searchData3 = [
  ['酒店名称', 'HotelName', 'input', ''],
  ['订单号', 'PlatOrderNo', 'input', ''],
  ['客人姓名', 'Passenger', 'input', ''],
  ['入住日期', 'StayDateStart', 'date', ''],
  ['退房日期', 'StayDateEnd', 'date', ''],
  ['预定日期', 'BookTime', 'daterange', ''],
  ['销售平台', 'PlatPolicyID', 'select', ''],
  ['打款账户', 'CompanyAcount', 'select', ''],
  ['收款状态', 'StateCheck', 'select', ''],
]

const listFields = lib.transTable(listData)
const searchFields = lib.transSearch(searchData)
const searchFields2 = lib.transSearch(searchData2)
const searchFields3 = lib.transSearch(searchData3)
export default {
  getConfig () {
    return {
      listFields: listFields,
      searchFields: searchFields,
      searchFields2: searchFields3,                
      searchOrderFields: searchFields2,
    }
  }
}
