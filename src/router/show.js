import Pages from '../pages';
module.exports = {
  path: 'show',
  component: Pages.Abstract,
  name: '展示信息',
  redirect: '/show/bargains-room',
  iconClass: 'el-icon-setting',
  children: [
    {
      path: 'bargains-room',
      component: Pages.BargainsRoom,
      name: '特价房型展示',
    }
  ]
};
