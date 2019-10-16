// pages/note/note.js
let util = require("../../utils/util");
let requestHttps = util.requestHttps;
let { globalData } = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sub_cate_id: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 学科分类
    this.getSubCateList();
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

  /**
   * 请求学科分类
   */
  getSubCateList: function () {
    let sub_cate_id = this.data.sub_cate_id;
    requestHttps({
      url: '/getSubCateList',
      method: 'post',
      data: {
        sub_cate_id
      }
    }).then(res => {
      console.log(res);
    }).catch(res => {
      console.log(res);
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