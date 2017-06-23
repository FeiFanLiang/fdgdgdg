import * as types from './mutations-types'

export default {
  [types.SET_CONFIG_LIST] (state, json) {
    state.configList = json
  }
}
