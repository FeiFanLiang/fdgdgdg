import axios from 'axios'
import path from './api'
let base = ''
export default {

    fetchList(params) {
        return axios.get(`${base}/user/list`, {params: params})
    },
    addUser(params) {
        return axios.post(`${base}/user/add`, params)
    },
    editUser(params) {
        return axios.post(`${base}/user/edit`, params)
    },
    removeUser(params) {
        return axios.post(`${base}/user/remove`, params)
    },
    postError(params) {
        return axios.get(`${base}/error`, {params: params})
    },
    requestLogin(params) {
        return axios.post(`${base}/login`, params).then(res => res.data)
    },
    fetchSchoolList(params) {
        return axios.get(`${base}/schools`).then(res => res.data)
    },
    fetchWorkDurationOptions(params) {
        return axios.get(`${base}/work_durations`).then(res => res.data)
    },
    fetchAcademicOptions(params) {
        return axios.get(`${base}/academics`).then(res => res.data)
    },
    postResume(params) {
        return axios.post(`${base}/resume`, params).then(res => res.data)
    },
    createResume(params) {
        return axios.post(`${base}/resume/add`).then(res => res.data)
    },
}
