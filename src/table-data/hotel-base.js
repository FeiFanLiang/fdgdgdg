import lib from './lib'
import { hotelPayModeApi } from 'api'

const data = [
  ['酒店名称', 'HotelName', true, true, 'string'],
  ['英文名称', 'HotelName_En', true, true, 'string'],
  ['前台电话', 'FrontPhone', true, true, 'string'],
  ['地址', 'Address', true, true, 'string'],
  ['星级', 'Star.StarName', true, false, 'string'],
  ['采购人', 'Policys.PersonName', true, true, 'string'],
  ['政策负责人', 'Policys.PurchasingName', true, true, 'string'],
  ['结款', 'Policys.PayMode.ModeName', true, true, 'string']
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
