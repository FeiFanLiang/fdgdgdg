import axios from 'axios';
let base = '';

export default {
    fetchImages(params) {
        return axios.get(`${base}/images/imagesInfo/all`, {params: params}).then(res => res.data);
    },
    removeImages(params) {
        return axios.post(`${base}/images/imagesInfo/remove/${id}`, params).then(res => res.data);
    },
    editImages(params) {
        return axios.put(`${base}/images/imagesInfo/edit/${id}`, params).then(res => res.data);
    },
}