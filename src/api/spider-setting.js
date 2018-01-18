import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/PlatformHotelCarwlerPeriod/'
const base2 = path.apiBaseUrl + 'Hotel/CarwlerState/Carwler/'

export default {
  setPeriod (params) {
    //  { PlatformHotelId: '8395732', Period: 60, startDate: 0, endDate: 30 }
    return axios.post(base, params)
  },
  listByHotel (id) {
    return axios.get(base + 'PlatformHotel/' + id)
  },
  //POST /Hotel/CarwlerState/Carwler/GetTaskList/{plathotelID}
  GetTaskList (plathotelID) {
    return axios.post(base2 + 'GetTaskList/' + plathotelID)
  },
  //POST /Hotel/CarwlerState/Carwler/GetTask/{TaskID}
  GetTask (taskID) {
    let task = encodeURIComponent(taskID)
    return axios.post(base2 + 'GetTask/' + task)
  },
  //POST /Hotel/CarwlerState/Carwler/GetPrice/{PriceKey}
  GetPrice (PriceKey) {
    let price = encodeURIComponent(PriceKey)
    return axios.post(base2 + 'GetPrice/' + price)
  },
  //POST /Hotel/CarwlerState/Carwler/GetPriceList/{plathotelID}
  GetPriceList (plathotelID) {
    return axios.post(base2 + 'GetPriceList/' + plathotelID)
  },
}
