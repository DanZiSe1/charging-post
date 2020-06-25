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
    ],
    startChargeSeq:'',//订单编号
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options, '订单详情页面的options............');
    this.setData({
      startChargeSeq: options.startChargeSeq
    })
    this.loadDetilesInfo();
  },
  // 详细信息
  loadDetilesInfo:function(){
    let that = this;
    https.request('true', api.getOrdersDetails + '/' + that.data.startChargeSeq).then(function (res) {
      // status: 1-订单开始 2-用户结束订单 3-订单启动失败 4-已接收订单信息，渲染页面
      if (res.code == 0) {
        if (res.result.status == 1) {
          wx.showToast({
            title: '订单开始',
            icon: 'none'
          });
          wx.hideLoading();
        }else if (res.result.status == 2) {
          wx.showLoading({
            title: '订单结算中',
            mask: true,
            success:function(){
              setTimeout(function(){
                that.loadDetilesInfo();
              },30000)
            },
          });
        } else if (res.result.status == 3) {
          wx.showToast({
            title: '订单失败',
            icon: 'none'
          });
          wx.hideLoading();
        } else if (res.result.status == 4) {
          that.setData({
            ordersDetails: res.result
          });
          wx.hideLoading();
        }
      }
    });
  },
  // 费用明细
  // expenseDetails:function(){
  //   wx.navigateTo({
  //     url: '/pages/priceinfo/priceinfo',
  //   })
  // },
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