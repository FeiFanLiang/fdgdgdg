import axios from 'axios';
let base = '';

export default {

    fetchPlatformList(params) {
        return axios.get(`${base}/platform`, {params: params}).then(res => res.data);
    }
};