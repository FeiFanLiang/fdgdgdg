import * as types from './mutations-types'

export default {
  fetchConfigList ({ commit }) {
    const json = [
      { label: '账户名称', name: 'AccountName', is: true },
      { label: '银行帐户', name: 'AccountNum', is: true },
      { label: '备注', name: 'Remark', is: true },
      { label: 'ID', name: 'ID', is: true }
    ]
    commit(types.SET_CONFIG_LIST, json)
  }
}
