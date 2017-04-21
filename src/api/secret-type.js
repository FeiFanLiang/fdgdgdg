import axios from 'axios';
import path from './api';
export default {
  list(params) {
    return axios.get(path.apiBaseUrl + 'Hotel/SecretType', {
      params: params
    });
  }
};