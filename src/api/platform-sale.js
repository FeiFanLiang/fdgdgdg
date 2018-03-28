import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/Platform_SalePrice/'
import {
  platStatPriceApi
} from '../config-data'
export default {
  getConfig: platStatPriceApi.getConfig,
  getSonRoomList (hotelID,platID) {
    return axios.get(base + `GetPlatSonRoomList?hotelID=${hotelID}&platID=${platID}`)
  },
  getPriceList (id,params) {
    return axios.post(base + `GetPriceList/?platID=${id}`, params)
  },
  UpdateRoomState (params) {
    return axios.post(base + 'UpdateRoomState', params)
  },
  updateRoomPurchasePrice (params) {
    return axios.post(base + 'UpdateRoomPurchasePrice', params)
  },
  updateRoomSalePrice (params) {
    return axios.post(base + 'UpdateRoomSalePrice', params)
  }
}
