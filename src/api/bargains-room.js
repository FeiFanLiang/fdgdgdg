import axios from 'axios';
import path from './api';

export default {
  list(params) {
    return axios.get(path.apiBaseUrl + `ParkSale/BargainsRoom`, params);
  },
  detail(id) {
    return axios.get(path.apiBaseUrl + `ParkSale/BargainsRoom/${id}`);
  },
  add(params) {
    return axios.post(path.apiBaseUrl + `ParkSale/BargainsRoom`, params);
  },
  edit(params) {
    return axios.put(path.apiBaseUrl + `ParkSale/BargainsRoom`, params);
  }
};
