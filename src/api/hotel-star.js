// 酒店星级类型查询
import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/HotelStar/'
export default {
  list (params = {}) {
    return axios.get(base, { params: params })
  }
}
