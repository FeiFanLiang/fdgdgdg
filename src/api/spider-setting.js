import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/PlatformHotelCarwlerPeriod/'
const base2 = path.apiBaseUrl + 'Hotel/CarwlerState/Carwler/'

export default {
  setPeriod(params) {
    return axios.post(base, params)
  },
  del(id) {
    return axios.delete(base + `${id}`)
  },
  listByHotel(id) {
    return axios.get(base + 'PlatformHotel/' + id)
  },
  addToGroup(hotelGroupID, platID, params) {
    return axios.post(base + `AddToGroup/${hotelGroupID}/${platID}`, params)
  },
  singlePriceRatio(platID, params) {
    return axios.post(base + `SinglePriceRatio/${platID}`, params)
  },
  GetTaskList(plathotelID) {
    return axios.post(base2 + 'GetTaskList/' + plathotelID)
  },
  GetTask(taskID) {
    let task = encodeURIComponent(taskID)
    return axios.post(base2 + 'GetTask/' + task)
  },
  GetPrice(PriceKey) {
    let price = encodeURIComponent(PriceKey)
    return axios.post(base2 + 'GetPrice/' + price)
  },
  GetPriceList(plathotelID) {
    return axios.post(base2 + 'GetPriceList/' + plathotelID)
  },
  HGETALL(hashKey) {
    return axios.post(base2 + `HGETALL/${hashKey}/2`)
  }
}
