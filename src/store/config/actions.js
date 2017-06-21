import * as types from './mutations-types';

module.exports = {
  fetchConfigList: ({ commit }) => {
    return new Promise((resolve, reject) => {
      commit(types.SET_CONFIG_LIST);
      resolve();
    });
  }
};
