// pages/noteList/noteList.js
let util = require("../../utils/util");
let getWxml = util.getWxml;

let {globalData} = getApp();

Page({
   
   /**
    * 页面的初始数据
    */
   data: {
      listFlag: 1, // 列表值
      listFlagDefault: 1, // 列表默认值
      isIpx: globalData.systemInfo.isIpx,
      sWidth: globalData.systemInfo.screenWidth, // 屏幕宽度
      sHeight: globalData.systemInfo.screenHeight, // 屏幕高度
      noteList: [{name: 1}, {name: 2}, {name: 3}, {name: 4}, {name: 5}, {name: 6}, {name: 7}, {name: 8}, {name: 9}, {name: 10}, {name: 11}, {name: 12}],  // 笔记列表
   },
   
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
   
   },
   
   /**
    * 生命周期函数--监听页面初次渲染完成
    */
   onReady: function () {
   
   },
   
   /**
    * 生命周期函数--监听页面显示
    */
   onShow: function () {
      this.selectComponent("#danmu").showdoomm();
   },
   /**
    * 生命周期函数--监听页面隐藏
    */
   onHide: function () {
      clearInterval(cycle)
      ids = 0;
      doommList = []
   },
   
   /**
    * 生命周期函数--监听页面卸载
    */
   onUnload: function () {
      clearInterval(cycle)
      ids = 0;
      doommList = []
   },
   
   /**
    * 页面相关事件处理函数--监听用户下拉动作
    */
   onPullDownRefresh: function () {
   
   },
   
   /**
    * 页面上拉触底事件的处理函数
    */
   onReachBottom: function () {
   
   },
   
   /**
    * 用户点击右上角分享
    */
   onShareAppMessage: function () {
   
   }
})