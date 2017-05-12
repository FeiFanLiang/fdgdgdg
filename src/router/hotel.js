import Pages from '../pages';
module.exports = {
  path: 'hotel',
  component: Pages.Abstract,
  name: '酒店',
  redirect: '/hotel/HotelBase',
  iconClass: 'el-icon-setting',
  children: [
    {
      path: 'HotelBase',
      component: Pages.HotelBase,
      name: '酒店基础信息',
      imgUrl: 'https://o0p2g4ul8.qnssl.com/vsite%2Fbackground.jpg'
    },
    {
      path: 'HotelBaseAdd',
      component: Pages.HotelBaseAdd,
      name: '添加酒店',
      meta: {
        hidden: true
      }
    },
    {
      path: 'HotelBaseEdit/:ID',
      redirect: { name: '酒店基础信息编辑' },
      component: Pages.Abstract,
      name: '酒店信息编辑',
      children: [
        {
          path: 'base',
          component: Pages.HotelBaseEdit,
          name: '酒店基础信息编辑'
        },
        {
          path: 'policy',
          component: Pages.HotelPolicy,
          name: '酒店政策信息编辑'
        },
        {
          path: 'room',
          component: Pages.HotelRoom,
          name: '酒店房间信息编辑'
        },
        {
          path: 'platform',
          component: Pages.HotelPlatform,
          name: '酒店平台信息编辑'
        },
        {
          path: 'price',
          component: Pages.HotelPrice,
          name: '酒店价格信息编辑'
        },
        {
          path: 'hotelShow',
          component: Pages.HotelShow,
          name: '酒店展示信息'
        }
      ],
      meta: {
        hidden: true
      }
    }
  ]
};
