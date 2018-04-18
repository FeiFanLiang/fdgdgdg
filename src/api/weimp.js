import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'WeiMP/HotelOrder/'

export default {
  async weihotellist (params) {
    return axios.get(base + 'list', {
      params: params
    })
  },
}
