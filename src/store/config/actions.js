import * as types from './mutations-types'

export default {
  fetchConfigList: ({ commit }) => {
    return new Promise((resolve, reject) => {
      commit(types.SET_CONFIG_LIST)
      resolve()
    })
  }
}
