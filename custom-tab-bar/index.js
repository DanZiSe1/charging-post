const api = require('../utils/api.js');
const https = require('../utils/request.js');
const app = getApp();

Component({
  data: {
    selected: 0,
    color: "#333",
    selectedColor: "#333",
    list: [{
      pagePath: "/pages/index/index",
      iconPath: "/imgs/charge.png",
      selectedIconPath: "/imgs/charge_light.png",
      text: "充电站"
    }, {
      pagePath: "/pages/scan/scan",
      iconPath: "/imgs/scan_light.png",
      selectedIconPath: "/imgs/scan_light.png",
      text: "扫码充电"
    }, {
      pagePath: "/pages/mine/mine",
      iconPath: "/imgs/mine.png",
      selectedIconPath: "/imgs/mine_light.png",
      text: "我的"
    }]
  },
  attached() {
  },
  methods: {
    scanCode: function (e) {
      let openid = wx.getStorageSync('openid');
      let that = this;
      if (openid) {
        wx.scanCode({
          success(res) {
            app.globalData.qrcode = res.result;
            // 获取设备信息
           https.request('false', api.getEquipmentInfo, { "qrcode": res.result }).then(function (res) {
              var equipmentInfoParam = res.result;
              if (res.code == 0) {
                wx.redirectTo({
                  url:  '/pages/scan/chargPost/chargPost?equipParams=' + JSON.stringify(equipmentInfoParam),
                })
              }else{
                wx.showToast({
                  title: res.message,
                  icon:'none',
                  duration: 2000,
                  success(){
                    setTimeout(() => {
                      wx.switchTab({
                        url: '/pages/index/index',
                      })
                    }, 2000);
                  }
                })
              } 
            });
          },
          fail:function(err){
            console.log(err);
            wx.switchTab({
              url: '/pages/index/index',
            })
          }
        })
      } else {
        wx.showModal({
          content: '登录后才可扫码',
          cancelText: '取消',
          confirmText: '登录',
          success(res) {
            if (res.confirm) {
              wx.switchTab({
                url: '/pages/mine/mine',
              })
            }else{
              that.scanCode();
            }
          }
        })
      }
    },
    switchTab(e) {
      const that = this
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      });
      if(data.index == 1){
        that.scanCode();
      }
    }
  }
})