import axios from 'axios';
import path from './api';
export default {
  listByPhone(Phone) {
    return axios.get(path.apiBaseUrl + `ParkSale/CarOrder/Phone/${Phone}`);
  },
  listByTime(time) {
    return axios.get(path.apiBaseUrl + `ParkSale/CarOrder/Phone/${time}`);
  }
};
