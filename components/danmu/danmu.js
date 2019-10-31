// components/danmu.js
let util = require("../../utils/util");
let getWxml = util.getWxml;

let {globalData} = getApp();

let that = undefined;
let doommList = [];
let i = 0;
let ids = 0;
let cycle = null; //计时器

let pages = getCurrentPages();
let curPage = pages[pages.length - 1];

// 弹幕参数
class Doomm {
   constructor(text, top, time, icon) {  //内容，顶部距离，运行时间，颜色（参数可自定义增加）
      this.text = text;
      this.top = top;
      this.time = time;
      this.display = true;
      this.icon = icon;
      this.id = i++;
   }
}

Component({
   /**
    * 组件的属性列表
    */
   properties: {
      noteList: {
         type: Array,
         value: []
      },
      listFlag: {
         type: Number,
         value: 0
      }
   },
   
   /**
    * 组件的初始数据
    */
   data: {
      listFlag: 1,
      doommData: [],
      sWidth: globalData.systemInfo.screenWidth, // 屏幕宽度
      sHeight: globalData.systemInfo.screenHeight, // 屏幕高度
   },
   ready: function() {
      // console.log(curPage.selectComponent("#header"));
	   // curPage.selectComponent("#header").getHeaderWxml().then(res => {
		//    this.setData({
		// 	   hHeight: res.height
		//    })
	   // })
	   // this.selectComponent("#tabBar").getTabbarWxml().then(res => {
		//    this.setData({
		// 	   tHeight: res.height
		//    })
	   // })
   },
   /**
    * 组件的方法列表
    */
   methods: {
      /***
       *  显示弹幕
       */
      showdoomm () {
         let hHeight = 0;
         curPage.selectComponent("#header").getHeaderWxml().then(res => {
            hHeight = res.height;
            this.setData({
               hHeight
            })
         })
         this.selectComponent("#tabBar").getTabbarWxml().then(res => {
            let sHeight = this.data.sHeight;
            let tHeight = res.height;
            let viewHeight = sHeight - tHeight - 120;
            let arr = this.properties.noteList;
            this.setData({
               tHeight,
               noteList: arr
            })
				let timer = () => {
					let top = Math.floor(Math.random() * (viewHeight - hHeight) + hHeight);
					let time = Math.floor(Math.random() * 5 + 5);
					let icon = Math.floor(Math.random() * 3 + 1);
					if (arr[ids] == undefined) {
						ids = 0
						// 1.循环一次，清除计时器
						// doommList = []
						// clearInterval(cycle)
						
						// 2.无限循环弹幕
						doommList.push(new Doomm(arr[ids].name, top, time, icon));
						if (doommList.length > 6) {   //删除运行过后的dom
							doommList.splice(0, 1)
						}
						this.setData({
							doommData: doommList
						})
						ids++
					} else {
						doommList.push(new Doomm(arr[ids].name, top, time, icon));
						if (doommList.length > 6) {
							doommList.splice(0, 1)
						}
						this.setData({
							doommData: doommList
						})
						ids++
					}
					return timer;
				}
				cycle = setInterval(timer(), 3000);
         })
      },
	   stopInterval () {
		   clearInterval(cycle)
		   ids = 0;
		   doommList = []
	   }
   }
})
