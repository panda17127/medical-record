//index.js
//获取应用实例
const app = getApp();
let util = require("../../utils/util");
Page({
   data: {
   
   },
   onLoad () {
      this.handleToHome();
   },
   handleToHome () {
      setTimeout(() => {
         wx.redirectTo({
            url: '../home/home'
         })
      }, 300)
   }
})
