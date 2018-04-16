import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/HotelLog/'
export default {
    // /GET /Hotel/HotelOrderDetail/DetailHotelPolicy/{orderid}
  getDetail (params) {
    return axios.get(base + 'GetPlatRoomList/?PlatformID='+params.PlatformID+'&HotelID='+params.HotelID)
  },
  getSon (params) {
    return axios.get(base + 'GetPlatSonRoomList/?PlatformID='+params.PlatformID+'&RoomID='+params.RoomID)
  },
  getPrice(params){
    return axios.post(base + 'GainPriceLog', params)
  },
  upState(params){
    return axios.post(base + 'UploadStateLog', params)
  },
  upPrice(params){
    return axios.post(base + 'UploadPriceLog', params)
  },
  intPrice(params){
    return axios.post(base + 'InitPriceLog', params)
  }
  
}
