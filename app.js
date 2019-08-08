//app.js
App({
   onLaunch () {
      this.getSystemInfo();
   },
   // 获取手机参数信息
   getSystemInfo () {
      try {
         const res = wx.getSystemInfoSync();
         console.log(res);
         if (res.model.indexOf('iPhone X') !== -1) {
            res.isIpx = true;
         } else {
            res.isIpx = false;
         }
         // 是否为iphonx
         this.globalData.systemInfo = res;
      } catch (e) {
         // Do something when catch error
         console.log("获取手机参数信息失败");
      }
   },
   globalData: {
      systemInfo: null, // 手机参数信息
   }
})