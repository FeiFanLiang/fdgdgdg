import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/HotelShow/'

const listFields = [
  { label: '酒店ID', name: 'HotelID', is: true },
  { label: '房间数量', name: 'Rooms', is: true },
  { label: '楼层数', name: 'FloorLevelsNum', is: true },
  { label: '经营时间', name: 'BusinessTime', is: true },
  { label: '入住政策', name: 'CheckInPolicy', is: true },
  { label: '离店', name: 'CheckOutPolicy', is: true },
  { label: '特色标签', name: 'Lable', is: true }
]
const searchFields = {}
export default {
  getConfig () {
    return { listFields, searchFields }
  },
  list () {
    return axios.get(base)
  },
  detail (HotelshowID) {
    return axios.get(base + HotelshowID)
  },
  add (params) {
    return axios.post(base, params)
  },
  edit (params) {
    return axios.put(base, params)
  },
  del (hotelID) {
    return axios.delete(base + hotelID)
  }
}
