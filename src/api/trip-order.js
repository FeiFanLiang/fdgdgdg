import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/TripOrder/'
import {
  tripOrderApi
} from '../config-data'

export default {
  getConfig: tripOrderApi.getConfig,
  // GET /Hotel/TripOrder/list
  list(params) {
    return axios.get(base + 'list',{params:params})
  },
  // /GET /Hotel/TripOrder/{id}
  listById(id) {
    return axios.get(base + id)
  },
  // POST /Hotel/TripOrder
  add(params) {
    return axios.post(base, params)
  },
  // PUT /Hotel/TripOrder/{id}
  edit(id,params) {
    return axios.put(base + id, params)
  },
  // DELETE /Hotel/TripOrder/{id}
  del(id) {
    return axios.delete(base + id)
  }
}
