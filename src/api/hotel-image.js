import axios from 'axios';
import path from './api';

export default {
  detail(HotelID) {
    return axios.get(path.apiBaseUrl + `Hotel/HotelImage/${HotelID}`);
  },
  add(params) {
    return axios.post(path.apiBaseUrl + 'Hotel/HotelImage', params);
  },
  edit(params) {
    return axios.put(path.apiBaseUrl + 'Hotel/HotelImage', params);
  },
  del(imgID) {
    return axios.delete(path.apiBaseUrl + `Hotel/HotelImage/${imgID}`);
  }
};
