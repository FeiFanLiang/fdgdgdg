import Pages from '../pages';
module.exports = {
  path: 'show',
  component: Pages.Abstract,
  name: '展示管理',
  iconClass: 'el-icon-setting',
  children: [
    {
      path: 'hotel',
      component: Pages.HotelShow,
      name: '酒店展示列表',
      imgUrl: 'https://o0p2g4ul8.qnssl.com/vsite%2Fbackground.jpg'
    },
    {
      path: 'hotel/:hotelShowID',
      component: Pages.HotelShowDetails,
      name: '酒店展示详情',
      imgUrl: 'https://o0p2g4ul8.qnssl.com/vsite%2Fbackground.jpg',
      meta: {
        hidden: true
      }
    },
    {
      path: 'hotel/add/:hotelID',
      component: Pages.HotelShowAddAndEdit,
      name: '添加酒店展示',
      imgUrl: 'https://o0p2g4ul8.qnssl.com/vsite%2Fbackground.jpg',
      meta: {
        hidden: true
      }
    },
    {
      path: 'hotel/edit/:hotelID/:hotelShowID',
      component: Pages.HotelShowAddAndEdit,
      name: '编辑酒店展示',
      imgUrl: 'https://o0p2g4ul8.qnssl.com/vsite%2Fbackground.jpg',
      meta: {
        hidden: true
      }
    }
  ]
};
