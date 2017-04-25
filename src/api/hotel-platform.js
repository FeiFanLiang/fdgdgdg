import axios from 'axios';
import path from './api';
export default {
  getHotelList(hotelid) {
    return axios.get(path.apiBaseUrl + `Hotel/HotelPlatform/hotel/${hotelid}`);
  },
  getDetail(id) {
    return axios.get(path.apiBaseUrl + `Hotel/HotelPlatform/${id}`);
  },
  addInfo(params) {
    return axios.post(path.apiBaseUrl + `Hotel/HotelPlatform`, params);
  },
  delInfo(id) {
    return axios.delete(path.apiBaseUrl + `Hotel/HotelPlatform/${id}`);
  },
  editInfo(params) {
    return axios.put(
      path.apiBaseUrl + `Hotel/HotelPlatform/${params.id}`,  params);
  },
  getPlatformList(platid) {
    return axios.get(path.apiBaseUrl + `Hotel/HotelPlatform/plat/${platid}`);
  }
};
