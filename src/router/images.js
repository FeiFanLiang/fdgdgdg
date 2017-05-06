import Pages from '../pages';
module.exports = {
  path: 'images',
  component: Pages.Abstract,
  name: '截图信息',
  iconClass: 'el-icon-picture',
  children: [
    {
      path: 'imagesInfo',
      component: Pages.ImagesInfo,
      name: '截图信息',
      imgUrl: 'https://o0p2g4ul8.qnssl.com/vsite%2Fbackground.jpg'
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
};
