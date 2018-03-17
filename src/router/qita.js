const _import = require('./_import_' + process.env.NODE_ENV)
import Pages from '../pages'
const beforeEnter = (to, from, next) => {
    let user = JSON.parse(localStorage.getItem('user'))
    if (user.username === 'admin') {
      next()
    } else {
      alert('您没有权限进入该页面！')
      next({
        path: '/404'
      })
    }
  }
export default {
    path: 'qita',
    component: Pages.Abstract,
    name: '其它',
    redirect: '/qita/Qita',
    iconClass: 'dingdan',
    children: [
        {
            path: 'car-base',
            name: '车辆基础信息',
            component: _import('fleet/car-base/car-base')
          },
          {
            path: 'driver-base',
            name: '司机基础信息',
            component: _import('fleet/driver-base/driver-base')
          },
          {
            path: 'car-arrange',
            name: '车辆派车记录',
            component: _import('fleet/car-arrange/car-arrange')
          },
          {
            path: 'car-use',
            name: '车辆使用情况',
            component: _import('fleet/car-use/car-use')
          },
          {
            path: 'gasoline-log',
            name: '加油记录',
            component: _import('fleet/gasoline-log/gasoline-log')
          },
          {
            path: 'gasoline-card-log',
            name: '加油卡使用记录',
            component: _import('fleet/gasoline-card-log/gasoline-card-log')
          },
          {
            path: 'car-line',
            name: '车辆运行线路',
            component: _import('fleet/car-line/car-line')
          },
          {
            path: 'line-station',
            name: '线路/站点映射',
            component: _import('fleet/line-station/line-station')
          },
          {
            path: 'station',
            name: '车辆停靠点',
            component: _import('fleet/station/station')
          },
          {
            path: 'car-baoxiao',
            name: '车的报销',
            component: _import('fleet/car-baoxiao/car-baoxiao')
          },
          {
            path: 'car-time',
            name: '车辆时间',
            component: _import('fleet/car-time/car-time')
          },
          {
            path: 'dwz',
            component: _import('dwz/dwz'),
            name: '短链接信息'
          },
          {
            path: 'driver-evaluate',
            name: '业绩统计',
            component: _import('fleet/evaluate-scan/driver-evaluate')
          },
          {
            path: 'weixin-scan-code',
            name: '扫码链接',
            component: _import('fleet/evaluate-scan/weixin-scan-code')
          },
          {
            path: 'modify-price-once',
            component: _import('modify-price/once'),
            name: '一次性比价'
          },
          {
            path: 'modify-price-log',
            component: _import('modify-price/log'),
            name: '比价日志'
          },
          {
            path: 'CarOrderManage',
            component: _import('order/car-order-manage'),
            name: '专车订单'
          },
          {
            path: 'HotelOrder',
            component: _import('order/hotel-order'),
            name: '特价房订单'
          },
          {
            path: 'pay-company',
            name: '公司支付账号',
            component: _import('policy/pay-company/pay-company')
          },
          {
            path: 'hotel-paymode',
            name: '支付方式',
            component: _import('policy/hotel-paymode/hotel-paymode')
          },
          {
            path: 'role',
            component: _import('role/role'),
            beforeEnter,
            name: '角色管理'
          },
          {
            path: 'bargains-room',
            component: _import('show/bargains-room/bargains-room'),
            name: '特价房型展示'
          },
          {
            path: 'hotel-show',
            component: _import('show/hotel-show/hotel-show'),
            name: '酒店展示'
          },
          {
            path: 'user',
            component: _import('user/user'),
            beforeEnter,
            name: '用户管理'
          },
          {
            path: 'wechat-user',
            component: _import('wechat-user/wechat-user'),
            name: '微信用户'
          },
          {
            path: 'CustomMenu',
            component: _import('weichat/custom-menu'),
            name: '自定义菜单'
          },
          {
            path: 'CustomService',
            component: _import('weichat/custom-service'),
            name: '客服消息'
          },
          {
            path: 'PayWeichat',
            component: _import('weichat/pay-weichat'),
            name: '微信支付'
          },
          {
            path: 'Card',
            component: _import('weichat/card'),
            name: '卡卷功能'
          },
          {
            path: 'Datas',
            component: _import('weichat/datas'),
            name: '数据与对账',
            meta: {
              hidden: true
            }
          },
          {
            path: 'Texts',
            component: _import('weichat/texts'),
            name: '编辑器',
            meta: {
              hidden: true
            }
          }
    ]
  }
  