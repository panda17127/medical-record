//index.js
//获取应用实例
const app = getApp();
let util = require("../../utils/util");
let requestHttps = util.requestHttps;
let getWxml = util.getWxml;

// pages/noteList/filter/filter.js
Page({
	
   /**
    * 页面的初始数据
    */
   data: {
      isLogin: false, //是否登录
      listFlag: 0,  // 列表
      listFlagDefault: 0,  // 列表默认
      hHeight: 0,  // 头部高度
      notebookList: ['临床笔记', '科研笔记', '生活笔记', '我的灵感'],
      noteList: [
      	{
      		name: '周杰不是纠结',
		      icon: '/assets/img/ke.png',
		      sub: '儿科',
		      time: '2019/01/09 12:30'
	      },
	      {
		      name: '周杰不是纠结',
		      icon: '/assets/img/lin.png',
		      sub: '儿科',
		      time: '2019/01/09 12:30'
	      },
	      {
		      name: '周杰不是纠结',
		      icon: '/assets/img/ling.png',
		      sub: '儿科',
		      time: '2019/01/09 12:30'
	      },
	      {
		      name: '周杰不是纠结',
		      icon: '/assets/img/ke.png',
		      sub: '儿科',
		      time: '2019/01/09 12:30'
	      },
	      {
		      name: '周杰不是纠结',
		      icon: '/assets/img/sheng.png',
		      sub: '儿科',
		      time: '2019/01/09 12:30'
	      },
	      {
		      name: '周杰不是纠结',
		      icon: '/assets/img/ke.png',
		      sub: '儿科',
		      time: '2019/01/09 12:30'
	      },
	      {
		      name: '周杰不是纠结',
		      icon: '/assets/img/ke.png',
		      sub: '儿科',
		      time: '2019/01/09 12:30'
	      },
	      {
		      name: '周杰不是纠结',
		      icon: '/assets/img/ke.png',
		      sub: '儿科',
		      time: '2019/01/09 12:30'
	      },
	      {
		      name: '周杰不是纠结',
		      icon: '/assets/img/ke.png',
		      sub: '儿科',
		      time: '2019/01/09 12:30'
	      },
	      {
		      name: '周杰不是纠结',
		      icon: '/assets/img/ke.png',
		      sub: '儿科',
		      time: '2019/01/09 12:30'
	      }
      ],  // 笔记列表
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
      this.danmu =  this.selectComponent('#danmu');
   },
   
   /**
    * 生命周期函数--监听页面显示
    */
   onShow: function () {
   
   },

   /**
    * 获取用户信息
    */
   getUserInfo: function (e) {
      wx.login({
         success: (loginRes) => {
            console.log(loginRes);
            requestHttps({
               url: '/wx_login',
               method: 'post',
               data: {
                  code: loginRes.code,
                  encryptedData: e.detail.encryptedData,
                  iv: e.detail.iv
               }
            }).then(res => {
               console.log(res);
            }).catch(res => {
               console.log(res);
            })
         },
         fail: res => {
            console.log(res);
         }
      })
   },

   /**
    * 登录注册页面
    */
   wxLogin: function () {
      new Promise((resovle, rejected)=> {

      })
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
	   this.danmu.stopInterval();
   },
   
   /**
    * 生命周期函数--监听页面卸载
    */
   onUnload: function () {
	   this.danmu.stopInterval();
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
