const _import = require('./_import_' + process.env.NODE_ENV)
import Pages from '../pages'

export default {
  path: 'fleet',
  component: Pages.Abstract,
  name: '车队管理',
  redirect: '/fleet/car-base',
  iconClass: 'chedui',
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
      name: '加油卡充值记录',
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
    }
  ]
}
