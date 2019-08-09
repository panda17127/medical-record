// components/header/index.js
let { globalData } = getApp();
Component({
   /**
    * 组件的属性列表
    */
   properties: {
      back: {
         type: Boolean,
         value: false
      },
      title: {
         type: String,
         value: '医学记'
      }
   },
   
   /**
    * 组件的初始数据
    */
   data: {
      statusBarHeight: globalData.systemInfo.statusBarHeight
   },
   
   /**
    * 组件的方法列表
    */
   methods: {
      getHeaderWxml() {
         const query = wx.createSelectorQuery().in(this)
         return new Promise(resolve => {
            query.select('.header').boundingClientRect((res) => {
               resolve(res);
            }).exec()
         })
      },
      intoFilter() {
         wx.navigateTo({
           url: '/pages/noteList/filter/filter'
         })
      },
      back() {
         wx.navigateBack();
      }
   }
})
