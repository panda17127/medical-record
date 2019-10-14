// component/toast/toast.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
     content: {
         type: String,
         value: '内容'
     },
     time: {
         type: Number,
         value: 2000
     },
     position: {
         type: String,
         value: 'middle'
     }
  },

  /**
   * 组件的初始数据
   */
  data: {
     flag: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
     showToast(options) {
        if (options.content) {
           this.setData({
              content: options.content
           })
        } else {
           return;
        }
        if (options.position) {
           this.setData({
              position: options.position
           })
        }
        this.setData({
           flag: !this.data.flag
        })

        if (options.time) {
           this.hideToast(options.time);
        } else {
           this.hideToast(this.data.time);
        }
     },
     hideToast: function (time) {
        // console.log(time);
        setTimeout(()=>{
           this.setData({
              flag: !this.data.flag
           })
        },time)
     }
  }
})
