import 'babel-polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './libs/date'
import { Breadcrumb } from 'components'
import DeleteButton from 'components/common/delete-button.vue'
import CustomTable from 'components/common/custom-table.vue'

axios.defaults.withCredentials = true
// const VueProgressBarOptions = {
//   color: '#13ce66',
//   failedColor: '#FF4949',
//   height: '4px'
// };
// import VueProgressBar from './libs/vue-progressbar';
// import VueAxiosProgressBarInterceptor from './libs/vue-axios-progressbar-interceptor';
// Vue.use(VueProgressBar, VueProgressBarOptions);
// Vue.use(VueAxiosProgressBarInterceptor);

// import Mock from './mock';
// Mock.bootstrap();

import App from './app.vue'
import routes from './router'
import './style.scss'

// import 'plugins/'
import 'mixin/'

import store from './store/'
Vue.use(VueRouter)
Vue.use(ElementUI)

import NProgress from 'nprogress'

Vue.component('db-breadcrumb', Breadcrumb)
Vue.component('DeleteButton', DeleteButton)
Vue.component('CustomTable', CustomTable)

export const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      NProgress.start()
    }
  }
  next()
})
router.afterEach(transition => {
  NProgress.done()
})

// axios.interceptors.request.use(function(config) {
//     return config;
// }, function(error) {

//     return Promise.reject(error);
// });

axios.interceptors.response.use(
  function (response) {
    if (response.status === 320) {
      router.replace({
        name: 'login',
        query: { redirect: router.currentRoute.fullPath }
      })
    }
    return response
  }
  // function(error) {
  //    if(error&&error.stack&&typeof error.stack==='string'&&error.stack.indexOf('XMLHttpRequest.handleError')>0){
  //     // VueRouter.push({
  //     //   path:'login'
  //     // })
  //    }else{
  //     return Promise.reject(error);
  //    }

  // }
)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
/* Vue.component('jsx-example', {
  render (h) { // <-- h must be in scope
    return <div id="foo">bar</div>
  }
}) */

/**
 *               ii.                                         ;9ABH,
 *              SA391,                                    .r9GG35&G
 *              &#ii13Gh;                               i3X31i;:,rB1
 *              iMs,:,i5895,                         .5G91:,:;:s1:8A
 *               33::::,,;5G5,                     ,58Si,,:::,sHX;iH1
 *                Sr.,:;rs13BBX35hh11511h5Shhh5S3GAXS:.,,::,,1AG3i,GG
 *                .G51S511sr;;iiiishS8G89Shsrrsh59S;.,,,,,..5A85Si,h8
 *               :SB9s:,............................,,,.,,,SASh53h,1G.
 *            .r18S;..,,,,,,,,,,,,,,,,,,,,,,,,,,,,,....,,.1H315199,rX,
 *          ;S89s,..,,,,,,,,,,,,,,,,,,,,,,,....,,.......,,,;r1ShS8,;Xi
 *        i55s:.........,,,,,,,,,,,,,,,,.,,,......,.....,,....r9&5.:X1
 *       59;.....,.     .,,,,,,,,,,,...        .............,..:1;.:&s
 *      s8,..;53S5S3s.   .,,,,,,,.,..      i15S5h1:.........,,,..,,:99
 *      93.:39s:rSGB@A;  ..,,,,.....    .SG3hhh9G&BGi..,,,,,,,,,,,,.,83
 *      G5.G8  9#@@@@@X. .,,,,,,.....  iA9,.S&B###@@Mr...,,,,,,,,..,.;Xh
 *      Gs.X8 S@@@@@@@B:..,,,,,,,,,,. rA1 ,A@@@@@@@@@H:........,,,,,,.iX:
 *     ;9. ,8A#@@@@@@#5,.,,,,,,,,,... 9A. 8@@@@@@@@@@M;    ....,,,,,,,,S8
 *     X3    iS8XAHH8s.,,,,,,,,,,...,..58hH@@@@@@@@@Hs       ...,,,,,,,:Gs
 *    r8,        ,,,...,,,,,,,,,,.....  ,h8XABMMHX3r.          .,,,,,,,.rX:
 *   :9, .    .:,..,:;;;::,.,,,,,..          .,,.               ..,,,,,,.59
 *  .Si      ,:.i8HBMMMMMB&5,....                    .            .,,,,,.sMr
 *  SS       :: h@@@@@@@@@@#; .                     ...  .         ..,,,,iM5
 *  91  .    ;:.,1&@@@@@@MXs.                            .          .,,:,:&S
 *  hS ....  .:;,,,i3MMS1;..,..... .  .     ...                     ..,:,.99
 *  ,8; ..... .,:,..,8Ms:;,,,...                                     .,::.83
 *   s&: ....  .sS553B@@HX3s;,.    .,;13h.                            .:::&1
 *    SXr  .  ...;s3G99XA&X88Shss11155hi.                             ,;:h&,
 *     iH8:  . ..   ,;iiii;,::,,,,,.                                 .;irHA
 *      ,8X5;   .     .......                                       ,;iihS8Gi
 *         1831,                                                 .,;irrrrrs&@
 *           ;5A8r.                                            .:;iiiiirrss1H
 *             :X@H3s.......                                .,:;iii;iiiiirsrh
 *              r#h:;,...,,.. .,,:;;;;;:::,...              .:;;;;;;iiiirrss1
 *             ,M8 ..,....,.....,,::::::,,...         .     .,;;;iiiiiirss11h
 *             8B;.,,,,,,,.,.....          .           ..   .:;;;;iirrsss111h
 *            i@5,:::,,,,,,,,.... .                   . .:::;;;;;irrrss111111
 *            9Bi,:,,,,......                        ..r91;;;;;iirrsss1ss1111
 */
