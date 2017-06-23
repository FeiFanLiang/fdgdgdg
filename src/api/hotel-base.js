import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/HotelBase/'
export default {
  listAll (params = {}) {
    return axios.get(base, { params: params })
  },
  listByQuery (params) {
    return axios.get(base, { params: params })
  },
  listDefault () {
    return axios.get(base + 'default')
  },
  detailsById (id) {
    return axios.get(base + id)
  },
  detailsByHotelNum (id) {
    return axios.get(base + `HotelNum/${id}`)
  },
  add (params) {
    return axios.post(base, params)
  },
  del (id) {
    return axios.delete(base + id)
  },
  edit (id, params) {
    return axios.put(base + id, params)
  }
}
