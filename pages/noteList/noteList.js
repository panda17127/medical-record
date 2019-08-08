// pages/noteList/noteList.js
let util = require("../../utils/util");
let getWxml = util.getWxml;

let {globalData} = getApp();


let that = undefined;
let doommList = [];
let i = 0;
let ids = 0;
let cycle = null  //计时器

// 弹幕参数
class Doomm {
   constructor(text, top, time) {  //内容，顶部距离，运行时间，颜色（参数可自定义增加）
      this.text = text;
      this.top = top;
      this.time = time;
      this.display = true;
      this.id = i++;
   }
}

Page({
   
   /**
    * 页面的初始数据
    */
   data: {
      doommData: [],
      isIpx: globalData.systemInfo.isIpx,
      sWidth: globalData.systemInfo.screenWidth, // 屏幕宽度
      sHeight: globalData.systemInfo.screenHeight, // 屏幕高度
      noteList: [{name: 1}, {name: 2}, {name: 3}, {name: 4}, {name: 5}, {name: 6}, {name: 7}, {name: 8}, {name: 9}, {name: 10}],  // 笔记列表
   },
   
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      this.showdoomm();
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
    *  显示弹幕
    */
   showdoomm: function () {
      let hHeight = 0;
      this.selectComponent("#header").getHeaderWxml().then(res => {
         hHeight = res.height;
      })
      this.selectComponent("#tabBar").getTabbarWxml().then(res => {
         let sHeight = this.data.sHeight;
         let tHeight = res.height;
         let viewHeight = sHeight - tHeight - 120;
         cycle = setInterval(() => {
            let arr = this.data.noteList;
            let top = Math.floor(Math.random() * (viewHeight - hHeight) + hHeight);
            let time = Math.floor(Math.random() * 5 + 5);
            if (arr[ids] == undefined) {
               ids = 0
               // 1.循环一次，清除计时器
               // doommList = []
               // clearInterval(cycle)
               
               // 2.无限循环弹幕
               doommList.push(new Doomm(arr[ids].name, top, time));
               if (doommList.length > 6) {   //删除运行过后的dom
                  doommList.splice(0, 1)
               }
               this.setData({
                  doommData: doommList
               })
               ids++
            } else {
               doommList.push(new Doomm(arr[ids].name, top, time));
               if (doommList.length > 6) {
                  doommList.splice(0, 1)
               }
               this.setData({
                  doommData: doommList
               })
               ids++
            }
         }, 2000);
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