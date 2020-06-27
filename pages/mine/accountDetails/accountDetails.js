const api = require('../../../utils/api.js');
const https = require('../../../utils/request');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rechargeList:[],
    page_num: 0,
    page_size: 15,
    noMore: true,
    noinfotext: '暂无记录',
    noinfoimg: '/imgs/acount.png',
    noinfostate: false 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRechargeList();
  },
  // 获取充值明细列表
  getRechargeList:function(){
    let that = this;
    let data = {
      "page": this.data.page_num,
      "page_size": this.data.page_size
    }
    https.request('true',api.rechargeList,data).then(function(res){
      if(res.code == 0){
        var rechargeList = that.data.rechargeList;
        if(res.result.length != 0){
          if (that.data.page_num == 0) {
            rechargeList = [];
          }
          that.setData({
            rechargeList: rechargeList.concat(res.result),
            noinfostate: false
          });
        }else if(res.result.length == 0 && that.data.page_num != 0){
          that.setData({noMore: false,noinfostate: true})
        }
      }
    });
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.data.page_num = 0;
    this.getRechargeList();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.page_num ++;
    this.getRechargeList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})