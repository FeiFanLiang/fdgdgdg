import lib from './lib'
import { roomShowApi } from 'api'

const listData = [
  ['酒店', 'HotelID', true, true, 'string'],
  ['房间ID', 'RoomID', true, true, 'string'],
  ['房间面积', 'Acreage', true, true, 'string'],
  ['入住人数', 'CheakInNum', true, true, 'string'],
  ['楼层', 'Floor', true, true, 'string'],
  ['网络状况', 'NetWork', true, true, 'string'],
  ['无烟状况', 'Smoke', true, true, 'string'],
  ['特色标签', 'Lable', true, true, 'string']
]

const listFields = lib.transTable(listData)
const searchFields = {}
export default {
  getConfig () {
    return {
      listFields: listFields,
      searchFields: searchFields,
      editMethod: roomShowApi.edit
    }
  }
}
