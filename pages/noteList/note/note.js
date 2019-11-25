// pages/note/note.js
let util = require("../../../utils/util");
let requestHttps = util.requestHttps;
let { globalData } = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateName: '请选择',
    subName: '请先选择科室,再选择学科',
    mean_cate_id: 1,
    subDisabled: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      mean_cate_id: options.mean_cate_id
    })
    // 学科分类
    this.getSubCateList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.toast = this.selectComponent('#toast');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 请求科室分类
   */
  getSubCateList: function () {
    let mean_cate_id = this.data.mean_cate_id;
    requestHttps({
      url: '/getSubCateList',
      method: 'post',
      data: {
        mean_cate_id
      }
    }).then(res => {
      console.log(res);
      this.setData({
        subCateList: res
      })
    }).catch(res => {
      console.log(res);
    })
  },

  /**
   * 选择科室
   */
  handleChangeCate: function (e) {
    let idx = e.detail.value;
    if (!idx) {
      return;
    }

    let subCateList = this.data.subCateList;
    let cateName = subCateList[idx].sub_cate_name;
    let sub_cate_id = subCateList[idx].sub_cate_id;
    // 科室名称
    this.setData({
      subDisabled: false,
      subName: '请选择',
      cateName
    })
    // 学科列表
    requestHttps({
      url: '/getSubjectList',
      method: 'post',
      data: {
        sub_cate_id
      }
    }).then(res => {
      console.log(res);
      this.setData({
        subjectList: res
      })
    }).catch(res => {
      console.log(res);
    })
  },

  /**
   * 选择学科
   */
  handleChangeSub: function (e) {
    let idx = e.detail.value;
    let subjectList = this.data.subjectList;
    let subName = subjectList[idx].subject_name;
    this.setData({
      subName
    })
  },

  /**
   * 提交笔记
   */
  handleAddNote: function (e) {
    console.log(e);
    let cateIdx = e.detail.value.cateIdx;
    let subIdx = e.detail.value.subIdx;
    let notes = e.detail.value.notes;
    let user = wx.getStorageSync('user');
    let union_id = user.union_id;
    let mean_cate_id = this.data.mean_cate_id;
    let subCateList = this.data.subCateList;
    let subjectList = this.data.subjectList;
    let sub_cate_id = subCateList[cateIdx].sub_cate_id;
    let subject_id = subjectList[subIdx].subject_id;
    if (!cateIdx) {
      this.toast.showToast({content: '请选择科室'});
      return;
    }
    if (!subIdx) {
      this.toast.showToast({content: '请选择学科'});
      return;
    }
    if (!notes) {
      this.toast.showToast({content: '请输入笔记'});
      return;
    }
    wx.showLoading({title: '保存中...'});
    // 添加笔记
    requestHttps({
      url: '/addNote',
      method: 'post',
      data: {
        union_id,
        mean_cate_id,
        sub_cate_id,
        subject_id,
        notes
      }
    }).then(res => {
      let pages = getCurrentPages();
      let prevPage = pages[pages.length - 2];
      prevPage.toast.showToast({content: '保存成功'});
      wx.navigateBack();
      wx.hideLoading();
    }).catch(res => {
      console.log(res);
    })

  },

  /**
   * 判断是否为空
   */
  handleIsNull: function (name, content) {
    if (!name) {
      this.toast.showToast({ content });
      return;
    }
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