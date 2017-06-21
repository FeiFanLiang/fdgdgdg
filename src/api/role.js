import axios from 'axios'
import path from './api'

export default {
  list () {
    return axios.get(path.apiBaseUrl + 'System/Role')
  },
  userNameListByRolesName (rolsName) {
    return axios.get(path.apiBaseUrl + `System/Role/${rolsName}`)
  },
  roleListByUserName (userName) {
    return axios.get(path.apiBaseUrl + `System/Role/ForUser/${userName}`)
  },
  add (params) {
    return axios.post(path.apiBaseUrl + 'System/Role', params)
  },
  edit (params) {
    return axios.put(path.apiBaseUrl + 'System/Role', params)
  },
  addUserNameByRolsName (rolsName, userName, params) {
    return axios.post(
      path.apiBaseUrl + `System/Role/${rolsName}/${userName}`,
      params
    )
  },
  deleteUserNameByRolesName (rolsName, userName) {
    return axios.delete(path.apiBaseUrl + `System/Role/${rolsName}/${userName}`)
  }
}
