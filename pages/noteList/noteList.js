// pages/noteList/noteList.js

let { globalData } = getApp();

Page({
   
   /**
    * 页面的初始数据
    */
   data: {
      dmData: [],
      symbolLeft: '{{',
      symbolRight: '}}',
      screenWidth: globalData.systemInfo.screenWidth, // 屏幕宽度
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
      // this.handleAnimation();
      this.setDM();
   },
   
   // 动画显示
   handleAnimation() {
      let noteList = this.data.noteList;
      noteList.forEach((item, index) => {
         let animation = wx.createAnimation({
            duration: Math.round(Math.random()* 4000 + 4000),
            timingFunction: 'linear',
         })
         this.animation = animation

         animation.translateX(-375).step()

         let animationName = "animationData" + index;
         item.animationData = animation.export();
         this.setData({
            noteList
         })
      })
      console.log(this.data);
   },
   
   // 处理弹幕位置
   setDM: function () {
      // 处理弹幕参数
      const dmArr = [];
      const _b = this.data.noteList;
      for (let i = 0; i < _b.length; i++) {
         const time = Math.floor(Math.random() * 10);
         const _time = time < 6 ? 6 + i : time + i;
         const top = Math.floor(Math.random() * 80) + 2;
         const _p = {
            id: _b[i].id,
            sex: _b[i].sex,
            content: _b[i].content,
            zanNumber: _b[i].zanNumber,
            top,
            time: _time,
         };
         dmArr.push(_p);
      }
      this.setData({
         dmData: dmArr
      });
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