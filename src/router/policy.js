import Pages from '../pages'
const children = [
    {
      path: 'pay-company',
      name: '公司支付账号',
      component: Pages.PayCompany
    },
    {
      path: 'hotel-paymode',
      name: '支付方式',
      component: Pages.HotelPayMode
    }
  ]
    // [
    //   {
    //     "ID": "2F8768AB-9E80-4804-88C0-4FD7B0AB2345",
    //     "ParentId": "461D50D4-E0C0-4A3F-96D9-4B9E4FF9F0FA",
    //     "MenuCode": "pay-company",
    //     "MenuName": "公司支付账号",
    //     "Icon": null,
    //     "UrlAddress": "/policy/pay-company",
    //     "Target": null,
    //     "IsMenu": false,
    //     "SortCode": 1,
    //     "DisabledMark": false,
    //     "Children": []
    //   },
    //   {
    //     "ID": "8AB19B43-1E4B-4E02-BFA5-C7F592F31BF5",
    //     "ParentId": "461D50D4-E0C0-4A3F-96D9-4B9E4FF9F0FA",
    //     "MenuCode": "hotel-paymode",
    //     "MenuName": "支付方式",
    //     "Icon": null,
    //     "UrlAddress": "/policy/hotel-paymode",
    //     "Target": null,
    //     "IsMenu": false,
    //     "SortCode": 2,
    //     "DisabledMark": false,
    //     "Children": []
    //   }
    // ]
export default {
  path: 'policy',
  component: Pages.Abstract,
  name: '政策',
  redirect: '/policy/pay-company',
  iconClass: 'el-icon-setting',
  children: children
}
