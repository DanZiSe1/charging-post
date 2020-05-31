//indexdetail.js
var util = require('../../utils/request.js');
const api = require('../../utils/api.js');
const app = getApp();

Page({
  data: {
    chargStationid: '',
    chargStationData: ''
  },
  onLoad: function (options) {
    // console.log(options, parseInt(options.chargeid), 'options.......')
    this.setData({
      chargStationid: parseInt(options.chargeid)
    })
    this.getStationDetail()
  },
  // 获取充电站详情
  getStationDetail: function(){
    var that = this
    util.request('false', api.getStationDetail, {
      id: that.data.chargStationid
    }).then(function (res) {
      // console.log(res, '获取充电站详情结果.......')
      if (res.code == 0) {
        if (res.result) {
          that.setData({
            chargStationData: res.result
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
  },
  // 查看全部
  getLookAll: function(){
    wx.navigateTo({
      url: '/pages/priceinfo/priceinfo',
    })
  },
  // 扫码充电 
  goScanCharge:function () {
    wx.switchTab({
      url: '/pages/scan/scan'
    })
  }
})
