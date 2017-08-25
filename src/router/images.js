const _import = require('./_import_' + process.env.NODE_ENV)
import Pages from '../pages'
export default {
  path: 'images',
  component: Pages.Abstract,
  name: '截图信息',
  redirect: '/images/imagesInfo',
  iconClass: 'el-icon-picture',
  children: [
    {
      path: 'imagesInfo',
      component: _import('dwz'),
      name: '截图信息'
    },
    {
      path: 'imagesInfoAdd',
      component: _import('dwz'),
      name: 'imagesInfoAdd',
      meta: {
        hidden: true
      }
    },
    {
      path: 'imagesInfoEdit/:id',
      component: _import('dwz'),
      name: 'imagesInfoEdit',
      meta: {
        hidden: true
      }
    },
    {
      path: 'imagesInfoList/:id',
      component: _import('dwz'),
      name: 'imagesInfoList',
      meta: {
        hidden: true
      }
    }
  ]
}
