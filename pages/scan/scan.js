const api = require('../../utils/api.js');
const https = require('../../utils/request.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 扫码
  scanCode:function(e){
    // wx.scanCode({
    //   success(res){
    //     console.log(res);
    //   },
    // })
    let unique_id = wx.getStorageSync('unique_id');
    if(unique_id){
      wx.navigateTo({
        url: '/pages/scan/chargPost/chargPost',
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