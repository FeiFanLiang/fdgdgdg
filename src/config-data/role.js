import lib from './lib'
import { roleApi } from 'api'

const data = [
  ['酒店ID', 'HotelID', true, false, 'string'],
  ['房间数量', 'Rooms', true, true, 'string'],
  ['楼层数', 'FloorLevelsNum', true, true, 'string'],
  ['经营时间', 'BusinessTime', true, true, 'string'],
  ['入住政策', 'CheckInPolicy', true, true, 'string'],
  ['离店', 'CheckOutPolicy', true, true, 'string'],
  ['特色标签', 'Lable', true, true, 'string']
]

const listFields = lib.trans(data)
const searchFields = {}
export default {
  getConfig () {
    return {
      listFields: listFields,
      searchFields: searchFields,
      editMethod: roleApi.edit
    }
  }
}
