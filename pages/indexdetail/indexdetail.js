//indexdetail.js
var util = require('../../utils/request.js');
const api = require('../../utils/api.js');
const app = getApp();

Page({
  data: {
    chargStationid: '',
    chargStationData: {
      id: '1',
      StationName: '新世界商场公共充电站',
      BusineHours: '00:00-24:00',
      ElectricityFee: '1.44',
      distance: '0.5',
      Remark: '快:闲8/8|慢:闲8/8',
      Address: '东城区崇文门外大街9号正仁大厦停车场',
      calentime: '15:00-18:00',
      ServiceFee: '0.80',
      ParkFee: '0.64'

    }
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
