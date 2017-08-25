import Pages from '../pages'
export default {
  path: 'order',
  component: Pages.Abstract,
  name: '订单',
  redirect: '/order/CarOrderManage',
  iconClass: 'dingdan',
  children: [
    {
      path: 'CarOrderManage',
      component: Pages.CarOrderManage,
      name: '专车订单'
    },
    {
      path: 'HotelOrder',
      component: Pages.HotelOrder,
      name: '特价房订单'
    },
    {
      path: 'HotelsOrder',
      component: Pages.HotelsOrder,
      name: '酒店订单'
    }
  ]
}
