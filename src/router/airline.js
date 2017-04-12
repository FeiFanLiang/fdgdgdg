import Hello from '../components/Hello.vue'
import AirlineBase from 'views/Airline/AirlineBase.vue'
import AirlineEdit from 'views/Airline/edit.vue'
import AirlineAccount from 'views/Airline/AirlineAccountList.vue'

const airlineroutes = [
  {
    path: 'AirlineBase',
    component: AirlineBase,
    name: 'AirlineBase',
    description: 'AirlineBase'
  },
  // {
  //   path: 'add',
  //   component: AirlineEdit,
  //   name: 'AirlineAdd',
  //   description: 'Default'
  // },
  {
    path: 'edit/:id',
    component: AirlineEdit,
    name: 'AirlineEdit',
    description: 'Default'
  },
  {
    path: 'manage',
    component: Hello,
    name: 'AirlineManage',
    description: 'Default'
  }

]

const AirlineAccountRoutes = [
  {
    path: 'AirlineAccount',
    component: AirlineAccount,
    name: 'AirlineAccount',
    description: '航司账号'
  }
]

var Routes = airlineroutes.concat(AirlineAccountRoutes)

export default Routes
