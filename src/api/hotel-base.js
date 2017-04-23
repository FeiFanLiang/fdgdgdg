import axios from 'axios';
import path from './api';
export default {
  listAll(params = {}) {
    return axios.get(path.apiBaseUrl + 'Hotel/HotelBase', { params: params });
  },
  listByQuery(params) {
    return axios.get(path.apiBaseUrl + 'Hotel/HotelBase', { params: params });
  },
  listDefault() {
    return axios.get(path.apiBaseUrl + 'Hotel/HotelBase/default');
  },
  detailsById(id) {
    return axios.get(path.apiBaseUrl + `Hotel/HotelBase/${id}`);
  },
  detailsByHotelNum(id) {
    return axios.get(path.apiBaseUrl + `Hotel/HotelBase/HotelNum/${id}`);
  },
  add(params) {
    return axios.post(path.apiBaseUrl + 'Hotel/HotelBase', params);
  },
  remove(id) {
    return axios.delete(path.apiBaseUrl + `Hotel/HotelBase/${id}`);
  },
  edit(id, params) {
    return axios.put(path.apiBaseUrl + `Hotel/HotelBase/${id}`, params);
  }
};
