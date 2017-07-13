import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'System/Role/'

import { roleApi } from '../config-data'

export default {
  getConfig: roleApi.getConfig,
  list () {
    return axios.get(base)
  },
  userNameListByRolesName (rolsName) {
    return axios.get(base + rolsName)
  },
  roleListByUserName (userName) {
    return axios.get(base + `ForUser/${userName}`)
  },
  add (params) {
    return axios.post(base, params)
  },
  edit (params) {
    return axios.put(base, params)
  },
  addUserNameByRolsName (rolsName, userName, params) {
    return axios.post(base + `${rolsName}/${userName}`, params)
  },
  deleteUserNameByRolesName (rolsName, userName) {
    return axios.delete(base + `${rolsName}/${userName}`)
  }
}
