import * as types from './mutations-types';

module.exports = {
  [types.SET_CONFIG_LIST](state) {
    state.configList = true;
  }
};
