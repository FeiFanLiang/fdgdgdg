import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/RoomStatPrice/'
export default {
  GetSonRoomList (hotelID) {
    return axios.get(base + `GetSonRoomList?hotelID=${hotelID}`)
  },
  getPriceList (params) {
    return axios.post(base + 'GetPriceList', params)
  }
}
