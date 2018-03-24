const _import = require('./_import_' + process.env.NODE_ENV)
import Pages from '../pages'

export default {
  path: 'order',
  component: Pages.Abstract,
  name: '客服',
  redirect: '/order/hotels-order',
  iconClass: 'cf-c02',
  children: [
    {
      path: 'Pending',
      component: _import('order/Pending'),
      name: '待处理列表'
    },
    {
      path: 'HotelsOrderEdit/:ID/:POrderID/:type',
      component: _import('order/hotels-order-edit'),
      name: '酒店订单信息编辑',
      meta: {
        hidden: true
      }
    },
    {
      path: 'ShenheSave/:ID/:POrderID/:HotelPolicyID',
      component: _import('order/shenhe-save'),
      name: '订单审核',
      meta: {
        hidden: true
      }
    },
    {
      path: 'huitian-shenhe-tuigai/Huitian',
      component: _import('order/huitian-shenhe-tuigai'),
      name: '待回填列表'
    },
    {
      path: 'huitian-shenhe-tuigai/Shenhe',
      component: _import('order/huitian-shenhe-tuigai'),
      name: '待审核列表'
    },
    {
      path: 'huitian-shenhe-tuigai/Tuigai',
      component: _import('order/huitian-shenhe-tuigai'),
      name: '待退改单列表'
    },
    {
      path: 'Jietu',
      component: _import('order/jietu'),
      name: '待发截图列表'
    },
    {
      path: 'Editor/:ID',
      component: _import('order/editor'),
      name: '编辑器',
      meta: {
        hidden: true
      }
    },
    {
      path: 'TripOrder',
      component: _import('order/trip-order'),
      name: '票单列表'
    },
    {
      path: 'Usefor',
      component: _import('order/Usefor'),
      name: '有用单列表'
    },
    {
      path: 'HotelsOrder',
      component: _import('order/hotels-order'),
      name: '酒店订单'
    }
  ]
}
