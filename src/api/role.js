import axios from 'axios';
import path from './api';

export default {
    list() {
        return axios.get(path.apiBaseUrl + 'System/Role');
    },
    userNameListByRolesName(rolsName) {
        return axios.get(path.apiBaseUrl + `System/Role/${rolsName}`);
    },
    addUserNameByRolsName(rolsName, userName, params) {
        return axios.post(
            path.apiBaseUrl + `System/Role/${rolsName}/${userName}`,
            params
        );
    },
    deleteUserNameByRolesName(rolsName, userName) {
        return axios.delete(
            path.apiBaseUrl + `System/Role/${rolsName}/${userName}`
        );
    }
};
