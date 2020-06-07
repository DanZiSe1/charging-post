const api = require('../../utils/api.js');
const https = require('../../utils/request.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },
  // 扫码
  scanCode: function (e) {
    let openid = wx.getStorageSync('openid');
    if (openid) {
      wx.scanCode({
        success(res) {
          console.log('-----------', res); // 获取设备信息
          app.globalData.qrcode = res.result;
          // 获取设备信息
          https.request('false', api.getEquipmentInfo, { "qrcode": res.result }, 'POST').then(function (res) {
            console.log(res);
            var equipmentInfoParam = res.result;
            if (res.code == 0) {
              wx.navigateTo({
                url:  '/pages/scan/chargPost/chargPost?equipParams='  +  JSON.stringify(equipmentInfoParam),
              })
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
  },
  onTabItemTap(item){
    this.scanCode();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})