const api = require('../../../utils/api.js');
const https = require('../../../utils/request.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    startChargeSeq:'',//订单唯一编号
    feeList:[
      {
        timeInterval: '15:00-18:00',
        duration: 30,
        electriFee: 5.34,
        serveFee: 5.34
      },{
        timeInterval: '15:00-18:00',
        duration: 30,
        electriFee: 5.34,
        serveFee: 5.34
      }
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let that = this;
    https.request('true',api.getChargeDetail +'/' + options.startChargeSeq).then(function(res){
      console.log(res);
      // if(res.code == 0){
      //   app.globalData.accountBalance = res.result.balance
      //   that.setData({
      //     accountBalance: res.result.balance
      //   });
      // }
    });
  },
  priceDetails:function(){
    wx.navigateTo({
      url: '/pages/priceinfo/priceinfo'
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