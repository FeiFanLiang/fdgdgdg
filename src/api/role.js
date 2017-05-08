import axios from 'axios';
import path from './api';

export default {
    getRoleList() {
        return axios.get(path.apiBaseUrl + 'System/Role');
    },
    getUserList() {
        return axios.get(path.apiBaseUrl + 'System/User');
    },
    getUsernameByRole(rolsName) {
        return axios.get(path.apiBaseUrl + `System/Role/${rolsName}`);
    },
    // roleListByUserName(userName) {
    //     return axios.get(path.apiBaseUrl + `System/Role/ForUser/${userName}`);
    // },
    addUserNameByRolsName(rolsName, userName, params) {
        return axios.post(
            path.apiBaseUrl + `System/Role/${rolsName}/${userName}`,
            params
        );
    },
    deleteByUserName(rolsName, userName) {
        return axios.delete(
            path.apiBaseUrl + `System/Role/${rolsName}/${userName}`
        );
    }
};
