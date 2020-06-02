//indexdetail.js
var https = require('../../utils/request.js');
const api = require('../../utils/api.js');
const app = getApp();

Page({
  data: {
    chargStationid: '',
    chargOperatorid: '',
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
    console.log(options, 'options.......')
    this.setData({
      chargStationid: parseInt(options.chargeid),
      chargOperatorid: options.operatorid
    })
    this.getStationDetail()
  },
  // 获取充电站详情
  getStationDetail: function(){
    var that = this
    var stationDetailUrl = api.getStationDetail + that.data.chargStationid
    https.request('false',stationDetailUrl,'POST').then(function (res) {
      console.log(res, '获取充电站详情结果.......')
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
      url: '/pages/priceinfo/priceinfo?connectorid=881021888881&operatorid=' + this.data.chargOperatorid,
    })
  },
  // 扫码充电 
  goScanCharge: function (e) {
    let unique_id = wx.getStorageSync('unique_id');
    if (unique_id) {
      wx.scanCode({
        success(res) {
          console.log('-----------', res); // 获取设备信息
          https.request('false', api.getEquipmentInfo, {
            "qrcode": res.result
          }, 'POST').then(function (res) {
            console.log(res, '扫码充电后的结果........');
            if (res.code == 0) {
              if (res.result) {
                wx.navigateTo({
                  url:  '/pages/scan/chargPost/chargPost?equipParams=' + JSON.stringify(res.result),
                })
              }
            }
          });
        }
      })
    } else {
      wx.showModal({
        content: '您还未登录，是否登录',
        cancelText: '否',
        confirmText: '是',
        success(res) {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/mine/mine',
            })
          }
        }
      })
    }
  }
})
