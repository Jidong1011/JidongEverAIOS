const ENV = 'dev'

const CONFIG = {
  dev: {
    baseUrl: 'https://funnyaicloud.com/fuint-application/',
    apiPrefix: '/clientApi',
    merchantNo: '10001',
    storeId: '2'
  },
  prod: {
    baseUrl: 'https://your-domain.com',
    apiPrefix: '/clientApi',
    merchantNo: '10001',
    storeId: '2'
  }
}

const imgUrl = 'https://concal-shop.oss-cn-chengdu.aliyuncs.com'
const currentConfig = CONFIG[ENV]

module.exports = {
  ENV,
  baseUrl: currentConfig.baseUrl,
  apiPrefix: currentConfig.apiPrefix,
  apiUrl: currentConfig.baseUrl + currentConfig.apiPrefix,
  merchantNo: currentConfig.merchantNo,
  storeId: currentConfig.storeId,
  imgUrl: imgUrl
}
