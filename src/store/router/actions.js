import * as types from './mutations-types'

export default {
  set_cur_route: ({ commit }, paths) => {
    commit(types.SET_CUR_ROUTE, paths)
  }
}
