const api = require('../../../utils/api.js');
const https = require('../../../utils/request.js');
const util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    startChargeSeq:'',//订单唯一编号
    feeList:[
      {
        timeInterval: '15:00-18:00',
        duration: 30,
        electriFee: 5.34,
        serveFee: 5.34
      },{
        timeInterval: '15:00-18:00',
        duration: 30,
        electriFee: 5.34,
        serveFee: 5.34
      }
    ],
    connectorId: '',
    operatorId: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      connectorId: options.connectorId,
      operatorId: options.operatorId
    });
    https.request('true',api.getChargeDetail +'/' + options.startChargeSeq).then(function(res){
      if(res.code == 0){
        that.setData({
          feeList: res.result
        });
      }
    });
  },
  priceDetails:function(){
    wx.navigateTo({
      url: '/pages/priceinfo/priceinfo?pricetype=3&connectorid=' + this.data.connectorId + '&operatorid=' + this.data.operatorId,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})