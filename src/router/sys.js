import Hello from '../components/Hello.vue'
import login from '../components/login.vue'

const routes = [
  {
    path: '/account',
    redirect: '/account/login'
  },
  {
    path: '/account/login',
    component: login
  },
  {
    path: '/account/register',
    component: Hello
  },
  {
    path: '/account/findpwd',
    component: Hello
  }
]

export default routes
