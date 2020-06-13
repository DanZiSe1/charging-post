const api = require('../../../utils/api.js');
const https = require('../../../utils/request.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    equipParams: {},
    accountBalance: app.globalData.accountBalance || 0,
    chargePricesInfos: {},
    allChargePricesInfos: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(JSON.parse(options.equipParams), 'JSON.parse(options.equipParams).........')
    this.data.equipParams = JSON.parse(options.equipParams);
    if (this.data.equipParams) {
      var newstatus = '';
      var newType = '';
      switch (this.data.equipParams.status) {
        case 0:
          newstatus = "离网";
          break;
        case 1:
          newstatus = "空闲";
          break;
        case 2:
          newstatus = "占用（未充电）";
          break;
        case 3:
          newstatus = "占用（充电中）";
          break;
        case 4:
          newstatus = "占用（预约锁定）";
          break;
        case 255:
          newstatus = "故障";
          break;
      };
      switch (this.data.equipParams.connector_type) {
        case 0:
          newType = "家用插座（模式2）";
          break;
        case 1:
          newType = "交流接口插座（模式3，连接方式B ）";
          break;
        case 2:
          newType = "交流接口插头（带枪线，模式3，连接方式C）";
          break;
        case 3:
          newType = "直流接口枪头（带枪线，模式4）";
          break;
        case 4:
          newType = "无线充电座";
          break;
        case 6:
          newType = "其他";
          break;
      };
      // console.log(newstatus, 'newstatus.........')
      this.data.equipParams['status'] = newstatus;
      this.data.equipParams['connector_type'] = newType;
      // console.log(this.data.equipParams, 'this.data.equipParams.........')
      this.setData({
        equipParams: this.data.equipParams
      })
      this.getPriceInfos()
    }
  },
  goRecharge:function(){
    wx.navigateTo({
      url: '/pages/mine/recharge/recharge'
    })
  },

  
  /**
   * 启动充电
   * `status`:'充电设备接口状态 0：离网 1：空闲 2：占用（未充电） 3：占用（充电中） 4：占用（预约锁定） 255：故障'
   * */ 
  startCharging:function(){
    console.log(app.globalData.qrcode,'启动充电页面的全局qrcode...........');
    https.request('true', api.startCharging, { 'qrcode': app.globalData.qrcode},'POST').then(function(res){
      console.log(res,'启动充电结果...........');
      if(res.code == 0){
        wx.navigateTo({
          url: '/pages/scan/chargeState/chargeState?start_charge_seq=' + res.result.start_charge_seq,
        })
      } else if(res.code == 5021){
        wx.showModal({
          content: res.message,
          success (data) {
            if (data.confirm) {
              wx.navigateTo({
                url: '/pages/scan/chargeState/chargeState?start_charge_seq=' + res.result.start_charge_seq,
              })
            } 
          }
        })
      }else if(res.code == 5020){
        wx.showModal({
          content: res.message,
          success (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/mine/recharge/recharge',
              })
            } 
          }
        })
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none'
        })
      }
    });
  },
  // 获取设备充电策略
  getPriceInfos:function () {
    var that = this
    https.request('false', api.getPricePolicy,{
      connector_id: that.data.equipParams.connector_id,
      operator_id: that.data.equipParams.operator_id
    }).then(function (res) {
      // console.log(res, '获取设备充电策略结果.......')
      if (res.code == 0) {
        if (res.result.policy_infos) {
          that.setData({
            allChargePricesInfos: res.result.policy_infos,
            chargePricesInfos: res.result.policy_infos[0]
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
  },
  // 查看全部2
  seeAll:function(){
    wx.navigateTo({
      url: '/pages/priceinfo/priceinfo?pricetype=2&allChargePricesInfos='+ JSON.stringify(this.data.allChargePricesInfos)
    })
  },
  // 绑定车牌号
  bindCarNum:function (){
    var that = this;
    https.request('true',api.bindCarNum,{
      carnum: '京A-88888'
    },'POST').then(function(res){
      // console.log(res, '绑定车牌号结果......');
      wx.showToast({
        title: '成功绑定车牌号'
      })
    });
  },
  // 解绑车牌号
  unBindCarNum:function (){
    var that = this;
    https.request('true',api.unBindCarNum,'POST').then(function(res){
      // console.log(res, '解绑车牌号结果......');
      wx.showModal({
        title: '提示',
        content: '您确定要解绑车牌号吗？',
        success (res) {
          if (res.confirm) {
            wx.showToast({
              title: '成功解绑车牌号'
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
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
    let that = this;
    https.request('true', api.getUserInfo).then(function (res) {
      // console.log(res);
      if (res.code == 0) {
        app.globalData.accountBalance = res.result.balance
        that.setData({
          accountBalance: res.result.balance
        });
      }
    });

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