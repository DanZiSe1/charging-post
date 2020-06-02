//priceinfo.js
//获取应用实例
var https = require('../../utils/request.js');
const api = require('../../utils/api.js');
const app = getApp();

Page({
  data: {
    /* pricesList: [{
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
    ], */
    pricesList: [],
    connectorId: '',
    operatorId: ''
  },
  onLoad: function (options) {
    console.log(options, 'options.......')
    this.setData({
      connectorId: options.connectorid,
      operatorId: options.operatorid
    })
    this.selectComponent("#noInfo")
    this.getPriceInfos()
  },
  // 获取设备充电策略
  getPriceInfos:function () {
    var that = this
    https.request('false', api.getPricePolicy,{
      connector_id: "881021888881",
      operator_id: that.data.operatorId
    }, 'POST').then(function (res) {
      console.log(res, '获取设备充电策略结果.......')
      if (res.code == 0) {
        if (res.result) {
          that.setData({
            pricesList: res.result
          })
        }
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 2000
        })
      }
    });
  } 
})
