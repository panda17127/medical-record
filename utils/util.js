
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
            console.log("请求接口失败");
            console.log(res); 
            reject(res);
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
const formatTime = (date, format, type) => {
   const year = date.getFullYear();
   const month = date.getMonth() + 1;
   const day = date.getDate();
   const hour = date.getHours();
   const minute = date.getMinutes();
   const second = date.getSeconds();
   let dayTemp = [];
   let timeTemp = [];
   // 年月日
   if (format.indexOf('YY') !== -1) {
     dayTemp.push(year);
   }
   if (format.indexOf('MM') !== -1) {
      dayTemp.push(month);
   }
   if (format.indexOf('DD') !== -1) {
      dayTemp.push(day);
   }
   // 时分秒
   if (format.indexOf('hh') !== -1) {
      timeTemp.push(hour);
   }
   if (format.indexOf('mm') !== -1) {
      timeTemp.push(minute);
   }
   if (format.indexOf('ss') !== -1) {
      timeTemp.push(second);
   }
   if (type === '/') {
      return dayTemp.map(formatNumber).join('/') + ' ' + timeTemp.map(formatNumber).join(':');
   } else if (type === '-') {
      return dayTemp.map(formatNumber).join('-') + ' ' + timeTemp.map(formatNumber).join(':');
   } else {
      let timeStr = "";
      if (format.indexOf('YY') !== -1) {
         timeStr = year + '年';
      }
      if (format.indexOf('MM') !== -1) {
         timeStr += month + '月';
      }
      if (format.indexOf('DD') !== -1) {
         timeStr += day + '日';
      }
      if (format.indexOf('hh') !== -1) {
         timeStr += ' ' + hour + '时';
      }
      if (format.indexOf('mm') !== -1) {
         timeStr += minute + '分';
      }
      if (format.indexOf('ss') !== -1) {
         timeStr += second + '秒';
      }
      return timeStr;
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

module.exports = {
   checkNetConnect,
   requestHttps,
   formatTime,
   throttle,
   getWxml
}
