// components/tabbar/index.js
Component({
   /**
    * 组件的属性列表
    */
   properties: {},
   
   /**
    * 组件的初始数据
    */
   data: {},
   
   /**
    * 组件的方法列表
    */
   methods: {
      /***
       * 获取组件高度
       * @returns {Promise<any>}
       */
      getTabbarWxml() {
         const query = wx.createSelectorQuery().in(this)
         return new Promise(resolve => {
            query.select('.tabbar').boundingClientRect((res) => {
               resolve(res);
            }).exec()
         })
      },
      /***
       * 进入中心
       */
      intoMine() {
         wx.navigateTo({
           url: '/pages/mine/mine'
         })
      },
      /***
       * 切换列表
       */
      toggleList() {
         let pages = getCurrentPages();
         let curPage = pages[pages.length - 1];
         curPage.setData({
            listFlag: !curPage.data.listFlag
         })
      }
   }
})
