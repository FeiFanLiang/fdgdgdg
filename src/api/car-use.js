import axios from 'axios';
import path from './api';

export default {
    listByQuery(params) {
            return axios.get(path.apiBaseUrl + 'ParkSale/CarUse/list', { params: params });
        }
};
