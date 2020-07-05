const api = require('../../../utils/api.js');
const https = require('../../../utils/request');
const util = require('../../../utils/util.js');

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
    setTimeStr:'',
    connectorId: '',
    operatorId: '',
    ordersDetails: {
      charge_time: '00:00:00'
    }
    /* ordersDetails: {
      status: '4',
      total_elec_money: '10.98',
      total_sevice_money: '9.98',
      total_money: '20.92',
      charge_time: '1小时30分',
      total_power: '45',
      stop_reason: '无原因',
      station_name: '新世界',
      address: '新建村',
      connector_id: '1409000000'
    } */
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options, '订单详情页面的options............');
    this.setData({
      startChargeSeq: options.startChargeSeq
    });
  },
  // 详细信息
  loadDetilesInfo:function(){
    let that = this;
    https.request('true', api.getOrdersDetails + '/' + that.data.startChargeSeq).then(function (res) {
      // console.log(res, '订单详情的详细信息结果..................');
      // status: 1-订单开始 2-用户结束订单 3-订单启动失败 4-已接收订单信息，渲染页面
      if (res.code == 0) {
        // that.data.connectorId = res.result.connector_id
        // that.data.operatorId = res.result.operator_id
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
              that.data.setTimeStr = setTimeout(function(){
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
          let starttime = res.result.start_time.replace(/-/g,"/");
          let endtime = res.result.end_time.replace(/-/g,"/");
          let timestamp = new Date(endtime).getTime() - new Date(starttime).getTime();
          // console.log(timestamp, '充电时长结果时间戳..........');
          if (timestamp) {
            var timeRange = util.formatDuring(timestamp, 2);
            // console.log(timeRange, '充电时长结果..........');
            res.result['charge_time'] = timeRange
          }
          that.data.connectorId = res.result.connector_id
          that.data.operatorId = res.result.operator_id
          that.setData({
            ordersDetails: res.result
          });
          wx.hideLoading();
        }
      }
    });
  },
  // 费用明细
  expenseDetails:function(){
    wx.navigateTo({
      url: '/pages/mine/feeDetails/feeDetails?startChargeSeq=' + this.data.startChargeSeq + '&connectorId=' + this.data.connectorId + '&operatorId=' + this.data.operatorId,
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
    this.loadDetilesInfo();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.hideLoading();
    clearTimeout(this.data.setTimeStr);
    // console.log('隐藏----');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.hideLoading();
    clearTimeout(this.data.setTimeStr);
    // console.log('卸载----');
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