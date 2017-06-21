import * as types from './mutations-types'

export default {
  [types.SET_CUR_ROUTE] (state, paths) {
    state.headerCurRouter = paths.rootPath
    state.leftCurRouter = paths.fullPath
  }
}
