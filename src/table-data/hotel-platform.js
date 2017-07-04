// const listFields = [
//    '平台名称',  'platName',  true ],
//    '酒店名称',  'hotelName',  true ],
//    '平台酒店名称',  'platHotelName',  true ],
//    '平台酒店ID',  'platHotelId',  true ],
//    '平台酒店英文名',  'platHotelNameEn',  true ],
//    '备注',  'remark',  true ]
// ]
import lib from './lib'
import { hotelPayModeApi } from 'api'

const data = [
  ['账户名称', 'ModeName', true, true, 'string'],
  ['备注', 'Remark', true, true, 'string'],
  ['ID', 'ID', true, false, 'string']
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
