const api = require('../../../utils/api.js');
const https = require('../../../utils/request');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rechargeList:[1,1,1,1],
    order_id: 0,//翻页时所需id
    page_size: 10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRechargeList();
  },
  // 获取充值明细列表
  getRechargeList:function(){
    let that = this;
    let data = {
      "id": this.data.order_id,
      "page_size": this.data.page_size
    }
    https.request('true',api.rechargeList,data).then(function(res){
      that.setData({
        rechargeList: res.result
      });
    });
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
    this.getRechargeList();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      order_id: this.data.order_id + 9,
      page_size: this.data.page_size
    });
    this.getRechargeList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})