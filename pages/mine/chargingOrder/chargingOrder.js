const api = require('../../../utils/api.js');
const https = require('../../../utils/request');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailsList:[],
    page_num: 0,
    page_size: 15,
    noMore: true,
    noinfostate: false,
    noinfotext: '暂无充电记录',
    noinfoimg: '/imgs/no_data.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.getOrderList();
  },
  // 获取订单列表
  getOrderList:function(){
    let that = this;
    let data = {
      "page": this.data.page_num,
      "page_size": this.data.page_size
    }
    https.request('true',api.getOrdersList,data).then(function(res){
      if(res.code == 0){
        var detailsList = that.data.detailsList;
        var status = [];
        if(res.result.length != 0){
          if (that.data.page_num == 0) {
            detailsList = [];
          };
          that.setData({
            status: status,
            detailsList:  detailsList.concat(res.result),
            noinfostate: false
          });
        }else if(res.result.length == 0 && that.data.page_num != 0){
          that.setData({
            noMore: false,
            noinfostate: true
          })
        }
      }
    });
  },

  // 跳转列表详情
  detailsTap:function(e){
    let startChargeSeq = e.currentTarget.dataset.id;
    let status = e.currentTarget.dataset.status;
    if(status == 1 || status == 5){  // 充电中
      wx.navigateTo({
        url: '/pages/scan/chargeState/chargeState?startChargeSeq=' + startChargeSeq + '&startChargeSeqState=' + status
      });
    } else{ // 结算中 || 已完成
      wx.navigateTo({
        url: '/pages/mine/orderDetils/orderDetils?startChargeSeq=' + startChargeSeq + '&startChargeSeqState=' + status
      });
    }
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.data.page_num = 0;
    this.getOrderList();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.page_num ++;
    this.getOrderList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})