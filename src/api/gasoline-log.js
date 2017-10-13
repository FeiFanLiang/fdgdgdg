import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'ParkSale/GasolineLog/'

export default {
  cardList (params) {
    return axios.get(base + 'GetGasolineCardList', { params: params })
  },
  list (params) {
    return axios.get(base + 'list', { params: params })
  },
  getLastLog (id) {
    return axios.get(base + 'GetLastLog/' + id)
  },
  getGasolineLogByCardLog (id) {
    return axios.get(base + 'GetGasolineLog/' + id)
  },
  detail (id) {
    return axios.get(base + id)
  },
  add (params) {
    return axios.post(base + 'AddLog', params)
  },
  recharge (params) {
    return axios.post(base + 'GasolineCardRecharge', params)
  },
  edit (id, params) {
    return axios.put(base + id, params)
  },
  del (id) {
    return axios.delete(base + id)
  },
  downloadList (params) {
    return axios.get(base + 'downloadList', {
      params: params
    })
  }
}
