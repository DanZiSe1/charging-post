// pages/scan/chargeState/chargeState.js
var https = require('../../../utils/request.js');
const api = require('../../../utils/api.js');
const util = require('../../../utils/util.js');
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    startChargeSeq: '',//订单号
    newTime: '00:00:00',
    chargeInfoInterval: '',
    /* chargeInfo: {
      station_name: '新世界充电站',
      connector_id: '140920000000',
      ConnectorStatus: '正在充电中',
      TotalPower: '5',
      CurrentA: '2',
      VoltageA: '2',
      Soc: '1',
      timeRange: '14:25:06',
      TotalMoney: '1.7'
    } */
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options, '结束充电页面的options.........');
    if (options.start_charge_seq) {
      this.setData({
        startChargeSeq: options.start_charge_seq
      })
      this.loadChargeInfo();
      this.refreshChargeInfo();
    }
    
    /* let currenttime = new Date().getTime();
    let starttime = '1592442000000';
    let timestamp = currenttime-starttime;
    this.data.newTime = util.formatDuring(timestamp);
    console.log(this.data.newTime, '充电时长结果..........'); */
  },
  // 充电详情信息
  loadChargeInfo:function(){
    let that = this;
    https.request('true', api.getChargeInfo +'/' + this.data.startChargeSeq).then(function(res){
      console.log(res, '充电详情信息................');
      if(res.code == 0){
        var newchargestatus = '';
        switch (res.result.ConnectorStatus) {
          case 0:
            newchargestatus = "离网";
            break;
          case 1:
            newchargestatus = "空闲";
            break;
          case 2:
            newchargestatus = "占用（未充电）";
            break;
          case 3:
            newchargestatus = "占用（充电中）";
            break;
          case 4:
            newchargestatus = "占用（预约锁定）";
            break;
          case 255:
            newchargestatus = "故障";
            break;
        };
        res.result['ConnectorStatus'] = newchargestatus
        let timestamp = new Date(res.result.EndTime).getTime() - new Date(res.result.StartTime).getTime();
        var timeRange = util.formatDuring(timestamp);
        console.log(timeRange, '充电时长结果..........');
        res.result['timeRange'] = timeRange
        console.log(res.result, '.........................344434')
        that.setData({
          chargeInfo: res.result,
          // newTime: newTime
        })
      }
    }) 
  },
  // 充电详情自动刷新
  refreshChargeInfo:function(){
    let that = this;
    that.data.chargeInfoInterval = setInterval(function () {
      console.log("30秒刷新一次结束充电页面........");
      that.loadChargeInfo();
    }, 30000);
  },
  // 结束充电
  overCharging:function(){
    var that = this;
    // console.log(this.data.startChargeSeq);
    wx.showModal({
      content:'确认结束充电吗？',
      success:function(res){
        if(res.confirm){
          // console.log(that.data.startChargeSeq);
          https.request('true', api.stopCharging, {
            start_charge_seq: that.data.startChargeSeq 
          },'POST').then(function (res) {
            // console.log(res, '结束充电结果...........')
            if (res.code == 0) {
              clearInterval(that.data.chargeInfoInterval);
              wx.redirectTo({
                url: '/pages/mine/orderDetils/orderDetils?startChargeSeq='+res.result.start_charge_seq+'&startChargeSeqState='+res.result.start_charge_seq_stat,
              })
            } else {
              wx.showToast({
                title: res.message,
                icon: 'none',
                duration: 2000
              })
            }
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
    // console.log("监听页面卸载...........")
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