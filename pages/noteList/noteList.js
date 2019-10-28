// pages/noteList/noteList.js
let util = require("../../utils/util");
let getWxml = util.getWxml;

let { globalData } = getApp();

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
		noteList: [
			{
				name: '周杰不是纠结',
				icon: '/assets/img/ke.png',
				sub: '妇产科',
				time: '2019/01/09 12:30'
			},
			{
				name: '周杰不是纠结',
				icon: '/assets/img/lin.png',
				sub: '妇产科',
				time: '2019/01/09 12:30'
			},
			{
				name: '周杰不是纠结',
				icon: '/assets/img/ling.png',
				sub: '妇产科',
				time: '2019/01/09 12:30'
			},
			{
				name: '周杰不是纠结',
				icon: '/assets/img/ke.png',
				sub: '妇产科',
				time: '2019/01/09 12:30'
			},
			{
				name: '周杰不是纠结',
				icon: '/assets/img/sheng.png',
				sub: '妇产科',
				time: '2019/01/09 12:30'
			},
			{
				name: '周杰不是纠结',
				icon: '/assets/img/ke.png',
				sub: '妇产科',
				time: '2019/01/09 12:30'
			},
			{
				name: '周杰不是纠结',
				icon: '/assets/img/ke.png',
				sub: '妇产科',
				time: '2019/01/09 12:30'
			},
			{
				name: '周杰不是纠结',
				icon: '/assets/img/ke.png',
				sub: '妇产科',
				time: '2019/01/09 12:30'
			},
			{
				name: '周杰不是纠结',
				icon: '/assets/img/ke.png',
				sub: '妇产科',
				time: '2019/01/09 12:30'
			},
			{
				name: '周杰不是纠结',
				icon: '/assets/img/ke.png',
				sub: '妇产科',
				time: '2019/01/09 12:30'
			}
		],  // 笔记列表
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
		this.header = this.selectComponent('#header');
		this.danmu = this.selectComponent('#danmu');
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		this.selectComponent("#danmu").showdoomm();
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