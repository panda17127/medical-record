// pages/noteList/noteList.js
let util = require("../../utils/util");
let getWxml = util.getWxml;

let { globalData } = getApp();
Page({
   
   /**
    * 页面的初始数据
    */
   data: {
      dmData: [],
      symbolLeft: '{{',
      symbolRight: '}}',
      isIpx: globalData.systemInfo.isIpx,
      sWidth: globalData.systemInfo.screenWidth, // 屏幕宽度
      sHeight: globalData.systemInfo.screenHeight, // 屏幕高度
      noteList: [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: 6},{name: 7},{name: 8},{name: 9},{name: 10}],  // 笔记列表
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
      this.handleAnimation();
      // this.setDM();
   },
   
   // 动画显示
   handleAnimation() {
      let noteList = this.data.noteList;
      let hHeight = 0;
      this.selectComponent("#header").getHeaderWxml().then(res => {
         hHeight = res.height;
      })
      this.selectComponent("#tabBar").getTabbarWxml().then(res => {
         let sHeight = this.data.sHeight;
         let sWidth = this.data.sWidth;
         let tHeight = res.height;
         let viewHeight = sHeight - tHeight - 120;
   
         noteList.forEach((item, index) => {
            item.top = Math.floor(Math.random() * (viewHeight - hHeight)+ hHeight) ;
            item.tx = 0 - Math.floor(Math.random() * 10) + sWidth;
            let animation = wx.createAnimation({
               duration: Math.round(Math.random()* 4000 + 4000),
               timingFunction: 'linear',
            })
            this.animation = animation;
      
            animation.translateX(-375).step();
      
            let animationName = "animationData" + index;
            item.animationData = animation.export();
            this.setData({
               noteList
            })
         })
      })
      console.log(this.data);
   },
   
   // 处理弹幕位置
   setDM: function () {
      // 处理弹幕参数
      const _b = this.data.noteList;
      let hHeight = 0;
      this.selectComponent("#header").getHeaderWxml().then(res => {
         hHeight = res.height;
      })
      this.selectComponent("#tabBar").getTabbarWxml().then(res => {
         let sHeight = this.data.sHeight;
         let tHeight = res.height;
         let viewHeight = sHeight - tHeight - 120;
         
         // let dmData = this.data.dmData;
         // _b.forEach((item, index) => {
         //    const time = Math.floor(Math.random() * 10);
         //    const _time = time < 6 ? 6 + index : time + index;
         //    const top = Math.floor(Math.random() * (viewHeight - hHeight)+ hHeight) ;
         //    const _p = {
         //       top,
         //       time: _time,
         //       name: item.name
         //    };
         //    dmData.push(_p);
         //    this.setData({
         //       dmData
         //    });
         // })
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