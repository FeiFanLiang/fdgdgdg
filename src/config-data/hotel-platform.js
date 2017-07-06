import lib from './lib'
import { hotelPlatformApi } from 'api'

const listData = [
  ['平台名称', 'platName', true, true, 'string'],
  ['酒店名称', 'hotelName', true, true, 'string'],
  ['平台酒店名称', 'platHotelName', true, true, 'string'],
  ['平台酒店ID', 'platHotelId', true, true, 'string'],
  ['平台酒店英文名', 'platHotelNameEn', true, true, 'string'],
  ['备注', 'remark', true, true, 'string']
]

const listFields = lib.transTable(listData)
const searchFields = {}
export default {
  getConfig () {
    return {
      listFields: listFields,
      searchFields: searchFields,
      editMethod: hotelPlatformApi.edit
    }
  }
}
