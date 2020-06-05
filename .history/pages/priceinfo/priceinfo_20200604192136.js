//priceinfo.js
//获取应用实例
var https = require('../../utils/request.js');
const api = require('../../utils/api.js');
const app = getApp();

Page({
  data: {
    /* pricesList: [{
        id: 1,
        time: '15:00-18:00',
        degree: '1.44',
        dprice: '0.64',
        fprice: '0.80',
      },
      {
        id: 2,
        time: '17:00-18:00',
        degree: '1.44',
        dprice: '0.64',
        fprice: '0.80',
      },
      {
        id: 3,
        time: '12:00-18:00',
        degree: '1.44',
        dprice: '0.64',
        fprice: '0.80',
      }
    ], */
    pricesList: [],
    connectorId: '',
    operatorId: ''
  },
  onLoad: function (options) {
    // this.setData({
    //   connectorId: options.connectorid,
    //   operatorId: options.operatorid
    // })
    // 从充电桩详情type=1
    if (options.pricetype == 1) {
      console.log(JSON.parse(options.lookmoredata), 'options.......')
      this.pricesList = JSON.parse(options.lookmoredata)
      this.pricesList.map((ele, index)=>{
        if (!ele.servemoney) {
          var priceElemoney = ele.elemoney.split("电费:");
          ele['eleServicePrice'] = ele.elemoney + '元/度';
          ele['priceInfoDegee'] = Number(priceElemoney[1]);
        } else {
          var priceElemoney = ele.elemoney.split("电费:");
          var priceServemoney = ele.servemoney.split("服务费:");
          ele['eleServicePrice'] = ele.elemoney + '元/度|' + ele.servemoney + '元/度'
          ele['priceInfoDegee'] = Number(priceElemoney[1]) + Number(priceServemoney[1]);
        }
      })
      console.log(this.pricesList, 'this.pricesList........')
      this.setData({
        pricesList: this.pricesList
      })
    } else { // 从启动充电type=2
      console.log(options, 'options.......')
      this.setData({
        connectorId: options.connectorid,
        operatorId: options.operatorid
      })
      this.getPriceInfos()
    }
    this.selectComponent("#noInfo")
  },
  // 获取设备充电策略
  getPriceInfos:function () {
    var that = this
    https.request('false', api.getPricePolicy,{
      connector_id: that.data.connectorId,
      operator_id: that.data.operatorId
    }, 'POST').then(function (res) {
      console.log(res, '获取设备充电策略结果.......')
      if (res.code == 0) {
        if (res.result) {
          that.setData({
            pricesList: res.result
          })
        }
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 2000
        })
      }
    });
  } 
})
