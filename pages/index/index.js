//index.js
//获取应用实例
var https = require('../../utils/request.js');
const api = require('../../utils/api.js');
const util = require('../../utils/util.js');
const app = getApp()

Page({
  data: {
    chargingList: [],
    latitude: '',
    longitude: '',
    noinfotext: '抱歉，附近暂无充电站',
    noinfoimg: '/imgs/no_data.png',
    noinfostate: false 
  },
  onLoad: function () { 
  },
  onShow: function () {
    // 自定义tabbar
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      });
    }

    this.getLocationAuth();
  },
  // 获取用户位置权限
  getLocationAuth () {
    var that = this
    wx.getSetting({
      success: (res) => {
        // console.log('用户授权情况', res)
        //未授权
        if(res.authSetting['scope.userLocation'] !== undefined && res.authSetting['scope.userLocation'] !== true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              // console.log(res)
              if(res.cancel){
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
                that.getLocationAuth()
              } else if (res.confirm) { //确认授权， 通过wx.openSetting发起授权请求
                wx.openSetting({
                  success: function (res) {
                    if(res.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      that.getUserLocation()
                    } else {
                      wx.showToast({
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
          // console.log('这个为undefined,重新授权')
          that.getUserLocation()
        } else {
          // console.log('授权成功')
          that.getUserLocation()
        }
      }
    })
  },
  // 获取用户当前位置
  getUserLocation(){
    let that = this
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        // console.log(JSON.stringify(res), '获取用户当前位置结果.......')
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
  getChargingList: function (cb) {
    var that = this
    var indexParam = {
      "coordinate": 'gcj-02',
      "distance": 3,
      "lat": that.data.latitude,
      "lng": that.data.longitude
    }
    https.request('false', api.getChargesList, indexParam).then(function (res) {
      // console.log(res, '获取附近充电站列表结果.......')
      if (res.code == 0) {
        if (res.result) {
          res.result.map(charItem => {
            var resultChargings = util.electricServeMoney(charItem.ElectricityFee, charItem.ServiceFee);
            // console.log(resultChargings, 'resultCharging.........');
            var newChargeElemoney = resultChargings[0].elemoney.split("电费：");
            var newChargeServemoney = resultChargings[0].servemoney.split("服务费：");
            charItem['chargedegee'] = Number(newChargeElemoney[1]) + Number(newChargeServemoney[1]);
            // console.log(charItem['chargedegee'], 'charItem[chargedegee].........');
            Object.assign(charItem);
          })
          // console.log(res.result, 'res.result1111.........');
          that.setData({
            chargingList: res.result,
            noinfostate: false
          })
        } else {
          that.setData({
            noinfostate: true
          })
        }
        typeof cb == "function" && cb();
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

  },
  // 下拉刷新
  onPullDownRefresh: function() {
    this.getChargingList(function(){
      wx.stopPullDownRefresh()
    })
  }
})