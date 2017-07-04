import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/RoomShow/'

const listFields = [
  { label: '酒店', name: 'HotelID', is: true },
  { label: '房间ID', name: 'RoomID', is: true },
  { label: '房间面积', name: 'Acreage', is: true },
  { label: '入住人数', name: 'CheakInNum', is: true },
  { label: '楼层', name: 'Floor', is: true },
  { label: '网络状况', name: 'NetWork', is: true },
  { label: '无烟状况', name: 'Smoke', is: true },
  { label: '特色标签', name: 'Lable', is: true }
]
const searchFields = {}
export default {
  getConfig () {
    return { listFields, searchFields }
  },
  detailByRoomshowID (RoomshowID) {
    return axios.get(base + RoomshowID)
  },
  detailByRoomID (roomID) {
    return axios.get(base + `Room/${roomID}`)
  },
  add (params) {
    return axios.post(base, params)
  },
  edit (params) {
    return axios.put(base, params)
  },
  del (roomID) {
    return axios.delete(base + roomID)
  }
}
