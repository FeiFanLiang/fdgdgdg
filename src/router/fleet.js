import Pages from '../pages'
export default {
  path: 'fleet',
  component: Pages.Abstract,
  name: '车队管理',
  redirect: '/fleet/car-base',
  iconClass: 'el-icon-setting',
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
      path: 'driver-evaluate',
      name: '司机评价信息',
      component: Pages.DriverEvaluate
    }
  ]
}
