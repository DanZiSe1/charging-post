//priceinfo.js
//获取应用实例
const app = getApp()

Page({
  data: {
    pricesList: [{
        id: 1,
        time: '15:00-18:00',
        degree: '1.44',
        dprice: '0.64',
        fprice: '0.80',
      },
      {
        id: 2,
        time: '17:00-18:00',
        degree: '1.44',
        dprice: '0.64',
        fprice: '0.80',
      },
      {
        id: 3,
        time: '12:00-18:00',
        degree: '1.44',
        dprice: '0.64',
        fprice: '0.80',
      }
    ]
  },
  onLoad: function () {
  }
})
