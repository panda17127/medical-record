//index.js
//获取应用实例
const app = getApp();
let util = require("../../utils/util");

// pages/noteList/filter/filter.js
Page({
   
   /**
    * 页面的初始数据
    */
   data: {
      notebookList: ['临床笔记', '科研笔记', '生活笔记', '讨论分享']
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
   
   },
   
   /**
    * 生命周期函数--监听页面卸载
    */
   onUnload: function () {
   
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
