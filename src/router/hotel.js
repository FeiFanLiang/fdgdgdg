// import Hello from 'components/Hello.vue'
import HotelBase from 'views/Hotel/HotelBase.vue'
import HotelBaseEdit from 'views/Hotel/HotelBaseEdit.vue'
import HotelBaseAdd from 'views/Hotel/HotelBaseAdd.vue'
// import HotelPolicyEdit from 'views/Hotel/HotelPolicyEdit.vue'
// import HotelPolicyList from 'views/Hotel/HotelPolicyList.vue'
import HotelFinance from 'views/Hotel/HotelFinance.vue'
// import HotelQita from 'views/Hotel/HotelQita.vue'
import HotelFinaceEdit from 'views/Hotel/HotelFinaceEdit.vue'
import HotelFinanceAdd from 'views/Hotel/HotelFinanceAdd.vue'
import HotelPlatform from 'views/Hotel/HotelPlatform.vue'
import HotelDetail from 'views/Hotel/HotelDetail.vue'

const HotelRoutes = [
  {
    path: 'Index',
    redirect: 'HotelBase'
  },
  {
    path: 'HotelBase',
    name: 'HotelBase_root',
    description: '酒店基础信息',
    component: HotelBase,
    children: [
      {
        path: '',
        component: HotelBase,
        name: 'HotelBase',
        description: '酒店基础信息'
      }
    ]
  },
  {
    path: 'HotelFinance',
    component: HotelFinance,
    name: 'HotelFinance',
    description: '酒店财务信息'
  },
  {
    path: 'HotelDetail',
    component: HotelDetail,
    name: 'HotelDetail',
    description: '酒店展示信息'
  },
  {
    path: 'HotelPlatform',
    component: HotelPlatform,
    name: 'HotelPlatform',
    description: '酒店平台信息'
  }
  // {
  //   path: 'HotelQita',
  //   component: HotelQita,
  //   name: 'HotelQita',
  //   description: '酒店其他信息'
  // }

]

const HotelBaseRoutes = [
  {
    path: 'HotelBase/add',
    component: HotelBaseAdd,
    name: 'HotelBaseAdd',
    description: '酒店基础信息添加'
  },
  {
    path: 'HotelBase/edit/:id',
    component: HotelBaseEdit,
    name: 'HotelBaseEdit',
    description: '酒店基础信息修改'
  }
]

const HotelFinanceRoutes = [
  {
    path: 'HotelFinance/:id',
    component: HotelFinaceEdit,
    name: 'HotelFinaceEdit',
    description: '酒店财务信息修改'
  },
  {
    path: 'HotelFinanceAdd',
    component: HotelFinanceAdd,
    name: 'HotelFinanceAdd',
    description: '酒店财务信息添加'
  }
]

// const HotelDetailRoutes = [
//   {
//     path: 'HotelBase/duihuakuang',
//     component: duihuakuang,
//     name: 'duihuakuang',
//     description: '对话框'
//   },
//   {
//     path: 'HotelBase/fenye',
//     component: fenye,
//     name: 'fenye',
//     description: '分页'
//   }
// ]

// 暂不需要，政策不需要独立界面，他是依附于酒店信息
const HotelPolicyRoutes = [
  // {
  //   path: 'HotelPolicy/:pid',
  //   component: HotelPolicyList,
  //   name: 'HotelPolicyList',
  //   description: '政策列表'
  // },
  // {
  //   path: 'HotelPolicy/:pid/:id',
  //   component: HotelPolicyEdit,
  //   name: 'HotelPolicyEdit',
  //   description: '政策列表信息修改'
  // }
]

var Routes = HotelRoutes.concat(HotelBaseRoutes, HotelPolicyRoutes, HotelFinanceRoutes)

export default Routes
