// pages/scan/chargeState/chargeState.js
var https = require('../../../utils/request.js');
const api = require('../../../utils/api.js');
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    startChargeSeq: '',
    newTime: '00:00:00',
    chargeInfoInterval:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    this.data.startChargeSeq = options.start_charge_seq;
    console.log(options);
    this.data.chargeInfoInterval = setInterval(function () {
        console.log("1分钟刷新一次结束充电页面........");
        that.loadChargeInfo();
        // clearInterval(intervalId);
    }, 60000);
    
    
  },
  // 充电详情信息
  loadChargeInfo:function(){
    let that = this;
    https.request('true', api.getChargeInfo +'/' + this.data.startChargeSeq).then(function(res){
      console.log(res);
      if(res.code == 0){
         let timestamp = new Date(res.result.EndTime).getTime() - new Date(res.result.StartTime).getTime();
         let newTime = Math.floor(timestamp/1000/60/60)+':'+(Math.floor(timestamp/1000/60)%60>=10?Math.floor(timestamp/1000/60):'0'+Math.floor(timestamp/1000/60))+':'+(timestamp/1000%60>=10?timestamp/1000%60:'0'+timestamp/1000%60);
         console.log(newTime);
        that.setData({
          chargeInfo: res.result,
          newTime: newTime
        })
      }
    }) 
  },
  // 结束充电
  overCharging:function(){
    var that = this
    wx.showModal({
      content:'确认结束充电吗？',
      success:function(res){
        if(res.confirm){
          https.request('true', api.stopCharging, {
            start_charge_seq: that.data.startChargeSeq 
          },'POST').then(function (res) {
            console.log(res, '结束充电结果...........')
            wx.redirectTo({
              url: '/pages/mine/orderDetils/orderDetils',
            })
            /* if (res.code == 0) {
              wx.redirectTo({
                url: '/pages/mine/orderDetils/orderDetils',
              })
            } else {
              wx.showToast({
                title: res.message,
                icon: 'none',
                duration: 2000
              })
            } */
          });
        }
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
      clearInterval(this.data.chargeInfoInterval);
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