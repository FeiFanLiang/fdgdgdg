import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/HotelPriceRule/list'
const base1 = path.apiBaseUrl + 'Hotel/HotelPriceRule/'
export default {
    
  async getDetail (params) {
    return axios.get(base1+'UseHotelIdSearch/'+params)
  },
  async removeD(id){
    return axios.delete(base1+'DeleteRule/'+id)

  },
  async add (params) {
    return axios.post(base1+'CreateRule/', params)
  },
 async xiug (params) {
    return axios.put(base1+'UpdateRule/', params)
  },
  async addrules (params) {
    return axios.post(base1+'CreatGroupHotel/?GroupId='+params.GroupName+'&PlatFromId='+params.PlatformID+'&RulePlatFromId='+params.PurchasePlatID, params)
  },
  async dele(params) {
    return axios.delete(base1+'DeleteGroupHotel/', {
        params: params
    })
  }

  
}