import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/PlatformHotelCarwlerPeriod/'

export default {
  setPeriod (params) {
    //  { PlatformHotelId: '8395732', Period: 60, startDate: 0, endDate: 30 }
    return axios.post(base, params)
  },
  listByHotel (id) {
    return axios.get(base + 'PlatformHotel/' + id)
  }
}
