import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/HotelOrderDetail/'
export default {
    // /GET /Hotel/HotelOrderDetail/DetailHotelPolicy/{orderid}
  getDetail (orderid) {
    return axios.get(base + 'DetailHotelPolicy/' + orderid)
  },
  //保存信息  POST /Hotel/HotelOrderDetail/SaveBookNote
  saveDetail (params) {
    return axios.post(base + 'SaveBookNote' ,params)
  },
}
