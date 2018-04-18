import axios from 'axios'
import path from './api'
const base1 = path.apiBaseUrl + 'WeiMP/'
const base = path.apiBaseUrl + 'WeiMP/HotelOrder/'

export default {
  async weihotellist (params) {
    return axios.get(base + 'list', {
      params: params
    })
  },
  async revise (ID,Price) {
    return axios.get(base + `HotelOrder/${ID}/${Price}`)
  }
}
