const api = require('../../../utils/api.js');
const https = require('../../../utils/request.js');
const app = getApp();

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
    active: 1,
    balance: 0,//支付金额
    inputValue: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 选择金额
  amountTap:function(e){
    this.setData({
      active: e.currentTarget.dataset.index,
      balance: e.currentTarget.dataset.amount,
      inputValue: ''
    });
  },
  // 输入金额
  getInputValue:function(e){
    this.setData({
      inputValue: e.detail.value.replace(/\s+/g, ''),
      balance:e.detail.value.replace(/\s+/g, ''),
      active: 'none',
      flag: true
    });
    // console.log(this.data.balance)
  },
  // 立即充值
  nowRecharge:function(){
    var that = this
    // console.log(Number(that.data.balance), 'that.data.balance............');
    // else if(that.data.balance < 1) {
    //   wx.showModal({
    //     title: '提示',
    //     content: '您充值的金额不能低于1分'
    //   })
    // } 
    if (that.data.balance == 0) {
      wx.showModal({
        title: '提示',
        content: '请您输入充值金额!'
      })
    } else {
      let data = {
        "total_fee": Number(that.data.balance*100)
      }

      https.request('true', api.useRecharge, data, 'POST').then(function (res) {
        // console.log(res, '充值接口结果........')
        if (res.code == 0) {
          wx.requestPayment({
            timeStamp: res.result.timeStamp,
            nonceStr: res.result.nonceStr,
            package: res.result.package,
            signType: res.result.signType,
            paySign: res.result.paySign,
            success: function (res) {
              // console.log("调起微信支付...........")
              // console.log(res, '微信支付结果........')
              if (res.errMsg == "requestPayment:ok") {
                wx.showToast({
                  title: '充值成功',
                  icon: 'success',
                  duration: 1000,
                  success: function () {
                    app.globalData.walletBalance = Number(that.data.balance);
                    wx.setStorageSync('walletBalance', Number(that.data.balance));
                    wx.navigateBack({
                      delta: 1
                    })
                  }
                })
              } else {
                wx.showToast({
                  title: '充值失败,请重新充值!',
                  icon: 'none',
                  duration: 1000
                })
              }
            },
            fail: function (res) {
              // console.log("没有调起微信支付...........")
              wx.showToast({
                title: '调起微信支付失败!',
                icon: 'none',
                duration: 1000
              })
            }
          })
        }
      });
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