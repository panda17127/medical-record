// pages/note/note.js
let util = require("../../../utils/util");
let requestHttps = util.requestHttps;
let { globalData } = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    beforeNotes: '',  // 原来的笔记
    note: {
      sub_cate_name: '请选择',
      subject_name: '请先选择科室,再选择学科',
      mean_cate_id: 1,
      sub_cate_id: '',
      notes: ''
    },
    subDisabled: true,
    isAdd: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let note = this.data.note;
    if (Object.keys(options).length === 0) {
      let eventChannel = this.getOpenerEventChannel();
      if (Object.keys(eventChannel).length > 0) {
        eventChannel.on('sendData', (data) => {
          this.setData({
            beforeNotes: data.item.notes,
            note: data.item,
            isAdd: false
          })
          // 学科分类
          this.getSubCateList();
        })
      }
    } else {
      note.mean_cate_id = options.mean_cate_id;
      this.setData({
        note
      })
      // 学科分类
      this.getSubCateList();
    }
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
    let mean_cate_id = this.data.note.mean_cate_id;
    let union_id = wx.getStorageSync('user').union_id;
    requestHttps({
      url: '/getSubCateList',
      method: 'post',
      data: {
        union_id,
        mean_cate_id
      }
    }).then(res => {
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

    let union_id = wx.getStorageSync('user').union_id;
    let note = this.data.note;
    let subCateList = this.data.subCateList;
    note.sub_cate_name = subCateList[idx].sub_cate_name;
    note.sub_cate_id = subCateList[idx].sub_cate_id;
    // 科室名称
    this.setData({
      subDisabled: false,
      note
    })
    // 学科列表
    requestHttps({
      url: '/getSubjectList',
      method: 'post',
      data: {
        union_id,
        sub_cate_id: note.sub_cate_id
      }
    }).then(res => {
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
    let note = this.data.note;
    let subjectList = this.data.subjectList;
    note.subject_name = subjectList[idx].subject_name;
    note.subject_id = subjectList[idx].subject_id;
    this.setData({
      note
    })
  },

  /**
   * 提交笔记
   */
  handleAddNote: function (e) {
    let note = this.data.note;
    let beforeNotes = this.data.beforeNotes;
    let notes = e.detail.value.notes;
    let sub_cate_name = e.detail.value.sub_cate_name;
    let subject_name = e.detail.value.subject_name;

    if (!note.sub_cate_id && !sub_cate_name) {
      this.toast.showToast({content: '请选择所在科室'});
      return;
    }
    if (!note.subject_id && !subject_name) {
      this.toast.showToast({content: '请选择研究学科'});
      return;
    }
    if (!notes) {
      this.toast.showToast({content: '请输入笔记'});
      return;
    }
    if (beforeNotes === notes) {
      this.toast.showToast({content: '请修改后，再保存'});
      return;
    }

    let user = wx.getStorageSync('user');
    let union_id = user.union_id;
    let noteObj = {};
    if (note.sub_cate_id) {
      noteObj.sub_cate_id = note.sub_cate_id;
    } else {
      noteObj.sub_cate_name = sub_cate_name;
    }
    if (note.subject_id) {
      noteObj.subject_id = note.subject_id;
    } else {
      noteObj.subject_name = subject_name;
    }
    noteObj.mean_cate_id = note.mean_cate_id;
    noteObj.union_id = union_id;
    noteObj.notes = notes;
    wx.showLoading({title: '保存中...'});

    if (this.data.isAdd) {
      // 添加笔记
      requestHttps({
        url: '/addNote',
        method: 'post',
        data: { ...noteObj }
      }).then(res => {
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2];
        prevPage.toast.showToast({content: '保存成功'});
        wx.navigateBack();
        wx.hideLoading();
      }).catch(res => {
        console.log(res);
      })
    } else {
      noteObj.note_id = note.note_id;
      // 编辑笔记
      requestHttps({
        url: '/editNote',
        method: 'post',
        data: { ...noteObj }
      }).then(res => {
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2];
        prevPage.toast.showToast({content: '保存成功'});
        wx.navigateBack();
        wx.hideLoading();
      }).catch(res => {
        console.log(res);
      })
    }
    
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