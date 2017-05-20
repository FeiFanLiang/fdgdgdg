import axios from 'axios';
import path from './api';
export default {
  listByPhone() {
    return axios.get(path.apiBaseUrl + `ParkSale/CarOrder/Phone/${Phone}`);
  },
  listByTime() {
    return axios.get(path.apiBaseUrl + `ParkSale/CarOrder/Phone/${Phone}`);
  }
};
