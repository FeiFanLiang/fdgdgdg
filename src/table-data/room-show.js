// const listFields = [
//    '酒店',  'HotelID',  true ],
//    '房间ID',  'RoomID',  true ],
//    '房间面积',  'Acreage',  true ],
//    '入住人数',  'CheakInNum',  true ],
//    '楼层',  'Floor',  true ],
//    '网络状况',  'NetWork',  true ],
//    '无烟状况',  'Smoke',  true ],
//    '特色标签',  'Lable',  true ]
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
