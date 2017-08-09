import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'ParkSale/CarOrderManage/'

export default {
  syncList (params) {
    return axios.get(base + 'SyncCtripOrder', {
      params: params
    })
  },
  syncOrderOperDataList () {
    return axios.get(base + 'SyncOrderOperData')
  },
  syncOrderOperData (id) {
    return axios.get(base + 'SyncOrderOperData/' + id)
  },
  listByQuery (params) {
    return axios.get(base + 'list', {
      params: params
    })
  },
  detail (id) {
    return axios.get(base + id)
  },
  add (params) {
    return axios.post(base, params)
  },
  edit (id, params) {
    return axios.put(base + id, params)
  },
  del (id) {
    return axios.delete(base + id)
  },
  getDaypandect (params) {
    return axios.get(base + 'DayPandect', {
      params: params
    })
  }
}
