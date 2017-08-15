import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/RoomStatPrice/'
export default {
  getPriceList(params) {
    return axios.get(base + 'GetPriceList', {
      params: params
    })
  }
}
