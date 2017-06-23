import * as types from './mutations-types'
// const data = [
//   {
//     a: {
//       ListFields: [
//         {
//           Name: 'AccountName',
//           DisplayMode: 'String',
//           title: '账户名称'
//         },
//         {
//           Name: 'AccountNum',
//           DisplayMode: 'String',
//           title: '银行帐户'
//         },
//         {
//           Name: 'Remark',
//           DisplayMode: 'String',
//           title: '备注'
//         },
//         {
//           Name: 'ID',
//           DisplayMode: 'String',
//           title: 'ID'
//         }
//       ],
//       SearchFields: [
//         {
//           Name: '',
//           DisplayMode: 'String',
//           title: ''
//         }
//       ]
//     }
//   }
// ]
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
