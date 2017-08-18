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
      component: Pages.BargainsRoom,
      name: '特价房型展示'
    }
  ]
}
