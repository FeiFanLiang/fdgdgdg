import axios from 'axios';
import path from './api';
export default {
  listByHotel(hotelid) {
    return axios.get(path.apiBaseUrl + `Hotel/HotelPlatform/hotel/${hotelid}`);
  },
  detail(id) {
    return axios.get(path.apiBaseUrl + `Hotel/HotelPlatform/${id}`);
  },
  add(params) {
    return axios.post(path.apiBaseUrl + 'Hotel/HotelPlatform', params);
  },
  del(id) {
    return axios.delete(path.apiBaseUrl + `Hotel/HotelPlatform/${id}`);
  },
  edit(params) {
    return axios.put(
      path.apiBaseUrl + `Hotel/HotelPlatform/${params.id}`,
      params
    );
  },

  getPlatformList(platid) {
    return axios.get(path.apiBaseUrl + `Hotel/HotelPlatform/plat/${platid}`);
  }
};
