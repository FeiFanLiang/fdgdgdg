import axios from 'axios'
import path from './api'
export default {
  list () {
    return axios.get(path.apiBaseUrl + 'Hotel/RserveMode')
  }
}
