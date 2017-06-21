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
      component: Pages.ImagesInfo,
      name: '截图信息'
    },
    {
      path: 'imagesInfoAdd',
      component: Pages.ImagesInfoAdd,
      name: 'imagesInfoAdd',
      meta: {
        hidden: true
      }
    },
    {
      path: 'imagesInfoEdit/:id',
      component: Pages.ImagesInfoEdit,
      name: 'imagesInfoEdit',
      meta: {
        hidden: true
      }
    },
    {
      path: 'imagesInfoList/:id',
      component: Pages.ImagesInfoList,
      name: 'imagesInfoList',
      meta: {
        hidden: true
      }
    }
  ]
}
