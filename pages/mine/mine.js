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
    let data = {
      "avatar": "http://img.mp.itc.cn/upload/20170724/cf678e09eb384401aa616ba134126357_th.jpg",
      "identity_card": "1234567890987654321",
      "nickname": "小茗同学",
      "unique_id": "0123456"    
    }
    https.request(api.wxBind,data,'POST').then(function(res){
      console.log(res);
    })
  },
  getPhoneNumber:function(e){
    console.log(e)
  },
  // 充电订单
  chargingOrder:function(){
    wx.navigateTo({
      url: '/pages/mine/chargingOrder/chargingOrder'
    })
  },
  // 账户明细
  accountDetails:function(){
    wx.navigateTo({
      url: '/pages/mine/accountDetails/accountDetails'
    })
  },
  // 充值
  recharge:function(){
    wx.navigateTo({
      url: '/pages/mine/recharge/recharge'
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