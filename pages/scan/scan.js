const api = require('../../utils/api.js');
const https = require('../../utils/request.js');
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    scanState: true
  },
  // 扫码
  // scanCode: function (e) {
  //   console.log('enter..........')
  //   let openid = wx.getStorageSync('openid');
  //   let that = this;
  //   if (openid) {
  //     wx.scanCode({
  //       success(res) {
  //         app.globalData.qrcode = res.result;
  //         console.log('success...............')
  //         // 获取设备信息
  //        https.request('false', api.getEquipmentInfo, { "qrcode": res.result }).then(function (res) {
  //           var equipmentInfoParam = res.result;
  //           if (res.code == 0) {
  //             wx.redirectTo({
  //               url:  '/pages/scan/chargPost/chargPost?equipParams=' + JSON.stringify(equipmentInfoParam),
  //             })
  //           }else{
  //             wx.showToast({
  //               title: res.message,
  //               icon:'none',
  //               duration: 2000,
  //               success(){
  //                 setTimeout(() => {
  //                   wx.switchTab({
  //                     url: '/pages/index/index',
  //                   })
  //                 }, 2000);
                  
  //               }
  //             })
  //           } 
  //         });
  //       },
  //       fail:function(err){
  //         console.log(err);
  //         wx.switchTab({
  //           url: '/pages/index/index',
  //         })
  //       }
  //     })
  //   } else {
  //     wx.showModal({
  //       content: '登录后才可扫码',
  //       cancelText: '取消',
  //       confirmText: '登录',
  //       success(res) {
  //         if (res.confirm) {
  //           wx.switchTab({
  //             url: '/pages/mine/mine',
  //           })
  //         }else{
  //           that.scanCode();
  //         }
  //       }
  //     })
  //   }
  // },
  /**
   * 点击 tab 时触发
   */
  // onTabItemTap(item){
  //   console.log(item)
  //   this.scanCode();
  // },
  onShow:function(){
    // this.scanCode();
    // 自定义tabbar
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      });
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
})
