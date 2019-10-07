const CURRENT = 'prod'
const PROFILES = {
   'dev': {
      baseUrl: 'http://api.jiangling15.cn/index/index'          // 请求接口地址
   },
   'test': {
      baseUrl: 'http://api.jiangling15.cn/index/index'         // 请求接口地址
   },
   'prod': {
      baseUrl: 'http://api.jiangling15.cn/index/index',         // 请求接口地址
   }
}
const ENV = PROFILES[CURRENT]

export { ENV }
