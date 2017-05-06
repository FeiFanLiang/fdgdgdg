import axios from 'axios';
import path from './api';

export default {
    list() {
        return axios.get(path.apiBaseUrl + 'System/Role');
    },
    roleListByRolsName(rolsName) {
        return axios.get(path.apiBaseUrl + `System/Role/${rolsName}`);
    },
    roleListByUserName(userName) {
        return axios.get(path.apiBaseUrl + `System/Role/ForUser/${userName}`);
    },
    addUserNameByRolsName(rolsName, userName, params) {
        return axios.post(
            path.apiBaseUrl + `System/Role/${rolsName}/${userName}`,
            params
        );
    },
    addRolsNameByUserName(userName, rolsName, params) {
        return axios.post(
            path.apiBaseUrl + `System/Role/ForUser/${userName}/${rolsName}`,
            params
        );
    },
    deleteByUserName(rolsName, userName) {
        return axios.delete(
            path.apiBaseUrl + `System/Role/${rolsName}/${userName}`
        );
    },
    deleteByRolsName(rolsName, userName) {
        return axios.delete(
            path.apiBaseUrl + `System/Role/ForUser/${userName}/${rolsName}`
        );
    }
};
