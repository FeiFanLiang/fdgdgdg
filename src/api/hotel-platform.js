import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/HotelPlatform/'

const listFields = [
  { label: '平台名称', name: 'platName', is: true },
  { label: '酒店名称', name: 'hotelName', is: true },
  { label: '平台酒店名称', name: 'platHotelName', is: true },
  { label: '平台酒店ID', name: 'platHotelId', is: true },
  { label: '平台酒店英文名', name: 'platHotelNameEn', is: true },
  { label: '备注', name: 'remark', is: true }
]
const searchFields = {}
export default {
  getConfig () {
    return { listFields, searchFields }
  },
  listByHotel (hotelid) {
    return axios.get(base + `hotel/${hotelid}`)
  },
  detail (id) {
    return axios.get(base + id)
  },
  add (params) {
    return axios.post(base, params)
  },
  del (id) {
    return axios.delete(base + id)
  },
  edit (params) {
    return axios.put(base + params.id, params)
  },

  getPlatformList (platid) {
    return axios.get(base + `plat/${platid}`)
  }
}
