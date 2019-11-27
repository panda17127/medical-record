//app.js
let util = require("./utils/util");
App({
   onLaunch () {
      util.checkNetConnect();
      this.getSystemInfo();
      this.setBgColor();
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
   // 设置背景
   setBgColor () {
      // wx.removeStorageSync('bgList')
      try {
         let bgList = wx.getStorageSync('bgList');
			if (bgList) {
				return;
			} else {
            let bgList = [];
            let imageUrl = this.globalData.imageUrl;
				for (let i = 0; i < 6; i++) {
					let obj = {};
					if (i === 0) {
						obj.selected = true;
						obj.pic = `${imageUrl}/bg_0${i + 1}.png`;
						bgList[i] = obj;
					} else {
						obj.selected = false;
						obj.pic = `${imageUrl}/bg_0${i + 1}.png`;
						bgList[i] = obj;
					}
				}
				wx.setStorageSync('bgList', bgList);
			}
		} catch (e) {
			console.log(e);
		}
   },
   globalData: {
      systemInfo: null, // 手机参数信息
      imageUrl: 'http://api.jiangling15.cn/uploads/index'
   }
})