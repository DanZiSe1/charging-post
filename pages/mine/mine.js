const api = require('../../utils/api.js');
const https = require('../../utils/request.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNum: '',
    accountBalance: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let openid = wx.getStorageSync('openid');
    let str = wx.getStorageSync('phoneNum');
    let phoneNumber = str.substring(0, 3) + "****" + str.substring(7, str.length);
    if (openid){
      this.setData({
        phoneNum: phoneNumber
      });
    }
  },

  // 获取用户手机号
  getPhoneNumber:function(e){
    var that = this;
    var data = {
      "encrypted_data": e.detail.encryptedData,
      "iv": e.detail.iv
    }
    if (e.detail.errMsg == "getPhoneNumber:ok"){
      wx.login({
        success: (res) => {
          https.request('false',api.getOpenId,{"js_code": res.code},'POST').then(function(res){
            if(res.code == 0){
              wx.setStorageSync('openid', res.result.openid);
              app.globalData.openid = res.result.openid;
              https.request('true', api.getPhoneNum, data, 'POST').then(function(res){
                if(res.code == 0){

                  that.loadUserInfo();//获取用户基本信息

                  let str = res.result.phoneNumber;
                  let phoneNumber = str.substring(0, 3) + "****" + str.substring(7, str.length);
                  wx.setStorageSync('phoneNum', str);
                  that.setData({
                    phoneNum: phoneNumber,
                  });
                }
              });
            }
          })
        },
      })
    }
  },
  // 充电订单
  chargingOrder:function(){
    if (wx.getStorageSync('openid')){
      wx.navigateTo({
        url: '/pages/mine/chargingOrder/chargingOrder'
      });
    }else{
      wx.showToast({
        title: '请登录',
        icon:'none'
      });
    }
  },
  // 账户明细
  accountDetails:function(){
    if (wx.getStorageSync('openid')) {
      wx.navigateTo({
        url: '/pages/mine/accountDetails/accountDetails'
      })
    } else {
      wx.showToast({
        title: '请登录',
        icon:'none'
      });
    }
  },
  // 充值
  recharge:function(){
    if (wx.getStorageSync('openid')) {
      wx.navigateTo({
        url: '/pages/mine/recharge/recharge'
      })
    } else {
      wx.showToast({
        title: '请登录',
        icon:'none'
      })
    }
  },

  //获取用户基本信息
  loadUserInfo:function(){
    let that = this;
    https.request('true',api.getUserInfo).then(function(res){
      console.log(res);
      if(res.code == 0){
        that.setData({
          accountBalance: res.result.balance
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(){
    let openid = wx.getStorageSync('openid');
    if(openid){
      this.loadUserInfo();//获取用户基本信息
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})