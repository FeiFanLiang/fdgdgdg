import Pages from '../pages'

const beforeEnter = (to, from, next) => {
  let user = JSON.parse(localStorage.getItem('user'));
  if (user.username === 'admin') {
    next();
  } else {
    alert("您没有权限进入该页面！")
    next({
      path: '/404'
    });
  }
};

export default {
  path: 'user',
  component: Pages.Abstract,
  name: '用户管理',
  redirect: '/user/user',
  iconClass: 'el-icon-setting',
  children: [{
    path: 'user',
    component: Pages.User,
    beforeEnter,
    name: '用户管理'
  }]
}
