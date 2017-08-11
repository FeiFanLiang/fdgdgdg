const base = 'http://192.168.10.95:8500/' // 正式
const outsideBase = 'http://60.209.152.178:8500/'
//  const base='http://192.168.10.95:8501/' //测试
// const base='http://weixinredirect.qdjp.cn/' //对外
// const base='http://liukai.iok.la/'

console.log(window.location.host)
let url = ''
if (window.location.host.indexOf('192.168') > -1) {
  url = base
} else {
  url = outsideBase
}

export default {
  apiBaseUrl: url,
  uploadUrl: url + 'Hotel/Image/',
  imageUrl: url + 'upload/'
}
