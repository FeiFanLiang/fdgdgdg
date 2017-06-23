import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/HotelRoom/'
export default {
  list (pid) {
    // 根据酒店id获取房间列表
    return axios.get(base + `Hotel/${pid}`)
  },
  details (id) {
    // 根据房间id获取详情
    return axios.get(base + id)
  },
  add (params) {
    return axios.post(base, params)
  },
  del (id) {
    return axios.delete(base + id)
  },
  edit (id, params) {
    return axios.put(base + id, params)
  }
}
