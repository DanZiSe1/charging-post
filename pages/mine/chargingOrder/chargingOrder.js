const api = require('../../../utils/api.js');
const https = require('../../../utils/request');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailsList:[1,1,1,1,1,1,1,1,1,1,1,1,1],
    order_id: 0,
    page_size: 10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.getOrderList();
  },
  // 获取订单列表
  getOrderList:function(){
    let data = {
      "order_id": this.data.order_id,
      "page_size": this.data.page_size
    }
    https.request(api.getOrdersList,data).then(function(res){
      console.log(res);
    });
  },
  detailsTap:function(){
    wx.navigateTo({
      url: '/pages/mine/orderDetils/orderDetils'
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
    this.setData({
      order_id: this.data.order_id + 9,
      page_size: this.data.page_size
    });
    this.getOrderList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})