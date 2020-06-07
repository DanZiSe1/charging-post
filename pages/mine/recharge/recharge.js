const api = require('../../../utils/api.js');
const https = require('../../../utils/request.js');

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
    balance: 0,//支付金额
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
    });
  },
  // 输入金额
  getInputValue:function(e){
    this.setData({
      balance:e.detail.value.replace(/\s+/g, ''),
      active: 'none'
    });
    console.log(this.data.balance)
  },
  // 立即充值
  nowRecharge:function(){
    let data = {
      "total_fee": Number(this.data.balance)
    }
    console.log(Number(this.data.balance));
    https.request('false',api.useRecharge,data,'POST').then(function(res){
      // wx.setStorageSync('unique_id', res.data.result.unique_id);
      console.log(res, '充值接口结果........')

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