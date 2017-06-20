import * as types from './mutations-types';

module.exports = {
  show_loading: ({ commit }) => {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING);
      resolve();
    });
  },

  hide_loading: ({ commit }) => {
    return new Promise((resolve, reject) => {
      commit(types.HIDE_LOADING);
      resolve();
    });
  }
};
