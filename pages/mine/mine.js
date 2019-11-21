// pages/mine/mine.js

let util = require("../../utils/util");
let requestHttps = util.requestHttps;

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		wordList: [
			{
				name: '临床',
				artcleNum: 5,
				wordNum: 5000
			},
			{
				name: '临床',
				artcleNum: 5,
				wordNum: 500
			},
			{
				name: '临床',
				artcleNum: 5,
				wordNum: 500000
			},
			{
				name: '临床',
				artcleNum: 5,
				wordNum: 50
			}
		],
		mineList: [
			{
				name: '通告',
				fn: 'handleToNotice'
			},
			{
				name: '背景',
				fn: 'handleToBg'
			},
			{
				name: '语言',
				fn: 'handleToLang'
			},
			{
				name: '系统',
				fn: 'handleToSetting'
			},
			{
				name: '关于',
				fn: 'handleToAbout'
			}
		]
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		// 获取会员信息
		this.getUnionInfo();
		// 汇总数据
		this.getUnionNote();
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
	 * 获取会员信息
	 */
	getUnionInfo: function () {
		let union_id = wx.getStorageSync('user').union_id;
		requestHttps({
			url: '/getUnionInfo',
			method: 'post',
			data: {
				union_id
			}
		}).then(res => {
			console.log(res);
		}).catch(res => {
			console.log(res);
		})
	},

	/**
	 * 获取汇总数据
	 */
	getUnionNote: function () {
		let union_id = wx.getStorageSync('user').union_id;
		requestHttps({
			url: '/getUnionNote',
			method: 'post',
			data: {
				union_id
			}
		}).then(res => {
			console.log(res);
			this.setData({
				wordList: res
			})
		}).catch(res => {
			console.log(res);
		})
	},

	/***
	 *  公告页面
	 */
	handleToNotice: function () {
		wx.navigateTo({
			url: './notice/notice'
		})
	},

	/**
	 * 背景
	 */
	handleToBg: function () {
		wx.navigateTo({
			url: './background/background'
		})
	},

	/**
	 * 语言
	 */
	handleToLang: function () {
		wx.navigateTo({
			url: './language/language'
		})
	},

	/**
	 * 系统
	 */
	handleToSetting: function () {
		wx.navigateTo({
			url: './setting/setting'
		})
	},

	/***
    * 关于医学记
    */
	handleToAbout: function () {
		wx.navigateTo({
			url: './about/about'
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