const _import = require('./_import_' + process.env.NODE_ENV)
import Pages from '../pages'

export default {
  path: 'hotel',
  component: Pages.Abstract,
  name: '酒店',
  redirect: '/hotel/HotelBase',
  iconClass: 'jiudian',
  children: [
    {
      path: 'HotelBase',
      component: _import('hotel/hotel-base/hotel-base'),
      name: '酒店基础信息'
    },
    {
      path: 'HotelBasePolicy',
      component: _import('hotel/hotel-base-policy/hotel-base-policy'),
      name: '酒店政策信息'
    },
    {
      path: 'PolicyList',
      component: _import('hotel/policy/policy-list'),
      name: '酒店政策信息2'
    },
    {
      path: 'PolicyPlatForm',
      component: _import('hotel/policy/policy-platform'),
      name: '平台结算信息'
    },
    {
      path: 'HotelBaseAdd',
      component: _import('hotel/hotel-base/hotel-base-add'),
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
          component: _import('hotel/hotel-base/hotel-base-edit'),
          name: '酒店基础信息编辑'
        },
        {
          path: 'policy',
          component: _import('hotel/hotel-policy/hotel-policy'),
          name: '酒店政策信息编辑'
        },
        {
          path: 'room',
          component: _import('hotel/hotel-room/hotel-room'),
          name: '酒店房间信息编辑'
        },
        {
          path: 'room-show/:hotelId/:RoomID',
          component: _import('hotel/room-show/room-show'),
          name: '房型展示信息',
          meta: {
            hidden: true
          }
        },
        {
          path: 'platform',
          component: _import('hotel/hotel-platform/hotel-platform'),
          name: '酒店平台信息编辑'
        },
        {
          path: 'price',
          component: _import('hotel/hotel-price/hotel-price'),
          name: '酒店价格信息编辑'
        },
        {
          path: 'hotelShow',
          component: _import('hotel/hotel-show/hotel-show'),
          name: '酒店展示信息'
        }
      ],
      meta: {
        hidden: true
      }
    },
    {
      path: 'HotelBaseEditPolicy/:ID',
      redirect: { name: '酒店政策信息编辑' },
      component: Pages.Abstract,
      name: '酒店政策信息编辑',
      children: [
        {
          path: 'policy',
          component: _import('hotel/hotel-policy/hotel-policy'),
          name: '酒店政策信息编辑'
        }
      ],
      meta: {
        hidden: true
      }
    }
  ]
}
