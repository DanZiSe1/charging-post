//indexdetail.js
var https = require('../../utils/request.js');
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
    var stationDetailUrl = api.getStationDetail + that.data.chargStationid
    https.request('false', stationDetailUrl).then(function (res) {
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
    let unique_id = wx.getStorageSync('unique_id');
    if(unique_id){
      wx.scanCode({
        success(res){
          console.log('-----------',res);
          https.request('false',api.getEquipmentInfo,{"qrcode":res.rawData}).then(function(res){
            console.log(res);
            var equipmentInfoParam = {
              "carnum": "京A-88888", //车牌号
              "connector_id": "0123456789", //充电设备接口编码
              "phone_num": "15134567890", //手机号
              "qrcode": res.rawData //二维码其他信息
            }
            // if(res.code == 0){
              wx.navigateTo({
                url: '/pages/scan/chargPost/chargPost?equipParams=' + JSON.stringify(equipmentInfoParam),
              })
            // }
          });  
        },
      })
    }else{
      wx.showModal({
        content:'您还未登录，是否登录',
        cancelText:'否',
        confirmText:'是',
        success(res){
          if(res.confirm){
            wx.switchTab({
              url: '/pages/mine/mine',
            })
          }
        }
      })
    }
  }
})
