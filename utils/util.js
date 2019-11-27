
import { ENV } from '../config/config'

/**
 *  检查网络连接
 *  返回网络类型, 有效值：
 *  wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
 */
const checkNetConnect = () => {
   return new Promise((resolve, reject) => {
      wx.getNetworkType({
         success: (res) => {
            let networkType = res.networkType;
            if (networkType === 'none') {
               wx.showToast({
                  title: '网络好像不给力耶',
                  icon: 'fail',
                  duration: 2000
               })
                
               wx.stopPullDownRefresh();
               wx.hideNavigationBarLoading();
               return false;
            } else {
               resolve();
            }
         }
      })
   })
}
/**
 * 
 * @param {数据} data 
 *    url：请求路径
 *    method: 请求方法
 *    data:  请求数据 
 */
const requestHttps = (data) => {
   let header = {
      "Content-Type": "application/json"
   }
   let reqHttp = new Promise((resolve, reject) => {
      wx.request({
         url: ENV.baseUrl + data.url,
         data: data.data,
         method: data.method,
         header: header,
         success: res => {
            let code = res.data.code;
            if (code === 0) {
               resolve(res.data.data);
            } else {
               reject(res);
            }
         },
         fail: res => {
            let pages = getCurrentPages();
            let curPage = pages[pages.length - 1];
            curPage.toast.showToast({content: '网络繁忙，请稍后重试'});
            console.log("请求接口失败");
            console.log(res); 
            reject(res);
         },
         complete: res => {
            wx.stopPullDownRefresh();
            wx.hideLoading();
            wx.hideNavigationBarLoading();
         }
      })
   })
   return reqHttp;
}  


/***
 *
 * @param date 日期
 * @param format 格式
 * @param type 连接类型
 * @returns {string}
 */
const formatTime = data => {
   const year = new Date(data.date).getFullYear();
   const month = new Date(data.date).getMonth() + 1;
   const day = new Date(data.date).getDate();
   const hour = new Date(data.date).getHours();
   const minute = new Date(data.date).getMinutes();
   const second = new Date(data.date).getSeconds();
   if (data.format == 'YYYY-MM-DD') {
      return [year, month, day].map(formatNumber).join('.');
   } else if (data.format == 'MM-DD') {
      return [month, day].map(formatNumber).join('-');
   } else if (data.format == 'YYYY-MM-DD hh:mm:ss') {
      return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
   } else if (data.format == 'YYYY-MM-DD hh:mm') {
      return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':');
   } else if (data.format == 'YYYY/MM/DD hh:mm') {
      return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute].map(formatNumber).join(':');
   } else if (data.format == 'activity') {
      return month + '月' + day + '日' + ' ' + [hour, minute].map(formatNumber).join(':');
   } else if (data.format == 'YYYYMMDD') {
      return [year, month, day].map(formatNumber).join('-');
   } else if (data.format == 'hh:mm') {
      return [hour, minute].map(formatNumber).join(':');
   }
}
/***
 *
 * @param n
 * @returns {any}
 */
const formatNumber = n => {
   n = n.toString();
   return n[1] ? n : '0' + n;
}
/***
 *
 * @param fn
 * @param delay 延迟时间
 * @param duration 在隔一段时间内请求一次
 * @returns {Function}
 */
const throttle = (fn, delay, duration) => {
   let timer = null,
      _start = new Date();
   // 不能用箭头函数
   return function () {
      let context = this,
         args = arguments,
         _now = new Date();
      clearTimeout(timer);
      if(_now - _start >= duration){
         fn.apply(context, args);
         _start = _now;
      }else{
         timer = setTimeout(function(){
            fn.apply(context, args);
         }, delay);
      }
   }
}

/***
 *
 * @param name
 * @returns {Promise<any>}
 */
const getWxml = (name) => {
   return new Promise((resolve, reject) => {
      const query = wx.createSelectorQuery()
      query.select(name).boundingClientRect()
      query.selectViewport().scrollOffset()
      query.exec(function(res){
         resolve(res);
      })
   })
}

/**
 * 截取字符串
 * @param {字符串} str 
 * @param {长度} len 
 */
const getMatchWords = (str, len) => {
   let regexp = /[^\x00-\xff]/g;// 正在表达式匹配中文
   if (!str) {
      return;
   }
   // 当字符串字节长度小于指定的字节长度时
   if (str.replace(regexp, "aa").length <= len) {
      return str;
   }
   // 假设指定长度内都是中文
   var m = Math.floor(len / 2);
   for (var i = m, j = str.length; i < j; i++) {
      // 当截取字符串字节长度满足指定的字节长度
      if (str.substring(0, i).replace(regexp, "aa").length >= len) {
         return str.substring(0, i) + "...";
      }
   }
   return str;
}

module.exports = {
   checkNetConnect,
   requestHttps,
   formatTime,
   throttle,
   getWxml,
   getMatchWords
}
