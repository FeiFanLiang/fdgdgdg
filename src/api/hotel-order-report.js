import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/HotelOrderReport/'
export default {
    // /GET /Hotel/HotelOrderDetail/DetailHotelPolicy/{orderid}
  getDetail (params) {
    return axios.post(base + 'OrderSalesReport/',params)
  }
  
}
