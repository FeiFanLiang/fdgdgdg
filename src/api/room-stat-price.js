import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/RoomStatPrice/'
export default {
  getSonRoomList (hotelID) {
    return axios.get(base + `GetSonRoomList?hotelID=${hotelID}`)
  },
  getPriceList (params) {
    return axios.post(base + 'GetPriceList', params)
  },
  updateRoomPurchasePrice(params){
    return axios.post(base + 'UpdateRoomPurchasePrice', params)
  }
}
