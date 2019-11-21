//index.js
//获取应用实例
const app = getApp();
let util = require("../../utils/util");
let requestHttps = util.requestHttps;
let formatTime = util.formatTime;
// pages/noteList/filter/filter.js
Page({
	
   /**
    * 页面的初始数据
    */
   data: {
      page:0,
      isMore: false,
      isLogin: false, //是否登录
      listFlag: 0,  // 列表
      listFlagDefault: 0,  // 列表默认
      hHeight: 0,  // 头部高度
      tHeight: 0,  // 底部高度
      notebookList: [], // 主菜单列表
      noteList: [],  // 笔记列表
   },
   
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      // 登录判断
      let user = wx.getStorageSync('user');
      if (user) {
         this.setData({
            isLogin: true
         })
      }
      // 主菜单列表
      this.getMeanCateList();
      // 笔记列表
      this.getNoteList();
   },
   
   /**
    * 生命周期函数--监听页面初次渲染完成
    */
   onReady: function () {
      this.toast = this.selectComponent('#toast');
      this.header = this.selectComponent('#header');
      this.tabbar = this.selectComponent('#tabbar');
      // 头部高度
      this.header.getHeaderWxml().then(res => {
         this.setData({
            hHeight: res.height
         })
      })
      // 底部高度
      this.tabbar.getTabbarWxml().then(res => {
         this.setData({
            tHeight: res.height
         })
      })
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
      wx.showLoading({title: '正在登录...'});
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
               // 存入用户数据
               wx.setStorageSync('user', res);
               // 隐藏遮罩
               this.setData({
                  isLogin: true
               })
               wx.hideLoading();
            }).catch(res => {
               console.log(res);
               wx.hideLoading();
            })
         },
         fail: res => {
            console.log(res);
         }
      })
   },
   
   /**
    * 请求主菜单列表
    */
   getMeanCateList: function () {
      requestHttps({
         url: '/getMeanCateList',
         method: 'post'
      }).then(res => {
         this.setData({
            notebookList: res
         })
      }).catch(res => {
         console.log(res);
      })
   },
   
   /**
    * 请求笔记列表
    */
   getNoteList: function () {
      let user = wx.getStorageSync('user');
      let page = this.data.page;
      requestHttps({
         url: '/getNoteList',
         method: 'post',
         data: {
            union_id: user.union_id,
            page
         }
      }).then(res => {
         res.forEach(item => {
				item.create_time = formatTime({
					date: parseInt(item.create_time) * 1000,
					format: 'YYYY/MM/DD hh:mm',
					type: '/'
				})
				item.icon = `/assets/img/icon${item.mean_cate_id}.png`
			})
			console.log(res);
			let isMore = this.data.isMore;
			if (res.length > 10) {
				isMore = true
         }
			this.setData({
				isMore,
				noteList: res
			})
      }).catch(res => {
         console.log(res);
      })
   },

   /***
    * 进入笔记列表
    */
   intoNoteList: function (e) {
      let id = e.currentTarget.dataset.id;
      let title = e.currentTarget.dataset.title;
      wx.navigateTo({
         url: `../noteList/noteList?id=${id}&title=${title}`
      }) 
   },
   
   /**
    * 生命周期函数--监听页面隐藏
    */
   onHide: function () {
      if (this.data.listFlag !== 0) {
         this.selectComponent('#danmu').stopInterval();  
      }
   },
   
   /**
    * 生命周期函数--监听页面卸载
    */
   onUnload: function () {
      if (this.data.listFlag !== 0) {
         this.selectComponent('#danmu').stopInterval();  
      }
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
