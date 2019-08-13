//index.js
//获取应用实例
const app = getApp();
let util = require("../../utils/util");
let getWxml = util.getWxml;

// pages/noteList/filter/filter.js
Page({
   
   /**
    * 页面的初始数据
    */
   data: {
      listFlag: 0,  // 列表
      listFlagDefault: 0,  // 列表默认
      hHeight: 0,  // 头部高度
      notebookList: ['临床笔记', '科研笔记', '生活笔记', '我的灵感'],
      noteList: [{name: 1}, {name: 2}, {name: 3}, {name: 4}, {name: 5}, {name: 6}, {name: 7}, {name: 8}, {name: 9}, {name: 10}, {name: 11}, {name: 12}],  // 笔记列表
   },
   
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      this.selectComponent("#header").getHeaderWxml().then(res => {
         this.setData({
            hHeight: res.height
         })
      })
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
   
   },
   
   /***
    * 进入笔记列表
    */
   intoNoteList: function () {
     wx.navigateTo({
       url: '../noteList/noteList'
     }) 
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
