import axios from 'axios';
import path from './api';

export default {
    listByQuery(params) {
            return axios.get(path.apiBaseUrl + 'ParkSale/CarUse/list', { params: params });
        },
        detail(id) {
            return axios.get(path.apiBaseUrl + `ParkSale/CarUse/${id}`);
        },
        add(params) {
            return axios.post(path.apiBaseUrl + 'ParkSale/CarUse', params);
        },
        edit(id, params) {
            return axios.put(path.apiBaseUrl + `ParkSale/CarUse/${id}`, params);
        },
        del(id) {
            return axios.delete(path.apiBaseUrl + `ParkSale/CarUse/${id}`);
        }
};
