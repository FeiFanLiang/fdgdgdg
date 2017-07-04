// const listFields = [
//    '酒店ID',  'HotelID',  true ],
//    '房间数量',  'Rooms',  true ],
//    '楼层数',  'FloorLevelsNum',  true ],
//    '经营时间',  'BusinessTime',  true ],
//    '入住政策',  'CheckInPolicy',  true ],
//    '离店',  'CheckOutPolicy',  true ],
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
