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
      getTabbarWxml() {
         const query = wx.createSelectorQuery().in(this)
         return new Promise(resolve => {
            query.select('.tabbar').boundingClientRect((res) => {
               resolve(res);
            }).exec()
         })
      },
      intoMine() {
         wx.navigateTo({
           url: '/pages/mine/mine'
         })
      }
   }
})
