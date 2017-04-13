import * as types from './mutations-types'

import {store} from '../../utils/'

module.exports = {
    [types.SHOW_LOADING](state) {
        state.ajax_loading = true
    },

    [types.HIDE_LOADING](state) {
        state.ajax_loading = false
    }
}
