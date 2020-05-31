const api = require('../../../utils/api.js');
const https = require('../../../utils/request');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rechargeAmount:[
      {amount: 10 },
      {amount: 20 },
      {amount: 50 },
      {amount: 100 },
      {amount: 300 },
      {amount: 500 },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    // let url = api.getOrdersDetails + "?" + options.id;
    // let data = {
    //   'id': options.id
    // }
    https.request('true',api.getOrdersDetails +'/'+ options.id).then(function(res){
      
      if(res.code == 0){
        console.log(res);
        that.setData({
          ordersDetails:res.result
        })
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
    //  wx.switchTab({
    //    url: '/pages/mine/mine',
    //  })
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