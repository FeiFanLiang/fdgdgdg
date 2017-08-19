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
      component: Pages.CarBase
    },
    {
      path: 'driver-base',
      name: '司机基础信息',
      component: Pages.DriverBase
    },
    {
      path: 'car-arrange',
      name: '车辆派车记录',
      component: Pages.CarArrange
    },
    {
      path: 'car-use',
      name: '车辆使用情况',
      component: Pages.CarUse
    },
    {
      path: 'gasoline-log',
      name: '加油记录',
      component: Pages.GasolineLog
    },
    {
      path: 'car-line',
      name: '车辆运行线路',
      component: Pages.CarLine
    },
    {
      path: 'line-station',
      name: '线路/站点映射',
      component: Pages.LineStation
    },
    {
      path: 'station',
      name: '车辆停靠点',
      component: Pages.Station
    }
  ]
}
