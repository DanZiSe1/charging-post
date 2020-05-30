//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    chargingList: [{
        id: 1,
        name: '新世界商场公共充电站',
        time: '00:00-24:00',
        degree: '1.44',
        distance: '0.5',
        descname: '快:闲8/8|慢:闲8/8'
      },
      {
        id: 2,
        name: '新世界商场公共充电站',
        time: '00:00-24:00',
        degree: '1.44',
        distance: '0.5',
        descname: '快:闲8/8|慢:闲8/8'
      },
      {
        id: 3,
        name: '新世界商场公共充电站',
        time: '00:00-24:00',
        degree: '1.44',
        distance: '0.5',
        descname: '快:闲8/8|慢:闲8/8'
      }
    ]
  },
  onLoad: function () {
  },
  // 获取附近充电站列表
  getChargingList: function(){} 
})
