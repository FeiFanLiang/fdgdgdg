function getJson () {
  let json = [
    {
      name: '酒店',

      children: [
        {
          name: '酒店基础信息'
        },
        {
          name: '添加酒店'
        },
        {
          name: '酒店信息编辑',

          children: [
            {
              name: '酒店基础信息编辑'
            },
            {
              name: '酒店政策信息编辑'
            },
            {
              name: '酒店房间信息编辑'
            },
            {
              name: '房型展示信息'
            }
          ]
        }
      ]
    }
  ]
  return json
}
function jsonToNameArry (json) {
  let nameArry = []
  function jsonToArry (json) {
    json.forEach(item => {
      nameArry.push(item.name)
      if (item.children && item.children.length) {
        jsonToArry(item.children)
      }
    })
  }
  jsonToArry(json)
  return nameArry
}

let localRoute = [
  {
    path: 'hotel',
    component: 'Pages.Abstract',
    name: '酒店',
    redirect: '/hotel/HotelBase',
    iconClass: 'jiudian',
    children: [
      {
        path: 'HotelBase',
        component: 'hotel/hotel-base/hotel-base',
        name: '酒店基础信息'
      },
      {
        path: 'HotelBaseAdd',
        component: 'hotel/hotel-base/hotel-base-add',
        name: '添加酒店',
        meta: {
          hidden: true
        }
      },
      {
        path: 'HotelBaseEdit/:ID',
        redirect: {
          name: '酒店基础信息编辑'
        },
        component: 'Pages.Abstract',
        name: '酒店信息编辑',
        children: [
          {
            path: 'base',
            component: 'hotel/hotel-base/hotel-base-edit',
            name: '酒店基础信息编辑'
          },
          {
            path: 'policy',
            component: 'hotel/hotel-policy/hotel-policy',
            name: '酒店政策信息编辑'
          },
          {
            path: 'room',
            component: 'hotel/hotel-room/hotel-room',
            name: '酒店房间信息编辑'
          },
          {
            path: 'room-show/:hotelId/:RoomID',
            component: 'hotel/room-show/room-show',
            name: '房型展示信息',
            meta: {
              hidden: true
            }
          },
          {
            path: 'platform',
            component: 'hotel/hotel-platform/hotel-platform',
            name: '酒店平台信息编辑'
          },
          {
            path: 'price',
            component: 'hotel/hotel-price/hotel-price',
            name: '酒店价格信息编辑'
          },
          {
            path: 'hotelShow',
            component: 'hotel/hotel-show/hotel-show',
            name: '酒店展示信息'
          }
        ],
        meta: {
          hidden: true
        }
      }
    ]
  }
]
function hasPermission (nameArry, route) {
  return nameArry.indexOf(route.name) > -1
}
/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param localRoute
 * @param roles
 */
function filterAsyncRouter (nameArry, localRoute) {
  console.log(localRoute)
  const accessedRouters = localRoute.filter(route => {
    if (hasPermission(nameArry, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(nameArry, route.children)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

let json = getJson()
let nameArry = jsonToNameArry(json)
let accessedRouters = filterAsyncRouter(nameArry, localRoute)
console.log(accessedRouters)
