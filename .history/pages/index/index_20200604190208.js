//index.js
//获取应用实例
var https = require('../../utils/request.js');
const api = require('../../utils/api.js');
const app = getApp()

Page({
  data: {
    /* chargingList: [{
        id: 1,
        StationName: '新世界商场公共充电站',
        BusineHours: '00:00-24:00',
        ElectricityFee: '1.44',
        distance: '0.5',
        Remark: '快:闲8/8|慢:闲8/8'
      },
      {
        id: 2,
        StationName: '新世界商场公共充电站',
        BusineHours: '00:00-24:00',
        ElectricityFee: '1.44',
        distance: '0.5',
        Remark: '快:闲8/8|慢:闲8/8'
      },
      {
        id: 3,
        StationName: '新世界商场公共充电站',
        BusineHours: '00:00-24:00',
        ElectricityFee: '1.44',
        distance: '0.5',
        Remark: '快:闲8/8|慢:闲8/8'
      }
    ], */
    chargingList:[],
    latitude: '',
    longitude: ''
  },
  onLoad: function () {
    this.selectComponent("#noInfo")
  },
  onShow: function () {
    this.getLocationAuth()
  },
  // 获取用户位置权限
  getLocationAuth () {
    var that = this
    wx.getSetting({
      success: (res) => {
        console.log('用户授权情况', res)
        //未授权
        if(res.authSetting['scope.userLocation'] !== undefined &&     
         res.authSetting['scope.userLocation'] !== true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              console.log(res)
              if(res.cancel){
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
                that.getLocationAuth()
              } else if (res.confirm) { //确认授权， 通过wx.openSetting发起授权请求_getCityLocation
                wx.openSetting({
                  success: function (res) {
                    if(res.authSetting["scope.userLocation"] == true) {
                      wx.showModal({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      that.getUserLocation()
                    } else {
                      wx.showModal({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                      that.getLocationAuth()
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          console.log('这个为undefined')
          that.getUserLocation()
        } else {
          console.log('授权成功')
          that.getUserLocation()
        }
      }
    })
  },
  /* 获取用户位置权限
  getLocationAuth: function () {
    const that = this;
    wx.getSetting({
      success: (res) => {
        // console.log(res.authSetting['scope.userLocation'], 'res.authSetting.....')
        if (res.authSetting['scope.userLocation'] == undefined || res.authSetting['scope.userLocation'] != true) {
          // 未授权
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) { // 取消授权
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
                wx.openSetting({
                  success: function (res) {
                    if (res.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      that.getChargingList();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              } else if (res.confirm) { // 确定授权 
                that.getChargingList();
              }
            }
          })
        }
      }
    }) 
  }, */
  /* 获取用户当前位置
  getUserLocation: function () {
    let that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(JSON.stringify(res), '获取用户当前位置结果.......')
        if (res.errMsg = "getLocation:ok") {
          that.setData({
            latitude: res.latitude,
            longitude: res.longitude
          }) 
          that.getChargingList()
        } else {
          that.getLocationAuth()
        }
      },
      fail: function (res) {
        console.log('fail' + JSON.stringify(res), '...1111111111')
        that.getLocationAuth()
      }
    })
  }, */
  // 获取用户当前位置
  getUserLocation(){
    let that = this
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        console.log(JSON.stringify(res), '获取用户当前位置结果.......')
        if (res.errMsg = "getLocation:ok") {
          that.setData({
            latitude: res.latitude,
            longitude: res.longitude
          }) 
          that.getChargingList()
        } else {
          that.getLocationAuth()
        }
        /* let latitude = res.latitude
        let longitude = res.longitude
        let speed = res.speed
        wx.request({
          url: 'http://api.map.baidu.com/geocoder/v2/?ak=Vh0ALNzHjjEm5RP0Ie16dlBhZbdEQip9&location=' + res.latitude + ',' + res.longitude + '&output=json',
          data: {},
          header: { 'Content-type': 'application/json' },
          success: function (ops){ 
            console.log(ops)
            that.address = ops.data.result.addressComponent.city + 
            ops.data.result.addressComponent.district
          },
          fail: function (resq) {
            wx.showModal({
              title: '信息提示',
              content: '请求失败',
              showCancel: false,
              confirmColor: '#f37938'
            });
          }
        }) */
      },
      fail: (res) => {
        that.getLocationAuth()
      }
    })
  },
  // 获取附近充电站列表
  getChargingList: function () {
    var that = this
    var indexParam = {
      "coordinate": 'gcj-02',
      "distance": 3,
      "lat": that.data.latitude,
      "lng": that.data.longitude
    }
    https.request('false', api.getChargesList, indexParam, 'POST').then(function (res) {
      console.log(res, '获取附近充电站列表结果.......')
      if (res.code == 0) {
        if (res.result) {
          that.setData({
            chargingList: res.result
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
   /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
