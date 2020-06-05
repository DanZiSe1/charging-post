const api = require('../../../utils/api.js');
const https = require('../../../utils/request.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    start_charge_seq: '1983493434',
    equipParams: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(JSON.parse(options.equipParams));
    // this.data.equipParams = JSON.parse(options.equipParams);
    this.setData({
      equipParams: JSON.parse(options.equipParams)
    })
  },
  goRecharge:function(){
    wx.navigateTo({
      url: '/pages/mine/recharge/recharge'
    })
  },
  // 启动充电
  startCharging:function(){
    // wx.showModal({
    //   content: '您当前已有充电中订单'
    // })
    var that = this;
    var data = {

    }
    https.request('true',api.startCharging,{'qrcode':app.globalData.qrcode},'POST').then(function(res){
      console.log(res);
      wx.navigateTo({
        url: '/pages/scan/chargeState/chargeState?start_charge_seq=' + that.data.start_charge_seq,
      })
    });
  },
  // 查看全部2
  seeAll:function(){
    wx.navigateTo({
      url: '/pages/priceinfo/priceinfo?connectorid='+ this.data.equipParams.connector_id + '&operatorid=' + this.data.equipParams.operator_id,
      // url: '/pages/priceinfo/priceinfo',
    })
  },
  // 绑定车牌号
  bindCarNum:function (){
    var that = this;
    https.request('true',api.bindCarNum,{
      carnum: '京A-88888'
    },'POST').then(function(res){
      console.log(res, '绑定车牌号结果......');
      wx.showToast({
        title: '成功绑定车牌号'
      })
    });
  },
  // 解绑车牌号
  unBindCarNum:function (){
    var that = this;
    https.request('true',api.unBindCarNum,'POST').then(function(res){
      console.log(res, '解绑车牌号结果......');
      wx.showModal({
        title: '提示',
        content: '您确定要解绑车牌号吗？',
        success (res) {
          if (res.confirm) {
            wx.showToast({
              title: '成功解绑车牌号'
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
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