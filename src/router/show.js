const _import = require('./_import_' + process.env.NODE_ENV)
import Pages from '../pages'
export default {
  path: 'show',
  component: Pages.Abstract,
  name: '展示信息',
  redirect: '/show/bargains-room',
  iconClass: 'zhanshi',
  children: [
    {
      path: 'bargains-room',
      component: _import('show/bargains-room/bargains-room'),
      name: '特价房型展示'
    }
  ]
}
