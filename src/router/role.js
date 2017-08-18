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
  path: 'role',
  component: Pages.Abstract,
  name: '角色管理',
  redirect: '/role/role',
  iconClass: 'jiaose',
  children: [
    {
      path: 'role',
      component: Pages.Role,
      beforeEnter,
      name: '角色管理'
    }
  ]
}
