// pages/noteList/noteList.js
let util = require("../../utils/util");
let requestHttps = util.requestHttps;
let formatTime = util.formatTime;
let getMatchWords = util.getMatchWords;

let { globalData } = getApp();
let pagesize = 12;
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		title: '医学记',
		listFlag: 1, // 列表值
		listFlagDefault: 1, // 列表默认值
		isIpx: globalData.systemInfo.isIpx,
		sWidth: globalData.systemInfo.screenWidth, // 屏幕宽度
		sHeight: globalData.systemInfo.screenHeight, // 屏幕高度
		hHeight: 0,  // 头部高度
		tHeight: 0,  // 底部高度
		noteList: [],  // 笔记列表
		isMore: false,
		page: 0
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		console.log(options);
		this.setData({
			title: options.title,
			mean_cate_id: options.id
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
		this.toast = this.selectComponent("#toast");
		this.header = this.selectComponent('#header');
		this.tabbar = this.selectComponent('#tabbar');
		this.danmu = this.selectComponent('#danmu');
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
		this.selectComponent("#danmu").showdoomm();
		// 获取笔记列表
		this.getNoteList();
	},

	/**
    * 请求笔记列表
    */
    getNoteList: function () {
		let union_id = wx.getStorageSync('user').union_id;
		let page = this.data.page;
		let mean_cate_id = this.data.mean_cate_id;
		let keywords = this.data.keywords;
		requestHttps({
		url: '/getNoteList',
		method: 'post',
		data: {
			union_id,
			mean_cate_id,
			keywords,
			page,
			pagesize
		}
		}).then(res => {
			res.forEach(item => {
				item.create_time = formatTime({
					date: parseInt(item.create_time) * 1000,
					format: 'YYYY/MM/DD hh:mm',
					type: '/'
				})
				item.icon = `/assets/img/icon${item.mean_cate_id}.png`;
				item.notes = getMatchWords(item.notes, 50);
			})
			let isMore = this.data.isMore;
			let noteList = this.data.noteList;
			let page = this.data.page;
			if (page === 1) {
				noteList = res
			} else {
				if (res.length === 0) {
				isMore = true;
				}
				noteList = noteList.concat(res);
			}
			this.setData({
				isMore,
				noteList
			})
		}).catch(res => {
			console.log(res);
		})
	},

	/**
    * 进入笔记编辑
    */
	handleIntoNote: function (e) {
		let item = e.detail.item;
		wx.navigateTo({
		url: `./note/note`,
		success: (res) => {
			// 通过eventChannel向被打开页面传送数据
			if (item) {
				res.eventChannel.emit('sendData', { item });
			} else {
				res.eventChannel.emit('sendData', false);
			}
		}
		})
	},

	/**
    * 搜索关键字
    */
   handleConfirmKeyword: function (e) {
	   	wx.showLoading({title: '加载中...'});
		let keywords = e.detail.value;
		this.setData({
			keywords,
			listFlag: 1,
			page: 1
		})
		this.getNoteList();
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
		let title = this.data.title;
		let mean_cate_id = this.data.mean_cate_id;
		this.setData({
			page: 1,
			title,
			mean_cate_id
		})
		this.danmu.stopInterval();
		this.getNoteList();
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {
		let page = this.data.page;
		let listFlag = this.data.listFlag;
		if (listFlag === 1) {
		   this.setData({
			  isMore: false,
			  page: ++page
		   })
		   this.getNoteList();
		}
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})