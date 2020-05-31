//index.js
//获取应用实例
var util = require('../../utils/request.js');
const api = require('../../utils/api.js');
const app = getApp()

Page({
  data: {
    chargingList: [{
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
    ],
    latitude: '',
    longitude: ''
  },
  onLoad: function () {
    this.getUserLocation()
    this.selectComponent("#noInfo")
  },
  // 获取附近充电站列表
  getChargingList: function(){
    var that = this
    util.request('false',api.getOrdersList,{
      coordinate: 'gcj-02',
      distance: 3,
      lat: that.data.latitude,
      lng: that.data.longitude
    }).then(function(res) {
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
  // 微信获得经纬度
  getLatlong: function () {
    let that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        console.log(JSON.stringify(res))
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        that.getChargingList()
      },
      fail: function (res) {
        console.log('fail' + JSON.stringify(res))
      }
    })
  },
  // 获取用户当前位置
  getUserLocation: function () { //获取用户的当前设置
    const _this = this;
    wx.getSetting({
      success: (res) => {
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          //未授权
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                //取消授权
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                //确定授权，通过wx.openSetting发起授权请求
                wx.openSetting({
                  success: function (res) {
                    if (res.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      _this.getLatlong();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //用户首次进入页面,调用wx.getLocation的API
          _this.getLatlong();
        }
        else {
          // console.log('授权成功')
          //调用wx.getLocation的API
          _this.getLatlong();
        }
      }
    })
  },
})
