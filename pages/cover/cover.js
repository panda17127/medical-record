//index.js
//获取应用实例
const app = getApp();
let util = require("../../utils/util");
Page({
   data: {
   
   },
   onLoad () {
   
   },
   handleToHome () {
      wx.navigateTo({
        url: '../home/home'
      })
   }
})
