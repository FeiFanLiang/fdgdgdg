import axios from 'axios';
import path from './api';

export default {
    getRoleList() {
        return axios.get(path.apiBaseUrl + 'System/Role');
    },
    getUserNameByRole(rolsName) {
        return axios.get(path.apiBaseUrl + `System/Role/${rolsName}`);
    },
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
