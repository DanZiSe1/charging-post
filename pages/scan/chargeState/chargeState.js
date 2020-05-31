// pages/scan/chargeState/chargeState.js
var https = require('../../../utils/request.js');
const api = require('../../../utils/api.js');
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    startChargeSeq: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.startChargeSeq = options.start_charge_seq
  },
  // 结束充电
  overCharging:function(){
    var that = this
    wx.showModal({
      content:'确认结束充电吗？',
      success:function(res){
        if(res.confirm){
          https.request('true', api.stopCharging, {
            start_charge_seq: that.data.startChargeSeq 
          },'POST').then(function (res) {
            // console.log(res, '结束充电结果.......')
            wx.redirectTo({
              url: '/pages/mine/orderDetils/orderDetils',
            })
            /* if (res.code == 0) {
              wx.redirectTo({
                url: '/pages/mine/orderDetils/orderDetils',
              })
            } else {
              wx.showToast({
                title: res.message,
                icon: 'none',
                duration: 2000
              })
            } */
          });
        }
      }
     
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})