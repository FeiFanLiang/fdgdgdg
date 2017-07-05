import lib from './lib'
import { hotelPayModeApi } from 'api'

const data = [
  ['平台名称', 'platName', true, true, 'string'],
  ['酒店名称', 'hotelName', true, true, 'string'],
  ['平台酒店名称', 'platHotelName', true, true, 'string'],
  ['平台酒店ID', 'platHotelId', true, true, 'string'],
  ['平台酒店英文名', 'platHotelNameEn', true, true, 'string'],
  ['备注', 'remark', true, true, 'string']
]

const listFields = lib.trans(data)
const searchFields = {}
export default {
  getConfig () {
    return {
      listFields: listFields,
      searchFields: searchFields,
      editMethod: hotelPayModeApi.edit
    }
  }
}
