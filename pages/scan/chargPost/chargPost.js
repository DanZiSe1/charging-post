const api = require('../../../utils/api.js');
const https = require('../../../utils/request.js');

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
    let data = {
      "carnum": "京A-88888", //车牌号
      "connector_id": "0123456789", //充电设备接口编码
      "phone_num": "15134567890", //手机号
      "qrcode": "二维码信息" //二维码其他信息
    }
    https.request(api.startCharging,data,'POST').then(function(res){
      console.log(res);
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